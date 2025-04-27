import React, { useState, useEffect, useRef } from 'react';
import { FaUser, FaCrown, FaMap, FaLightbulb, FaSignOutAlt, FaFlag, FaClock, FaSync, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import FeedbackModal from '../components/FeedbackModal';
import InfoModal from '../components/TutoModal';
import '../styles/Simulador.css';
interface SimuladorProps {
    equipoId: string;
}
const Simulador: React.FC<SimuladorProps> = ({ equipoId }) => {
    // Parametros del profesor
    const [rpm, setRpm] = useState<number>(2000);
    const [wheelSize, setWheelSize] = useState<number>(24);
    const [distance, setDistance] = useState<number>(22.6); // min: 5, max: 22.6
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
    const [isGoalThreeCompleted, setIsGoalThreeCompleted] = useState<boolean>(false);
    const [statusMessage, setStatusMessage] = useState<string>("");
    const [statusType, setStatusType] = useState<"success" | "warning" | "error" | "">("");
    const [alumnos, setAlumnos] = useState<string[]>(['A01255262', 'A23456007', 'A34056780', 'A45006789', 'A56700890']);
    const [alumnoActualIndex, setAlumnoActualIndex] = useState<number>(0);
    const [tiemposRegistrados, setTiemposRegistrados] = useState<{ [key: string]: number }>({});
    const [tiempoTotalGlobal, setTiempoTotalGlobal] = useState<number>(0);
    const [tiempoInicioAlumnoActual, setTiempoInicioAlumnoActual] = useState<number>(0);
    const [allStudentsCompleted, setAllStudentsCompleted] = useState<boolean>(false);
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
    const positionRef = useRef<{ x: number, y: number }>({ x: 50, y: 0 });
    const distanceRef = useRef<number>(0);
    const simulationTimerRef = useRef<number | null>(null);

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
    const rampEndX = rampStartX + (distance * PIXELS_PER_METER);
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
    const totalCourseMeters = totalCoursePixels / PIXELS_PER_METER;

    // Handles
    const handlePilotMassInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPilotMassInput(value);
        const numValue = parseFloat(value);
        if (!isNaN(numValue) && numValue >= 30 && numValue <= 120) {
            setPilotMass(numValue);
        }
    };
    const handleChassisMassInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setChassisMassInput(value);
        const numValue = parseFloat(value);
        if (!isNaN(numValue) && numValue >= 20 && numValue <= 80) {
            setChassisMass(numValue);
        }
    };
    const handleAdditionalMassInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setAdditionalMassInput(value);
        const numValue = parseFloat(value);
        if (!isNaN(numValue) && numValue >= 0 && numValue <= 30) {
            setAdditionalMass(numValue);
        }
    };
    const handleMotorPowerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    useEffect(() => {
        setPilotMassInput(pilotMass.toFixed(2));
        setChassisMassInput(chassisMass.toFixed(2));
        setAdditionalMassInput(additionalMass.toFixed(2));
        setMotorPowerInput(motorPower.toFixed(2));
    }, [pilotMass, chassisMass, additionalMass, motorPower]);

    const toggleGoalsPanel = () => {
        setIsGoalsPanelCollapsed(!isGoalsPanelCollapsed);
    };
    // Calcular masa total
    const getTotalMass = () => pilotMass + chassisMass + additionalMass;
    // Calculate velocidad máxima
    const calculateMaxVelocity = () => {
        const radiansPerSecond = (rpm * 2 * Math.PI) / 60;
        const wheelCircumference = 2 * Math.PI * (wheelSize * CM_TO_M);
        return radiansPerSecond * wheelCircumference;
    };
    // Calcular ángulo de la rampa
    const calculateRampAngle = () => {
        const heightInMeters = rampHeight / PIXELS_PER_METER;
        const rampAngleRadians = Math.atan(heightInMeters / distance);
        return rampAngleRadians;
    };
    const getCarRotationAngle = (xPos: number) => {
        if (xPos < rampStartX || xPos > rampEndX) return 0;
        return -calculateRampAngle();
    };
    // Calculos
    const calculateAcceleration = (velocity: number) => {
        const totalMass = getTotalMass();
        if (totalMass <= 0 || motorPower <= 0) {
            return 0;
        }
        const maxVelocity = calculateMaxVelocity();
        const powerFactor = motorPower / 8;
        const baseAcceleration = 3 * powerFactor;
        const rpmFactor = rpm > 0 ? rpm / 3000 : 0.5;
        const rpmAdjustedAcceleration = baseAcceleration * rpmFactor;
        const massRatio = 130 / totalMass;
        const massAdjustedAcceleration = rpmAdjustedAcceleration * massRatio;
        const velocityRatio = maxVelocity > 0 ? velocity / maxVelocity : 0;
        const velocityFactor = Math.max(0, 1 - Math.pow(velocityRatio, 2));
        const velocityResistance = 0.05 * Math.pow(velocity, 2);
        let hillResistance = 0;
        if (positionRef.current.x >= rampStartX && positionRef.current.x <= rampEndX) {
            const rampAngle = calculateRampAngle();
            hillResistance = GRAVITY * Math.sin(rampAngle) * totalMass;
            const frictionCoefficient = 0.1;
            const frictionForce = frictionCoefficient * totalMass * GRAVITY * Math.cos(rampAngle);
            hillResistance += frictionForce;
        }
        const availablePower = motorPower * HP_TO_WATTS;
        const motorForce = velocity > 0.001 ? availablePower / velocity : availablePower * 10;
        const netForce = (massAdjustedAcceleration * velocityFactor * totalMass) - hillResistance - (velocityResistance * totalMass);
        const finalAcceleration = netForce / totalMass;
        return finalAcceleration;
    };
    // Calcular posición Y
    const calculateYPosition = (xPos: number) => {
        if (xPos < rampStartX) {
            return 0;
        } else if (xPos > rampEndX) {
            return rampHeight;
        } else {
            const rampProgress = (xPos - rampStartX) / (rampEndX - rampStartX);
            return rampProgress * rampHeight;
        }
    };
    // Calculate progreso total
    const calculateTotalProgress = (xPos: number) => {
        if (xPos <= flag1X) {
            return ((xPos - startX) / totalCoursePixels) * 100;
        } else if (xPos <= flag2X) {
            const tramo1Percent = tramo1Pixels / totalCoursePixels * 100;
            const tramo2Progress = (xPos - flag1X) / tramo2Pixels;
            const tramo2Percent = tramo2Progress * (tramo2Pixels / totalCoursePixels * 100);
            return tramo1Percent + tramo2Percent;
        } else if (xPos <= flag3X) {
            const tramo1Percent = tramo1Pixels / totalCoursePixels * 100;
            const tramo2Percent = tramo2Pixels / totalCoursePixels * 100;
            const tramo3Progress = (xPos - flag2X) / tramo3Pixels;
            const tramo3Percent = tramo3Progress * (tramo3Pixels / totalCoursePixels * 100);
            return tramo1Percent + tramo2Percent + tramo3Percent;
        } else {
            return 100;
        }
    };
    // Comienzo de la simulación
    const startSimulation = () => {
        if (isRunning && !isPaused) return;

        // Clear existing simulation timer
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
            setTime(prevTime => prevTime + 0.01);
        }, 10);

        ensureTimerRunning();

        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        lastTimeRef.current = performance.now();
        animateKart();
    };
    // Animación
    const animateKart = () => {
        const animate = (timestamp: number) => {
            if (!isRunning || isPaused) return;
            const deltaTime = (timestamp - lastTimeRef.current) / 1000;
            lastTimeRef.current = timestamp;
            const acceleration = calculateAcceleration(velocityRef.current);
            velocityRef.current += acceleration * deltaTime;
            const isOnRamp = positionRef.current.x >= rampStartX && positionRef.current.x <= rampEndX;
            if (isOnRamp && velocityRef.current < 0) {
                velocityRef.current = Math.max(velocityRef.current, -3.0);
            }

            if (isOnRamp && Math.abs(velocityRef.current) < 0.05) {
                velocityRef.current = 0;
                const progressPercent = Math.round(calculateTotalProgress(positionRef.current.x));
                setStatusMessage(`El carro se detuvo al ${progressPercent}% del recorrido total.`);
                setStatusType("warning");
                setSimulationCompleted(true);


                if (simulationTimerRef.current) {
                    clearInterval(simulationTimerRef.current);
                    simulationTimerRef.current = null;
                }

                if (animationRef.current) cancelAnimationFrame(animationRef.current);
                setIsRunning(false);
                return;
            }
            const distanceIncrement = velocityRef.current * deltaTime + 0.5 * acceleration * Math.pow(deltaTime, 2);
            distanceRef.current += distanceIncrement;
            let newX = 50 + (distanceRef.current * PIXELS_PER_METER);
            if (newX < 50) {
                newX = 50;
                velocityRef.current = 0;
                distanceRef.current = 0;
                setIsRunning(false);
                setStatusMessage("El carro no tiene suficiente potencia para subir la rampa.");
                setStatusType("error");
                setSimulationCompleted(true);
            }
            // Carro al llegar a la pared
            if (newX + CAR_WIDTH >= wallX) {
                newX = wallX - CAR_WIDTH;
                distanceRef.current = (newX - 50) / PIXELS_PER_METER;
                velocityRef.current = 0;
                setIsGoalThreeCompleted(true);
                setStatusMessage("¡Simulación completada con éxito!");
                setStatusType("success");
                setSimulationCompleted(true);

                if (simulationTimerRef.current) {
                    clearInterval(simulationTimerRef.current);
                    simulationTimerRef.current = null;
                }

                setIsRunning(false);
            }
            const newY = calculateYPosition(newX);
            const isRampBaseReached = newX >= rampStartX;
            const isRampTopReached = newX >= rampEndX;
            positionRef.current = { x: newX, y: newY };
            setCarPosition(positionRef.current);
            setCurrentVelocity(velocityRef.current);
            setDistanceTraveled(distanceRef.current);
            if (!isGoalOneCompleted && isRampBaseReached) {
                setIsGoalOneCompleted(true);
            }
            if (!isGoalTwoCompleted && isRampTopReached) {
                setIsGoalTwoCompleted(true);
            }
            if (isGoalThreeCompleted) {
                setIsGoalThreeCompleted(true);
                setStatusMessage("¡El carro ha llegado al final del recorrido con éxito!");
                setStatusType("success");
            }
            if (isRunning) {
                animationRef.current = requestAnimationFrame(animate);
            }
        };
        animationRef.current = requestAnimationFrame(animate);
    };
    // Pausar la simulación
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
    const handleReadyClick = () => {
        // Registrar el tiempo del alumno actual
        const alumnoActual = alumnos[alumnoActualIndex];
        const tiempoAlumno = tiempoTotalGlobal - tiempoInicioAlumnoActual;
        setTiemposRegistrados(prev => ({
            ...prev,
            [alumnoActual]: tiempoAlumno
        }));

        // Verificar si hay más alumnos en la lista
        if (alumnoActualIndex < alumnos.length - 1) {
            setAlumnoActualIndex(prev => prev + 1);
            cancelSimulation();
            setTiempoInicioAlumnoActual(tiempoTotalGlobal);
            setHasRunSimulation(false);
            setSimulationCompleted(false);

            ensureTimerRunning();
        } else {
            setStatusMessage("¡Todos los alumnos han completado la simulación!");
            setStatusType("success");
            setAllStudentsCompleted(true);

            //Detener temporizadores
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
            setTiempoTotalGlobal(prevGlobal => prevGlobal + 0.01);
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
                setTiempoTotalGlobal(prevGlobal => prevGlobal + 0.01);
            }, 10);
        }
    };
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        const milliseconds = Math.floor((time % 1) * 100);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
    };
    return (
        <div className="simulador-container">
            <div className="top-bar">
                <div className="team-info">
                    <img src="/Users.svg" alt="" className='icon' />
                    <span className='team-text'>EQUIPO {equipoId}</span>
                    <FaCrown className="icon" />
                    <FaLightbulb className="icon"
                        onClick={() => setShowInfoModal(true)}
                        style={{ cursor: 'pointer' }}
                    />
                </div>

                <div className="student-info">
                    <div>Simulación de</div>
                    <div className="matricula">{alumnos[alumnoActualIndex]}</div>
                </div>

                <div className="timer">
                    <div className="timer-icon-container">
                        <img src="/Clock.svg" alt="" className='icon' />
                    </div>
                    <div className="timer-value-container">
                        <span>{formatTime(tiempoTotalGlobal)}</span>
                    </div>
                </div>
            </div>

            <div className="main-area">
                <div className="simulation-landscape">
                    <div className="registered-times">
                        <h4 className='register-label'>Tiempos Registrados</h4>
                        <ul className='register-students'>
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
                            bottom: `${groundLevel}px`
                        }}
                    ></div>
                    <div
                        className="platform"
                        style={{
                            left: `${rampEndX}px`,
                            width: `${platformLength}px`,
                            height: `${rampHeight}px`,
                            bottom: `${groundLevel}px`,
                            position: 'absolute'
                        }}
                    ></div>
                    <div
                        className="wall"
                        style={{
                            left: `${wallX}px`,
                            height: `${rampHeight + 40}px`,
                            bottom: `${groundLevel}px`
                        }}
                    ></div>
                    <div className="flag flag-1" style={{ left: `${flag1X}px`, bottom: `${groundLevel}px` }}>
                        <FaFlag className="flag-icon" style={{ color: isGoalOneCompleted ? '#547EBC' : '#C85332' }} />
                        <span className="flag-number">1</span>
                    </div>
                    <div className="flag flag-2" style={{ left: `${flag2X}px`, bottom: `${groundLevel + rampHeight}px` }}>
                        <FaFlag className="flag-icon" style={{ color: isGoalTwoCompleted ? '#547EBC' : '#C85332' }} />
                        <span className="flag-number">2</span>
                    </div>
                    <div className="flag flag-3" style={{ left: `${flag3X}px`, bottom: `${groundLevel + rampHeight}px` }}>
                        <FaFlag className="flag-icon" style={{ color: isGoalThreeCompleted ? '#547EBC' : '#C85332' }} />
                        <span className="flag-number">3</span>
                    </div>
                    <div
                        className="car"
                        style={{
                            left: `${carPosition.x}px`,
                            bottom: `${groundLevel + carPosition.y}px`,
                            transform: `rotate(${getCarRotationAngle(carPosition.x)}rad)`,
                            transformOrigin: 'bottom center',
                            transition: 'transform 0.2s ease-out'
                        }}
                    >
                        <div className="car-image"></div>
                    </div>
                    <div className='bottom'>
                        <button className="signout-btn">
                            <img src="/SignOut.svg" alt="" />
                        </button>
                        <div className='center-container'>
                            <div className='time'>
                                <div className="timer-icon-container">
                                    <img src="/Clockblanco.svg" alt="" className='icon-bottom' />
                                </div>
                                <div className="time-display">
                                    <span>{formatTime(tiempoTotalGlobal - tiempoInicioAlumnoActual)}</span>
                                </div>
                            </div>
                            <button className="ready-btn" onClick={handleReadyClick} disabled={allStudentsCompleted || isRunning || isPaused || !simulationCompleted}>LISTO</button>
                        </div>
                    </div>
                </div>
                <div className={`compact-goals-panel ${isGoalsPanelCollapsed ? 'collapsed' : ''}`}>
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
                                <FaFlag className="flag-icon" style={{ color: isGoalOneCompleted ? '#547EBC' : '#C85332' }} />
                                <span className="flag-number">1</span>
                            </div>
                            <span className={`goal-text ${isGoalOneCompleted ? 'completed' : ''}`}
                                style={{ textDecoration: isGoalOneCompleted ? 'line-through' : 'none' }}
                            >
                                Llegar a la base de la rampa.
                            </span>
                        </div>
                        <div className="compact-goal-item">
                            <div className="compact-flag-container">
                                <FaFlag className="flag-icon" style={{ color: isGoalTwoCompleted ? '#547EBC' : '#C85332' }} />
                                <span className="flag-number">2</span>
                            </div>
                            <span className={`goal-text ${isGoalTwoCompleted ? 'completed' : ''}`}
                                style={{ textDecoration: isGoalTwoCompleted ? 'line-through' : 'none' }}
                            >
                                Llegar a la cima de la rampa.
                            </span>
                        </div>
                        <div className="compact-goal-item">
                            <div className="compact-flag-container">
                                <FaFlag className="flag-icon" style={{ color: isGoalThreeCompleted ? '#547EBC' : '#C85332' }} />
                                <span className="flag-number">3</span>
                            </div>
                            <span className={`goal-text ${isGoalThreeCompleted ? 'completed' : ''}`}
                                style={{ textDecoration: isGoalThreeCompleted ? 'line-through' : 'none' }}
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
                                    onChange={(e) => handleSliderChange(e, setPilotMass, setPilotMassInput)}
                                    disabled={isRunning}
                                />
                                <div className="value-input-container">
                                    <input
                                        type="text"
                                        className="value-input"
                                        value={pilotMassInput}
                                        onChange={handlePilotMassInputChange}
                                        onBlur={() => handleInputBlur(pilotMassInput, setPilotMass, setPilotMassInput, 30, 120)}
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
                                    onChange={(e) => handleSliderChange(e, setChassisMass, setChassisMassInput)}
                                    disabled={isRunning}
                                />
                                <div className="value-input-container">
                                    <input
                                        type="text"
                                        className="value-input"
                                        value={chassisMassInput}
                                        onChange={handleChassisMassInputChange}
                                        onBlur={() => handleInputBlur(chassisMassInput, setChassisMass, setChassisMassInput, 20, 80)}
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
                                    onChange={(e) => handleSliderChange(e, setAdditionalMass, setAdditionalMassInput)}
                                    disabled={isRunning}
                                />
                                <div className="value-input-container">
                                    <input
                                        type="text"
                                        className="value-input"
                                        value={additionalMassInput}
                                        onChange={handleAdditionalMassInputChange}
                                        onBlur={() => handleInputBlur(additionalMassInput, setAdditionalMass, setAdditionalMassInput, 0, 30)}
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
                                    onChange={(e) => handleSliderChange(e, setMotorPower, setMotorPowerInput)}
                                    disabled={isRunning}
                                />
                                <div className="value-input-container">
                                    <input
                                        type="text"
                                        className="value-input"
                                        value={motorPowerInput}
                                        onChange={handleMotorPowerInputChange}
                                        onBlur={() => handleInputBlur(motorPowerInput, setMotorPower, setMotorPowerInput, 5, 25)}
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
                    <div className={`control-buttons ${allStudentsCompleted ? 'all-completed' : ''}`}>
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
                            disabled={(!isRunning || isPaused) || allStudentsCompleted}
                        >
                            <img src="/Pause.svg" alt="" />
                        </button>
                        <button
                            className="control-btn cancel-btn"
                            onClick={cancelSimulation}
                            disabled={(!isRunning && !isPaused) || allStudentsCompleted}
                        >
                            <FaTimes className='cross' />
                        </button>
                    </div>
                </div>
            </div>

            <InfoModal
                show={showInfoModal}
                onHide={() => setShowInfoModal(false)}
            />


            <FeedbackModal
                show={showFeedbackModal}
                onHide={() => setShowFeedbackModal(false)}
            />


        </div>
    );
};
export default Simulador;


