import { Modal } from 'react-bootstrap';
import '../styles/FeedbackModal.css';

interface InfoModalProps {
    show: boolean;
    onHide: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ show, onHide }) => {
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
                    <h2 className='sub-title'>¡Buen Trabajo!</h2>

                    <div className='reminder'>
                        <span>Recuerda</span>
                    </div>
                   <ul className='list'>
                    <li>Chia</li>
                    <li>Cookie</li>
                    <li>Tomás</li>
                    <li>Coco</li>
                    <li>Channel</li>
                   </ul>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default InfoModal;