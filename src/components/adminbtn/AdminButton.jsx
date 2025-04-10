import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/SSHkey.css';

const AdminButton = () => {
    return (
        <div className="ssh-container">
            <Link 
                to="/admin" 
                style={{
                    textDecoration: 'none'
                }}
            >
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
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#C0C9FF'; 
                        e.currentTarget.style.color = '#4937D8'; 
                    }} 
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#534F73'; 
                        e.currentTarget.style.color = 'white'; 
                    }}
                >
                    Админ панель
                </button>
            </Link>
        </div>
    );
};

export default AdminButton;