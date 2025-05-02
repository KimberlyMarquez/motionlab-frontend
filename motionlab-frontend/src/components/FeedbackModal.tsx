import { Modal } from 'react-bootstrap';
import '../styles/FeedbackModal.css';

interface FeedbackModalProps {
    show: boolean;
    onHide: () => void;
    tiemposRegistrados?: { [key: string]: number };
    goalsCompleted?: {
        goal1: boolean;
        goal2: boolean;
        goal3: boolean;
    };
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({
    show,
    onHide,
    tiemposRegistrados = {},
    goalsCompleted = { goal1: false, goal2: false, goal3: false }
}) => {
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        const milliseconds = Math.floor((time % 1) * 100);
        return `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
    };

    const avgTime = Object.values(tiemposRegistrados).length > 0
        ? Object.values(tiemposRegistrados).reduce((a, b) => a + b, 0) / Object.values(tiemposRegistrados).length
        : 0;

    let feedbackMessage = "¡Simulación completada!";
    if (goalsCompleted.goal3) {
        feedbackMessage = "¡Excelente trabajo! Han logrado completar todo el recorrido.";
    } else if (goalsCompleted.goal2) {
        feedbackMessage = "¡Buen intento! Lograron subir la rampa pero no completaron el recorrido.";
    } else if (goalsCompleted.goal1) {
        feedbackMessage = "Han llegado a la base de la rampa. Ajusten los parámetros para subir la rampa.";
    } else {
        feedbackMessage = "Intenten ajustar los parámetros para mejorar el rendimiento del carro.";
    }

    return (
        <Modal show={show} onHide={onHide} centered size="lg" className="feedback-modal">
            <Modal.Header closeButton={false} className="modal-header-custom d-flex justify-content-between align-items-center">
                <Modal.Title className="modal-title">
                    Feedback
                </Modal.Title>
                <button
                    className="custom-close-button"
                    onClick={onHide}
                    aria-label="Close"
                >
                    <span className="close-icon">×</span>
                </button>
            </Modal.Header>
            <Modal.Body className="modal-body-custom">
                <div>
                    <h2 className='sub-title'>{feedbackMessage}</h2>

                    <div className='reminder'>
                        <span>Resumen de la simulación</span>
                    </div>
                    <ul className='list'>
                        <li>Tiempo promedio: {formatTime(avgTime)}</li>
                        <li>Metas alcanzadas: {
                            [
                                goalsCompleted.goal1 ? "Base de la rampa" : "",
                                goalsCompleted.goal2 ? "Cima de la rampa" : "",
                                goalsCompleted.goal3 ? "Recorrido completo" : ""
                            ].filter(Boolean).join(", ") || "Ninguna"
                        }</li>
                        <li>Recuerda que la masa y potencia afectan el desempeño del carro</li>
                        <li>Incrementar la potencia del motor ayuda a subir la rampa</li>
                        <li>Reducir la masa total mejora la velocidad y aceleración</li>
                    </ul>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default FeedbackModal;