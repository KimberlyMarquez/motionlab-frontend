import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import '../styles/TutoModal.css';

interface InfoModalProps {
    show: boolean;
    onHide: () => void;
}

interface Tooltip {
    id: number;
    x: number;
    y: number;
    text: string;
    visible: boolean;
    arrowPosition: 'arrow-top' | 'arrow-bottom' | 'arrow-left' | 'arrow-right';
}

const InfoModal: React.FC<InfoModalProps> = ({ show, onHide }) => {
    const [tooltips, setTooltips] = useState<Tooltip[]>([
        { id: 1, x: 13, y: 25, text: "Leaderboard", visible: false, arrowPosition: 'arrow-top' },
        { id: 2, x: 30, y: 8, text: "Tutorial", visible: false, arrowPosition: 'arrow-left' },
        { id: 3, x: 44, y: 22, text: "Metas", visible: false, arrowPosition: 'arrow-right' }
    ]);

    // Animación para mostrar los tooltips uno por uno
    useEffect(() => {
        if (!show) return;

        const timeouts = tooltips.map((tip, index) => {
            return setTimeout(() => {
                setTooltips(prev => prev.map(t =>
                    t.id === tip.id ? { ...t, visible: true } : t
                ));
            }, index * 500);
        });

        return () => timeouts.forEach(t => clearTimeout(t));
    }, [show]);

    return (
        <Modal show={show} onHide={onHide} centered size="lg" className="tutorial-modal">
            <Modal.Header closeButton={false} className="modal-header-custom d-flex justify-content-between align-items-center">
                <Modal.Title className="modal-title">
                    Tutorial
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
                <div className="image-container">
                    <img
                        src="/img/Fakepic.png"
                        alt="Guía del simulador"
                        className="simulator-image"
                    />

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
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default InfoModal;