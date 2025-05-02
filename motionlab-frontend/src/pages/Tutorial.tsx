import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Tutorial.css';

interface Tooltip {
    id: number;
    x: number;
    y: number;
    text: string;
    visible: boolean;
    arrowPosition: 'arrow-top' | 'arrow-bottom' | 'arrow-left' | 'arrow-right' | 'arrow-topright';
}

const Tutorial = () => {
    const [tooltips, setTooltips] = useState<Tooltip[]>([
        { id: 1, x: 22, y: 22, text: "Leaderboard", visible: false, arrowPosition: 'arrow-top' },
        { id: 2, x: 31, y: 15, text: "Tutorial", visible: false, arrowPosition: 'arrow-left' },
        { id: 3, x: 48, y: 25, text: "Metas completadas", visible: false, arrowPosition: 'arrow-right' },
        { id: 3, x: 49.5, y: 32, text: "Meta pendientes", visible: false, arrowPosition: 'arrow-right' },
        { id: 1, x: 35, y: 25, text: "Turno del estudiante", visible: false, arrowPosition: 'arrow-topright' },
        { id: 3, x: 29, y: 35, text: "Tiempos por estudiante", visible: false, arrowPosition: 'arrow-left' },
        { id: 1, x: 22, y: 55, text: "Meta asignada", visible: false, arrowPosition: 'arrow-bottom' },
        { id: 1, x: 14, y: 69, text: "Salida", visible: false, arrowPosition: 'arrow-bottom' },
        { id: 1, x: 36.5, y: 63, text: "Tiempo transcurrido por estudiante", visible: false, arrowPosition: 'arrow-bottom' },
        { id: 1, x: 29, y: 77, text: "Finalizar turno", visible: false, arrowPosition: 'arrow-right' },
        { id: 3, x: 58, y: 77, text: "Comenzar simulación", visible: false, arrowPosition: 'arrow-right' },
        { id: 3, x: 56, y: 5, text: "Tiempo transcurrido del equipo", visible: false, arrowPosition: 'arrow-bottom' },
        { id: 3, x: 87, y: 13, text: "Reiniciar parametros", visible: false, arrowPosition: 'arrow-left' },
        { id: 2, x: 86, y: 23, text: "Parametros definidos por profesor", visible: false, arrowPosition: 'arrow-left' },
        { id: 2, x: 86, y: 43, text: "Parametros definidos por estudiante", visible: false, arrowPosition: 'arrow-left' },
        { id: 2, x: 86, y: 60, text: "Estadísticas por simulación", visible: false, arrowPosition: 'arrow-left' },
        { id: 3, x: 73.9, y: 84, text: "Pausar simulación", visible: false, arrowPosition: 'arrow-top' },
        { id: 3, x: 86, y: 77, text: "Cancelar simulación", visible: false, arrowPosition: 'arrow-left' },
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