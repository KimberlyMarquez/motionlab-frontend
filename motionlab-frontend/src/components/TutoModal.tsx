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
        { id: 1, x: 11.5, y: 19, text: "Leaderboard", visible: false, arrowPosition: 'arrow-top' },
        { id: 2, x: 26, y: 8, text: "Tutorial", visible: false, arrowPosition: 'arrow-left' },
        { id: 3, x: 45, y: 22, text: "Metas completadas", visible: false, arrowPosition: 'arrow-right' },
        { id: 3, x: 47, y: 31, text: "Meta Pendientes", visible: false, arrowPosition: 'arrow-right' },
        { id: 1, x: 33, y: -5, text: "Turno del Estudiante", visible: false, arrowPosition: 'arrow-bottom' },
        { id: 3, x: 23, y: 35, text: "Tiempos por Estudiante", visible: false, arrowPosition: 'arrow-left' },
        { id: 1, x: 12, y: 56, text: "Meta Asignada", visible: false, arrowPosition: 'arrow-bottom' },
        { id: 1, x: 2, y: 74, text: "Salida", visible: false, arrowPosition: 'arrow-bottom' },
        { id: 1, x: 29, y: 64, text: "Tiempo Transcurrido por Estudiante", visible: false, arrowPosition: 'arrow-bottom' },
        { id: 1, x: 18, y: 85, text: "Finalizar Turno", visible: false, arrowPosition: 'arrow-right' },
        { id: 3, x: 56, y: 85, text: "Comenzar Simulación", visible: false, arrowPosition: 'arrow-right' },
        { id: 3, x: 56, y: -7, text: "Tiempo total transcurrido del equipo", visible: false, arrowPosition: 'arrow-bottom' },
        { id: 3, x: 88, y: -6, text: "Reiniciar parametros", visible: false, arrowPosition: 'arrow-bottom' },
        { id: 2, x: 98, y: 13, text: "Parametros definidos por profesor", visible: false, arrowPosition: 'arrow-left' },
        { id: 2, x: 98, y: 40, text: "Parametros definidos por estudiante", visible: false, arrowPosition: 'arrow-left' },
        { id: 2, x: 98, y: 65, text: "Estadísticas por simulación", visible: false, arrowPosition: 'arrow-left' },
        { id: 3, x: 79.5, y: 96, text: "Pausar simulación", visible: false, arrowPosition: 'arrow-top' },
        { id: 3, x: 98, y: 84, text: "Cancelar simulación", visible: false, arrowPosition: 'arrow-left' },
    ]);

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
                        src="/TutoIMG.png"
                        alt="Guía del simulador"
                        className="simulator-image"
                    />
                </div>

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
            </Modal.Body>
        </Modal>
    );
};

export default InfoModal;