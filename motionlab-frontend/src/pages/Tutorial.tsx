import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Tutorial.css';

interface Tooltip {
    id: number;
    x: number;
    y: number;
    text: string;
    visible: boolean;
    arrowPosition: 'arrow-top' | 'arrow-bottom' | 'arrow-left' | 'arrow-right';
}

const Tutorial = () => {
    const [tooltips, setTooltips] = useState<Tooltip[]>([
        { id: 1, x: 22, y: 27, text: "Leaderboard", visible: false, arrowPosition: 'arrow-top' },
        { id: 2, x: 31, y: 20, text: "Tutorial", visible: false, arrowPosition: 'arrow-left' },
        { id: 3, x: 48, y: 31, text: "Metas completadas", visible: false, arrowPosition: 'arrow-right' },
        { id: 3, x: 49.5, y: 37, text: "Meta Pendientes", visible: false, arrowPosition: 'arrow-right' },
        { id: 1, x: 39, y: 11, text: "Turno del Estudiante", visible: false, arrowPosition: 'arrow-bottom' },
        { id: 3, x: 29, y: 42, text: "Tiempos por Estudiante", visible: false, arrowPosition: 'arrow-left' },
        { id: 1, x: 22, y: 60, text: "Meta Asignada", visible: false, arrowPosition: 'arrow-bottom' },
        { id: 1, x: 14, y: 74, text: "Salida", visible: false, arrowPosition: 'arrow-bottom' },
        { id: 1, x: 36.5, y: 68, text: "Tiempo Transcurrido por Estudiante", visible: false, arrowPosition: 'arrow-bottom' },
        { id: 1, x: 30, y: 82, text: "Finalizar Turno", visible: false, arrowPosition: 'arrow-right' },
        { id: 3, x: 58, y: 82, text: "Comenzar Simulación", visible: false, arrowPosition: 'arrow-right' },
        { id: 3, x: 56, y: 11, text: "Tiempo total transcurrido del equipo", visible: false, arrowPosition: 'arrow-bottom' },
        { id: 3, x: 78, y: 12, text: "Reiniciar parametros", visible: false, arrowPosition: 'arrow-bottom' },
        { id: 2, x: 86, y: 28, text: "Parametros definidos por profesor", visible: false, arrowPosition: 'arrow-left' },
        { id: 2, x: 86, y: 49, text: "Parametros definidos por estudiante", visible: false, arrowPosition: 'arrow-left' },
        { id: 2, x: 86, y: 67, text: "Estadísticas por simulación", visible: false, arrowPosition: 'arrow-left' },
        { id: 3, x: 73.8, y: 88, text: "Pausar simulación", visible: false, arrowPosition: 'arrow-top' },
        { id: 3, x: 86, y: 82.5, text: "Cancelar simulación", visible: false, arrowPosition: 'arrow-left' },
    ]);

    useEffect(() => {
        const timeouts = tooltips.map((tip, index) => {
            return setTimeout(() => {
                setTooltips(prev => prev.map(t =>
                    t.id === tip.id ? { ...t, visible: true } : t
                ));
            }, index * 500);
        });

        return () => timeouts.forEach(t => clearTimeout(t));
    }, []);

    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(10);

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/simulador');
        }, 10000);

        const countdownInterval = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(countdownInterval);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => {
            clearTimeout(timer);
            clearInterval(countdownInterval);
        };
    }, [navigate]);

    return (
        <div className="tutorial-container">
            <h1 className="tutorial-titulo">Tutorial</h1>
            <div className="imagen-container">
                <img src="/TutoIMG.png" alt="Tutorial" className="imagen-tuto" />
            </div>
            <h2 className="contador">La partida empieza en... <span className="contador-number"> {timeLeft} s</span></h2>

            {tooltips.map(tooltip => (
                <div
                    key={tooltip.id}
                    className={`tooltip ${tooltip.arrowPosition} ${tooltip.visible ? 'visible' : ''}`}
                    style={{
                        left: `${tooltip.x}%`,
                        top: `${tooltip.y}%`,
                        animationDelay: `${tooltip.id * 0.3}s`
                    }}
                >
                    <div className="tooltip-text">{tooltip.text}</div>
                </div>
            ))}
        </div >
    );
}

export default Tutorial;