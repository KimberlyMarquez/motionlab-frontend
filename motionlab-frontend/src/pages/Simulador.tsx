import React, { useState, useEffect, useRef } from "react";
import {
    FaCrown,
    FaLightbulb,
    FaFlag,
    FaChevronLeft,
    FaChevronRight,
    FaTimes,
} from "react-icons/fa";
import FeedbackModal from "../components/FeedbackModal";
import InfoModal from "../components/TutoModal";
import "../styles/Simulador.css";
import { getCalcSimulacion, getStudentsByTeamId, getMatchParameters, getRoundId, sendStudentScores, sendTeamScores, getMatchStatus, changeMatchStatus, getSimulationStatus} from "../api/SimuladorAPI";
import { useNavigate } from "react-router-dom"


type MovementData = {
    time: number; // El tiempo en segundos desde el inicio de la simulación
    x: number; // Posición X del carro
    y: number; // Posición Y del carro
    velocity: number; // Velocidad del carro
    isRampBaseReached: boolean; // Si se ha alcanzado la base de la rampa
    isRampTopReached: boolean; // Si se ha alcanzado la cima de la rampa
    isGoalOneCompleted: boolean; // Si se ha completado el primer objetivo
    isGoalTwoCompleted: boolean; // Si se ha completado el segundo objetivo
    isGoalThreeCompleted: boolean; // Si se ha completado el tercer objetivo
    distanceTraveled: number; // Distancia recorrida por el carro
    progressPercent: number;
    failedToClimbHill: boolean; // Porcentaje de progreso en el recorrido total
};
const Simulador = () => {
    const navigate = useNavigate();
    // Parametros del profesor
    const [rpm, setRpm] = useState<number>(0);
    const [wheelSize, setWheelSize] = useState<number>(0);
    const [distance, setDistance] = useState<number>(0); // min: 5, max: 22.6
    // Parametros del usuario
    const [pilotMass, setPilotMass] = useState<number>(70);
    const [chassisMass, setChassisMass] = useState<number>(50);
    const [additionalMass, setAdditionalMass] = useState<number>(10);
    const [motorPower, setMotorPower] = useState<number>(8);
    // Inputs
    const [pilotMassInput, setPilotMassInput] = useState<string>("70");
    const [chassisMassInput, setChassisMassInput] = useState<string>("50");
    const [additionalMassInput, setAdditionalMassInput] = useState<string>("10");
    const [motorPowerInput, setMotorPowerInput] = useState<string>("8");
    // Estados de la simulación
    const [time, setTime] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [carPosition, setCarPosition] = useState({ x: 50, y: 0 });
    const [currentVelocity, setCurrentVelocity] = useState<number>(0);
    const [distanceTraveled, setDistanceTraveled] = useState<number>(0);
    const [isGoalOneCompleted, setIsGoalOneCompleted] = useState<boolean>(false);
    const [isGoalTwoCompleted, setIsGoalTwoCompleted] = useState<boolean>(false);
    const [isGoalThreeCompleted, setIsGoalThreeCompleted] =
        useState<boolean>(false);
    const [statusMessage, setStatusMessage] = useState<string>("");
    const [statusType, setStatusType] = useState<
        "success" | "warning" | "error" | ""
    >("");
    const [alumnos, setAlumnos] = useState<string[]>([]);
    const [teamId, setTeamId] = useState<number | null>(null);
    const [matchId, setMatchId] = useState<number | null>(null);
    const [roundId, setRoundId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [alumnoActualIndex, setAlumnoActualIndex] = useState<number>(0);
    const [tiemposRegistrados, setTiemposRegistrados] = useState<{
        [key: string]: number;
    }>({});
    // Agrega esta línea cerca de donde declaras el estado tiemposRegistrados
    const [distanciasRegistradas, setDistanciasRegistradas] = useState<{
        [key: string]: number;
    }>({});
    const [tiempoTotalGlobal, setTiempoTotalGlobal] = useState<number>(0);
    const [tiempoInicioAlumnoActual, setTiempoInicioAlumnoActual] =
        useState<number>(0);
    const [allStudentsCompleted, setAllStudentsCompleted] =
        useState<boolean>(false);
    const [hasRunSimulation, setHasRunSimulation] = useState<boolean>(false);
    const [simulationCompleted, setSimulationCompleted] = useState<boolean>(false);

    // Modales
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);

    // Panel de metas
    const [isGoalsPanelCollapsed, setIsGoalsPanelCollapsed] = useState(true);
    const timerRef = useRef<number | null>(null);
    const animationRef = useRef<number | null>(null);
    const lastTimeRef = useRef<number>(0);
    const velocityRef = useRef<number>(0);
    const positionRef = useRef<{ x: number; y: number }>({ x: 50, y: 0 });
    const distanceRef = useRef<number>(0);
    const simulationTimerRef = useRef<number | null>(null);
    const movementDataRef = useRef<MovementData[]>([]);

    const loadMatchParameters = async () => {
        if (!matchId) return;

        setLoading(true);
        setError(null);

        try {
            const response = await getMatchParameters(matchId);

            if (response.status === 'success' && response.payload) {
                setRpm(response.payload.rpm);
                setWheelSize(response.payload.wheel_size);
                setDistance(response.payload.distance);
                console.log("Parámetros de la partida:", response.payload);
            } else {
                setError('No se pudieron cargar los parámetros de la partida');
            }
        } catch (err) {
            setError('Error al cargar los parámetros de la partida');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const loadRoundId = async (matchId: number) => {
        if (!matchId) return;

        try {
            const response = await getRoundId(matchId);
            if (response.status === 'success' && response.payload) {
                setRoundId(response.payload.id);
                console.log("ID de ronda:", response.payload.id);
            } else {
                console.error("Error al cargar la ronda.");
            }
        } catch (error) {
            console.error("Error al cargar la ronda:", error);
        }
    }

    // Constantes
    const GRAVITY = 9.81;
    const HP_TO_WATTS = 745.7;
    const CM_TO_M = 0.01;
    const PIXELS_PER_METER = 30;
    const groundLevel = 200; //Se cambio el alto del groun level
    // Dimensiones del carro
    const CAR_WIDTH = 50;
    // Calculos de las posiciones de la rampa
    const rampStartX = 250;
    const rampEndX = rampStartX + distance * PIXELS_PER_METER;
    const rampHeight = 120;
    const platformLength = 120;
    const platformEndX = rampEndX + platformLength;
    const wallX = platformEndX;
    // Posiciones de las banderas
    const startX = 50;
    const flag1X = rampStartX - 25;
    const flag2X = rampEndX;
    const flag3X = wallX - 25;
    // Distancias
    const tramo1Pixels = flag1X - startX;
    const tramo2Pixels = flag2X - flag1X;
    const tramo3Pixels = flag3X - flag2X;
    const totalCoursePixels = tramo1Pixels + tramo2Pixels + tramo3Pixels;

    // Handles
    const handlePilotMassInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.value;
        setPilotMassInput(value);
        const numValue = parseFloat(value);
        if (!isNaN(numValue) && numValue >= 30 && numValue <= 120) {
            setPilotMass(numValue);
        }
    };
    const handleChassisMassInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.value;
        setChassisMassInput(value);
        const numValue = parseFloat(value);
        if (!isNaN(numValue) && numValue >= 20 && numValue <= 80) {
            setChassisMass(numValue);
        }
    };
    const handleAdditionalMassInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.value;
        setAdditionalMassInput(value);
        const numValue = parseFloat(value);
        if (!isNaN(numValue) && numValue >= 0 && numValue <= 30) {
            setAdditionalMass(numValue);
        }
    };
    const handleMotorPowerInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.value;
        setMotorPowerInput(value);
        const numValue = parseFloat(value);
        if (!isNaN(numValue) && numValue >= 5 && numValue <= 25) {
            setMotorPower(numValue);
        }
    };
    const handleInputBlur = (
        value: string,
        setter: React.Dispatch<React.SetStateAction<number>>,
        inputSetter: React.Dispatch<React.SetStateAction<string>>,
        min: number,
        max: number
    ) => {
        let numValue = parseFloat(value);
        if (isNaN(numValue)) {
            numValue = min;
        } else {
            numValue = Math.max(min, Math.min(max, numValue));
        }
        setter(numValue);
        inputSetter(numValue.toFixed(2));
    };
    const handleSliderChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        setter: React.Dispatch<React.SetStateAction<number>>,
        inputSetter: React.Dispatch<React.SetStateAction<string>>
    ) => {
        const value = parseFloat(e.target.value);
        setter(value);
        inputSetter(value.toFixed(2));
    };

    const handleSimulationStatus = async () => {
        if (!roundId) return;
        if (!matchId) return;

        try {
            const response = await getSimulationStatus(roundId);

            if (response.payload) {
                await changeMatchStatus(matchId);
                    setStatusMessage("La partida ha finalizado. Redirigiendo en 10 segundos...");
                    setStatusType("warning");
                    setTimeout(() => navigate("/lobby"), 10000);
            } else {
                setError(response.message || "Error al obtener el estado de la partida");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("Error al procesar la solicitud");
        }
    };

    useEffect(() => {
        handleSimulationStatus();

        const interval = setInterval(() => {
            handleSimulationStatus();
        },3000)

        return() => clearInterval(interval);
       },[roundId]);

    useEffect(() => {
        const storedTeamId = sessionStorage.getItem('teamId');
        const storedMatchId = sessionStorage.getItem('matchId');

        if (storedTeamId) {
            setTeamId(Number(storedTeamId));
        } else {
            setTeamId(null);
            console.log("No se encontró el teamId.");
        }

        if (storedMatchId) {
            setMatchId(Number(storedMatchId));
        } else {
            setMatchId(null);
            console.log("No se encontró el matchId.");
        }
    }, []);

    // Función para cargar los estudiantes
    const loadStudents = async () => {
        if (!teamId) return;

        setLoading(true);
        setError(null);

        try {
            const response = await getStudentsByTeamId(teamId);

            if (response.status === 'success' && response.payload) {
                const matriculas = response.payload.map((student: { studentId: string; teamId: number }) =>
                    student.studentId
                );
                setAlumnos(matriculas);
            } else {
                setError('No se pudieron cargar los estudiantes');
            }
        } catch (err) {
            setError('Error al cargar los estudiantes');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        setPilotMassInput(pilotMass.toFixed(2));
        setChassisMassInput(chassisMass.toFixed(2));
        setAdditionalMassInput(additionalMass.toFixed(2));
        setMotorPowerInput(motorPower.toFixed(2));
    }, [pilotMass, chassisMass, additionalMass, motorPower]);

    useEffect(() => {
        if (teamId) {
            loadStudents();
        }
    }, [teamId]);

    useEffect(() => {
        if (matchId) {
            loadMatchParameters();
        }
    }, [matchId]);

    useEffect(() => {
        if (matchId) {
            loadRoundId(matchId);
        }
    }, [matchId]);

    const toggleGoalsPanel = () => {
        setIsGoalsPanelCollapsed(!isGoalsPanelCollapsed);
    };

    // Calcular ángulo de la rampaZ
    const calculateRampAngle = () => {
        const heightInMeters = rampHeight / PIXELS_PER_METER;
        const rampAngleRadians = Math.atan(heightInMeters / distance);
        return rampAngleRadians;
    };
    const getCarRotationAngle = (xPos: number) => {
        if (xPos < rampStartX || xPos > rampEndX) return 0;
        return -calculateRampAngle();
    };

    // Comienzo de la simulación
    const startSimulation = async () => {
        if (isRunning && !isPaused) return;

        const dataToSend = {
            pilotMass: pilotMass,
            chassisMass: chassisMass,
            additionalMass: additionalMass,
            motorPower: motorPower,
            matchId: matchId,
        };

        const response = await getCalcSimulacion(dataToSend);
        movementDataRef.current = response.payload;

        if (simulationTimerRef.current) {
            clearInterval(simulationTimerRef.current);
            simulationTimerRef.current = null;
        }

        setStatusMessage("");
        setStatusType("");

        if (isPaused) {
            setIsPaused(false);
        } else {
            setIsRunning(true);
            setTime(0);
            positionRef.current = { x: 50, y: 0 };
            setCarPosition(positionRef.current);
            velocityRef.current = 0;
            setCurrentVelocity(0);
            distanceRef.current = 0;
            setDistanceTraveled(0);
            setIsGoalOneCompleted(false);
            setIsGoalTwoCompleted(false);
            setIsGoalThreeCompleted(false);
            setHasRunSimulation(true);
            setSimulationCompleted(false);
        }

        // Timer
        simulationTimerRef.current = window.setInterval(() => {
            setTime((prevTime) => prevTime + 0.01);
        }, 10);

        ensureTimerRunning();

        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        lastTimeRef.current = performance.now();
        animateKart();
    };

    const animateKart = () => {
        const movementData = movementDataRef.current;
        let currentFrameIndex = 0;
        const animationStartTime = performance.now();

        // Reset simulation state
        lastTimeRef.current = animationStartTime;

        const animate = (timestamp: number) => {
            if (!isRunning || isPaused) return;

            // Calculate how much time has passed since the animation started
            const elapsedTime = (timestamp - animationStartTime) / 1000;

            // Find the appropriate frame in our precalculated data
            while (
                currentFrameIndex < movementData.length - 1 &&
                movementData[currentFrameIndex + 1].time <= elapsedTime
            ) {
                currentFrameIndex++;
            }

            const currentFrame = movementData[currentFrameIndex];

            positionRef.current = { x: currentFrame.x, y: currentFrame.y };
            velocityRef.current = currentFrame.velocity;
            distanceRef.current = currentFrame.distanceTraveled;

            setCarPosition(positionRef.current);
            setCurrentVelocity(velocityRef.current);
            setDistanceTraveled(distanceRef.current);

            // Check if the cart failed to climb the hill
            if (currentFrame.failedToClimbHill && velocityRef.current < 0) {
                setStatusMessage(
                    "El carro no puede subir la rampa. La masa es demasiada y/o la potencia muy poca."
                );
                setStatusType("error");
                setSimulationCompleted(true);
                setIsRunning(false);

                if (simulationTimerRef.current) {
                    clearInterval(simulationTimerRef.current);
                    simulationTimerRef.current = null;
                }

                return;
            }

            if (!isGoalOneCompleted && currentFrame.isGoalOneCompleted) {
                setIsGoalOneCompleted(true);
            }

            if (!isGoalTwoCompleted && currentFrame.isGoalTwoCompleted) {
                setIsGoalTwoCompleted(true);
            }

            if (!isGoalThreeCompleted && currentFrame.isGoalThreeCompleted) {
                setIsGoalThreeCompleted(true);
                setStatusMessage(
                    "¡El carro ha llegado al final del recorrido con éxito!"
                );
                setStatusType("success");
                setSimulationCompleted(true);
                setIsRunning(false);

                if (simulationTimerRef.current) {
                    clearInterval(simulationTimerRef.current);
                    simulationTimerRef.current = null;
                }

                return;
            }

            // Check if simulation should end based on other conditions
            if (currentFrameIndex >= movementData.length - 1) {
                const isOnRamp =
                    currentFrame.x >= rampStartX && currentFrame.x <= rampEndX;

                if (isOnRamp && Math.abs(currentFrame.velocity) < 0.05) {
                    setStatusMessage(
                        `El carro se detuvo al ${currentFrame.progressPercent}% del recorrido total.`
                    );
                    setStatusType("warning");
                    setSimulationCompleted(true);
                } else if (currentFrame.x <= 50) {
                    setStatusMessage(
                        "El carro no tiene suficiente potencia para subir la rampa."
                    );
                    setStatusType("error");
                    setSimulationCompleted(true);
                }
                setIsRunning(false);

                if (simulationTimerRef.current) {
                    clearInterval(simulationTimerRef.current);
                    simulationTimerRef.current = null;
                }

                return;
            }

            if (isRunning) {
                animationRef.current = requestAnimationFrame(animate);
            }
        };

        animationRef.current = requestAnimationFrame(animate);
    };

    const pauseSimulation = () => {
        setIsPaused(true);

        // Detener la animación
        if (animationRef.current) cancelAnimationFrame(animationRef.current);

        if (simulationTimerRef.current) {
            clearInterval(simulationTimerRef.current);
            simulationTimerRef.current = null;
        }

        ensureTimerRunning();
    };
    // Cancelar la simulación
    const cancelSimulation = () => {
        if (simulationTimerRef.current) {
            clearInterval(simulationTimerRef.current);
            simulationTimerRef.current = null;
        }

        setIsRunning(false);
        setIsPaused(false);
        setTime(0);
        positionRef.current = { x: 50, y: 0 };
        setCarPosition(positionRef.current);
        velocityRef.current = 0;
        setCurrentVelocity(0);
        distanceRef.current = 0;
        setDistanceTraveled(0);
        setIsGoalOneCompleted(false);
        setIsGoalTwoCompleted(false);
        setIsGoalThreeCompleted(false);
        setStatusMessage("");
        setStatusType("");

        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
        }

        ensureTimerRunning();
    };
    // Modificación para el handleReadyClick()
