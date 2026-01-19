import React, { useEffect } from 'react';
import '../../styles/AdminModal.css';

const AdminModal = ({ isOpen, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Виртуальные машины</h2>
                <div className="loader"></div>
                <button className="close-button" onClick={onClose} aria-label="Закрыть">
                    &times;
                </button>
            </div>
        </div>
    );
};

export default AdminModal;