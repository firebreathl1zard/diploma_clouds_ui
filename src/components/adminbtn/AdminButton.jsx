import React, { useState } from 'react';
import '../../styles/SSHkey.css';
import AdminModal from './AdminModal';

const AdminButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    
    return (
        <div className="ssh-container">
            <button 
                className="toggle-inputs-btn" 
                style={{
                    width: '224px',
                    height: '40px',
                    backgroundColor: '#534F73',
                    borderRadius: '14px',
                    color: 'white',
                    transition: 'background-color 0.3s, color 0.3s' 
                }} 
                onClick={openModal}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#C0C9FF'; 
                    e.currentTarget.style.color = '#4937D8'; 
                }} 
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#534F73'; 
                    e.currentTarget.style.color = 'white'; 
                }}
            >
                Показать все виртуалки
            </button>
            <AdminModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
};

export default AdminButton;