const handleReadyClick = () => {
    // Registrar el tiempo del alumno actual
    const alumnoActual = alumnos[alumnoActualIndex];
    const tiempoAlumno = tiempoTotalGlobal - tiempoInicioAlumnoActual;
    setTiemposRegistrados((prev) => ({
        ...prev,
        [alumnoActual]: tiempoAlumno,
    }));

    setDistanciasRegistradas((prev) => ({
        ...prev,
        [alumnoActual]: distanceTraveled,
    }));

    // Verificar si hay más alumnos en la lista
    if (alumnoActualIndex < alumnos.length - 1) {
        setAlumnoActualIndex((prev) => prev + 1);
        cancelSimulation();
        setTiempoInicioAlumnoActual(tiempoTotalGlobal);
        setHasRunSimulation(false);
        setSimulationCompleted(false);

        ensureTimerRunning();
    } else {
        setStatusMessage("¡Todos los alumnos han completado la simulación!");
        setStatusType("success");
        setAllStudentsCompleted(true);

        if (roundId) {
            // Asegurar que todos los alumnos tienen un registro válido
            const results = alumnos.map(studentId => ({
                student_id: studentId,
                time: tiemposRegistrados[studentId] || (studentId === alumnoActual ? tiempoAlumno : 0),
                distance: distanciasRegistradas[studentId] || (studentId === alumnoActual ? distanceTraveled : 0)
            }));

            // Verificar si hay tiempos en 0 y loguear para depuración
            const alumnosConTiempoCero = results.filter(r => r.time === 0);
            if (alumnosConTiempoCero.length > 0) {
                console.log("Alumnos con tiempo 0:", alumnosConTiempoCero);
                console.log("Estado actual de tiemposRegistrados:", tiemposRegistrados);
            }

            // Enviar resultados al backend
            sendStudentScores(roundId, results)
                .then(response => {
                    console.log("Resultados enviados exitosamente:", response);
                })
                .catch(error => {
                    console.error("Error al enviar resultados:", error);
                    setError("Error al enviar resultados al servidor");
                    console.log("Data enviada:", roundId, results);
                });
        } else {
            console.error("No se puede enviar resultados: roundId es null");
        }

        if (roundId && teamId) {
            // FIX: Crear el objeto de resultado según la estructura esperada por el backend
            const teamResult = {
                team_id: teamId,
                time: tiempoTotalGlobal
            };

            // Verificar los datos para depuración
            console.log("Enviando resultados del equipo:", {
                roundId: roundId,
                results: teamResult
            });

            // Enviar resultados del equipo al backend
            sendTeamScores(roundId, teamResult)
                .then(response => {
                    console.log("Resultados del equipo enviados exitosamente:", response);
                })
                .catch(error => {
                    console.error("Error al enviar resultados del equipo:", error);
                    setError("Error al enviar resultados del equipo al servidor");
                    console.log("Data enviada:", roundId, teamResult);
                });
        } else {
            console.error("No se puede enviar resultados del equipo: roundId o teamId es null");
        }

        // Detener temporizadores
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
        }

        setIsRunning(false);
        setIsPaused(false);
        console.log("Tiempos registrados:", tiemposRegistrados);

        setShowFeedbackModal(true);
    }
};
    const resetParameters = () => {
        if (!isRunning) {
            setPilotMass(70);
            setChassisMass(50);
            setAdditionalMass(10);
            setMotorPower(8);
            setPilotMassInput("70.00");
            setChassisMassInput("50.00");
            setAdditionalMassInput("10.00");
            setMotorPowerInput("8.00");
            setStatusMessage("");
            setStatusType("");
        }
    };

    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            if (simulationTimerRef.current) clearInterval(simulationTimerRef.current);
        };
    }, []);

    useEffect(() => {
        if (isRunning && !isPaused) {
            lastTimeRef.current = performance.now();
            animateKart();
        }
    }, [isRunning, isPaused]);

    useEffect(() => {
        timerRef.current = window.setInterval(() => {
            setTiempoTotalGlobal((prevGlobal) => prevGlobal + 0.01);
        }, 10);

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, []);

    const ensureTimerRunning = () => {
        if (!timerRef.current) {
            timerRef.current = window.setInterval(() => {
                setTiempoTotalGlobal((prevGlobal) => prevGlobal + 0.01);
            }, 10);
        }
    };
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        const milliseconds = Math.floor((time % 1) * 100);
        return `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
    };
    return (
        <div className="simulador-container">
            <div className="top-bar">
                <div className="team-info">
                    <img src="/Users.svg" alt="" className="icon" />
                    <span className="team-text">EQUIPO {teamId}</span>
                    <FaCrown className="icon" />
                    <FaLightbulb
                        className="icon"
                        onClick={() => setShowInfoModal(true)}
                        style={{ cursor: "pointer" }}
                    />
                </div>

                <div className="student-info">
                    <div>Simulación de</div>
                    <div className="matricula">{alumnos[alumnoActualIndex]}</div>
                </div>

                <div className="timer">
                    <div className="timer-icon-container">
                        <img src="/Clock.svg" alt="" className="icon" />
                    </div>
                    <div className="timer-value-container">
                        <span>{formatTime(tiempoTotalGlobal)}</span>
                    </div>
                </div>
            </div>

            <div className="main-area">
                <div className="simulation-landscape">
                    <div className="registered-times">
                        <h4 className="register-label">Tiempos Registrados</h4>
                        <ul className="register-students">
                            {Object.entries(tiemposRegistrados).map(([alumno, tiempo]) => (
                                <li key={alumno}>
                                    {alumno}: {formatTime(tiempo)}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="ground"></div>
                    <div
                        className="hill"
                        style={{
                            left: `${rampStartX}px`,
                            width: `${distance * PIXELS_PER_METER}px`,
                            height: `${rampHeight}px`,
                            bottom: `${groundLevel}px`,
                        }}
                    ></div>
                    <div
                        className="platform"
                        style={{
                            left: `${rampEndX}px`,
                            width: `${platformLength}px`,
                            height: `${rampHeight}px`,
                            bottom: `${groundLevel}px`,
                            position: "absolute",
                        }}
                    ></div>
                    <div
                        className="wall"
                        style={{
                            left: `${wallX}px`,
                            height: `${rampHeight + 40}px`,
                            bottom: `${groundLevel}px`,
                        }}
                    ></div>
                    <div
                        className="flag flag-1"
                        style={{ left: `${flag1X}px`, bottom: `${groundLevel}px` }}
                    >
                        <FaFlag
                            className="flag-icon"
                            style={{ color: isGoalOneCompleted ? "#547EBC" : "#C85332" }}
                        />
                        <span className="flag-number">1</span>
                    </div>
                    <div
                        className="flag flag-2"
                        style={{
                            left: `${flag2X}px`,
                            bottom: `${groundLevel + rampHeight}px`,
                        }}
                    >
                        <FaFlag
                            className="flag-icon"
                            style={{ color: isGoalTwoCompleted ? "#547EBC" : "#C85332" }}
                        />
                        <span className="flag-number">2</span>
                    </div>
                    <div
                        className="flag flag-3"
                        style={{
                            left: `${flag3X}px`,
                            bottom: `${groundLevel + rampHeight}px`,
                        }}
                    >
                        <FaFlag
                            className="flag-icon"
                            style={{ color: isGoalThreeCompleted ? "#547EBC" : "#C85332" }}
                        />
                        <span className="flag-number">3</span>
                    </div>
                    <div
                        className="car"
                        style={{
                            left: `${carPosition.x}px`,
                            bottom: `${groundLevel + carPosition.y}px`,
                            transform: `rotate(${getCarRotationAngle(carPosition.x)}rad)`,
                            transformOrigin: "bottom center",
                            transition: "transform 0.2s ease-out",
                        }}
                    >
                        <div className="car-image"></div>
                    </div>
                    <div className="bottom">
                        <button className="signout-btn">
                            <img src="/SignOut.svg" alt="" />
                        </button>
                        <div className="center-container">
                            <div className="time">
                                <div className="timer-icon-container">
                                    <img src="/Clockblanco.svg" alt="" className="icon-bottom" />
                                </div>
                                <div className="time-display">
                                    <span>
                                        {formatTime(tiempoTotalGlobal - tiempoInicioAlumnoActual)}
                                    </span>
                                </div>
                            </div>
                            <button
                                className="ready-btn"
                                onClick={handleReadyClick}
                                disabled={
                                    allStudentsCompleted ||
                                    isRunning ||
                                    isPaused ||
                                    !simulationCompleted
                                }
                            >
                                LISTO
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    className={`compact-goals-panel ${isGoalsPanelCollapsed ? "collapsed" : ""
                        }`}
                >
                    <button className="toggle-compact-goals" onClick={toggleGoalsPanel}>
                        {isGoalsPanelCollapsed ? (
                            <FaChevronLeft className="toggle-icon" />
                        ) : (
                            <FaChevronRight className="toggle-icon" />
                        )}
                    </button>
                    <div className="compact-goals-content">
                        <span className="metas-title">METAS</span>
                        <div className="compact-goal-item">
                            <div className="compact-flag-container">
                                <FaFlag
                                    className="flag-icon"
                                    style={{ color: isGoalOneCompleted ? "#547EBC" : "#C85332" }}
                                />
                                <span className="flag-number">1</span>
                            </div>
                            <span
                                className={`goal-text ${isGoalOneCompleted ? "completed" : ""}`}
                                style={{
                                    textDecoration: isGoalOneCompleted ? "line-through" : "none",
                                }}
                            >
                                Llegar a la base de la rampa.
                            </span>
                        </div>
                        <div className="compact-goal-item">
                            <div className="compact-flag-container">
                                <FaFlag
                                    className="flag-icon"
                                    style={{ color: isGoalTwoCompleted ? "#547EBC" : "#C85332" }}
                                />
                                <span className="flag-number">2</span>
                            </div>
                            <span
                                className={`goal-text ${isGoalTwoCompleted ? "completed" : ""}`}
                                style={{
                                    textDecoration: isGoalTwoCompleted ? "line-through" : "none",
                                }}
                            >
                                Llegar a la cima de la rampa.
                            </span>
                        </div>
                        <div className="compact-goal-item">
                            <div className="compact-flag-container">
                                <FaFlag
                                    className="flag-icon"
                                    style={{
                                        color: isGoalThreeCompleted ? "#547EBC" : "#C85332",
                                    }}
                                />
                                <span className="flag-number">3</span>
                            </div>
                            <span
                                className={`goal-text ${isGoalThreeCompleted ? "completed" : ""
                                    }`}
                                style={{
                                    textDecoration: isGoalThreeCompleted
                                        ? "line-through"
                                        : "none",
                                }}
                            >
                                Completar el recorrido.
                            </span>
                        </div>
                    </div>
                </div>
                <div className="parameters-panel">
                    <div className="panel-header">
                        <span>PARÁMETROS</span>
                        <button
                            className="refresh-btn"
                            onClick={resetParameters}
                            disabled={isRunning}
                        >
                            <img src="/Refresh.png" alt="" />
                        </button>
                    </div>
                    <div className="parameter-group">
                        <div className="parameter">
                            <label>Revoluciones por minuto:</label>
                            <input type="text" value={rpm} readOnly />
                            <p>rpm</p>
                        </div>
                        <div className="parameter">
                            <label>Tamaño de la rueda:</label>
                            <input type="text" value={wheelSize} readOnly />
                            <p>cm</p>
                        </div>
                        <div className="parameter">
                            <label>Distancia de la rampa:</label>
                            <input type="text" value={distance} readOnly />
                            <p>m</p>
                        </div>
                    </div>
                    <div className="parameter-group user-params">
                        <div className="parameter-slider">
                            <label>Masa del piloto (kg)</label>
                            <div className="slider-container">
                                <input
                                    type="range"
                                    min="30"
                                    max="120"
                                    step="0.01"
                                    value={pilotMass}
                                    onChange={(e) =>
                                        handleSliderChange(e, setPilotMass, setPilotMassInput)
                                    }
                                    disabled={isRunning}
                                />
                                <div className="value-input-container">
                                    <input
                                        type="text"
                                        className="value-input"
                                        value={pilotMassInput}
                                        onChange={handlePilotMassInputChange}
                                        onBlur={() =>
                                            handleInputBlur(
                                                pilotMassInput,
                                                setPilotMass,
                                                setPilotMassInput,
                                                30,
                                                120
                                            )
                                        }
                                        disabled={isRunning}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="parameter-slider">
                            <label>Masa del chasis (kg)</label>
                            <div className="slider-container">
                                <input
                                    type="range"
                                    min="20"
                                    max="80"
                                    step="0.01"
                                    value={chassisMass}
                                    onChange={(e) =>
                                        handleSliderChange(e, setChassisMass, setChassisMassInput)
                                    }
                                    disabled={isRunning}
                                />
                                <div className="value-input-container">
                                    <input
                                        type="text"
                                        className="value-input"
                                        value={chassisMassInput}
                                        onChange={handleChassisMassInputChange}
                                        onBlur={() =>
                                            handleInputBlur(
                                                chassisMassInput,
                                                setChassisMass,
                                                setChassisMassInput,
                                                20,
                                                80
                                            )
                                        }
                                        disabled={isRunning}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="parameter-slider">
                            <label>Masas adicionales (kg)</label>
                            <div className="slider-container">
                                <input
                                    type="range"
                                    min="0"
                                    max="30"
                                    step="0.01"
                                    value={additionalMass}
                                    onChange={(e) =>
                                        handleSliderChange(
                                            e,
                                            setAdditionalMass,
                                            setAdditionalMassInput
                                        )
                                    }
                                    disabled={isRunning}
                                />
                                <div className="value-input-container">
                                    <input
                                        type="text"
                                        className="value-input"
                                        value={additionalMassInput}
                                        onChange={handleAdditionalMassInputChange}
                                        onBlur={() =>
                                            handleInputBlur(
                                                additionalMassInput,
                                                setAdditionalMass,
                                                setAdditionalMassInput,
                                                0,
                                                30
                                            )
                                        }
                                        disabled={isRunning}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="parameter-slider">
                            <label>Potencia del motor (hp)</label>
                            <div className="slider-container">
                                <input
                                    type="range"
                                    min="5"
                                    max="25"
                                    step="0.01"
                                    value={motorPower}
                                    onChange={(e) =>
                                        handleSliderChange(e, setMotorPower, setMotorPowerInput)
                                    }
                                    disabled={isRunning}
                                />
                                <div className="value-input-container">
                                    <input
                                        type="text"
                                        className="value-input"
                                        value={motorPowerInput}
                                        onChange={handleMotorPowerInputChange}
                                        onBlur={() =>
                                            handleInputBlur(
                                                motorPowerInput,
                                                setMotorPower,
                                                setMotorPowerInput,
                                                5,
                                                25
                                            )
                                        }
                                        disabled={isRunning}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="simulation-status">
                        <div className="status-item">
                            <label>Velocidad actual:</label>
                            <span>{currentVelocity.toFixed(2)} m/s</span>
                        </div>
                        <div className="status-item">
                            <label>Distancia recorrida:</label>
                            <span>{distanceTraveled.toFixed(2)} m</span>
                        </div>
                        <div className="status-item mb-0">
                            <label>Tiempo transcurrido:</label>
                            <span>{formatTime(time)}</span>
                        </div>
                    </div>
                    {statusMessage && (
                        <div className={`status-message ${statusType}`}>
                            {statusMessage}
                        </div>
                    )}
                    <div
                        className={`control-buttons ${allStudentsCompleted ? "all-completed" : ""
                            }`}
                    >
                        <button
                            className="control-btn start-btn"
                            onClick={startSimulation}
                            disabled={(isRunning && !isPaused) || allStudentsCompleted}
                        >
                            START
                        </button>
                        <button
                            className="control-btn pause-btn"
                            onClick={pauseSimulation}
                            disabled={!isRunning || isPaused || allStudentsCompleted}
                        >
                            <img src="/Pause.svg" alt="" />
                        </button>
                        <button
                            className="control-btn cancel-btn"
                            onClick={cancelSimulation}
                            disabled={(!isRunning && !isPaused) || allStudentsCompleted}
                        >
                            <FaTimes className="cross" />
                        </button>
                    </div>
                </div>
            </div>

            <InfoModal show={showInfoModal} onHide={() => setShowInfoModal(false)} />

            <FeedbackModal
                show={showFeedbackModal}
                onHide={() => setShowFeedbackModal(false)}
                tiemposRegistrados={tiemposRegistrados}
                goalsCompleted={{
                    goal1: isGoalOneCompleted,
                    goal2: isGoalTwoCompleted,
                    goal3: isGoalThreeCompleted
                }}
            />
        </div>
    );
};
export default Simulador;