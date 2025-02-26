import React, { useState, useEffect } from 'react';
import '../../styles/modalssh.css';
import InfoModal from './InfoModal';
import deletesImage from '../../images/editdelete_104494.png';

const Modalssh = ({ isOpen, onClose, sshKeys, onAddKey }) => {
    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const [newKeyName, setNewKeyName] = useState('');
    const [newSshKey, setNewSshKey] = useState('');
    const [isAddingKey, setIsAddingKey] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const apiUrl = process.env.REACT_APP_API_URL; 

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                if (isInfoOpen) {
                    setIsInfoOpen(false);
                } else {
                    onClose();
                }
            }
        };

        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [isInfoOpen, onClose]);

    if (!isOpen) return null;

    const handleInfoClick = () => {
        setIsInfoOpen(true);
    };

    const closeInfoModal = () => {
        setIsInfoOpen(false);
    };

    const formatSshKey = (sshKey) => {
        const parts = sshKey.split(' ');
        const keyType = parts[0];
        const keyValue = parts[1];
        const userName = parts.slice(2).join(' ');
    
        const formattedKeyValue = keyValue.slice(0, 10) + '...';
    
        return `${keyType} ${formattedKeyValue} ${userName}`;
    };

    const handleAddKey = async () => {
        if (newKeyName && newSshKey) {
            try {
                const response = await fetch(`${apiUrl}/v1/sshkey/save`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        ssh_key: newSshKey,
                        title: newKeyName,
                    }),
                });
    
                if (response.ok) {
                    setNewKeyName('');
                    setNewSshKey('');
                    setIsAddingKey(false);
                    setErrorMessage('');
                } else {
                    const errorData = await response.json();
                    setErrorMessage(errorData.message || 'Ошибка при добавлении ключа');
                }
            } catch (error) {
                console.error('Ошибка при отправке запроса:', error);
                setErrorMessage('Ошибка при отправке запроса');
            }
        }
    };

    const handleCancelAddKey = () => {
        setNewKeyName('');
        setNewSshKey('');
        setIsAddingKey(false);
    };

    const handleDeleteKey = async (sshKeyId) => {
        try {
            const response = await fetch(`${apiUrl}/v1/sshkey/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    ssh_key_id: sshKeyId,
                }),
            });

            if (response.ok) {
                console.log('Удаляем ключ с идентификатором:', sshKeyId);
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Ошибка при удалении ключа');
            }
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
            setErrorMessage('Ошибка при отправке запроса');
        }
    };

    return (
        <div className="modal-overlay">
            {isInfoOpen ? (
                <InfoModal isOpen={isInfoOpen} onClose={closeInfoModal} />
            ) : (
                <div className="modal-content" style={{ position: 'relative' }}>
                    <button onClick={onClose} className="close-button" aria-label="Закрыть">
                        &times;
                    </button>
                    <button onClick={handleInfoClick} className="info-button" aria-label="Информация">
                        <span className="info-icon">i</span>
                    </button>
                    <h2>SSH Ключи</h2>
                    {errorMessage && <div className="error-message">{errorMessage}</div>} 
                    <table className="ssh-keys-table">
                        <thead>
                            <tr>
                                <th>Название</th>
                                <th>Значение</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sshKeys.map((key, index) => (
                            <tr key={index}>
                                <td className="ssh-key-title">{key.title}</td>
                                <td className="ssh-key-value"><pre>{formatSshKey(key.ssh_key)}</pre></td>
                                <td style={{alignItems: 'center'}}>
                                <button 
                                    style={{ backgroundColor: 'transparent', border: 'none' }} 
                                    onClick={() => handleDeleteKey(key.id)}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.querySelector('img').style.filter = 'invert(36%) sepia(100%) saturate(0%) hue-rotate(210deg) brightness(100%) contrast(100%)';
                                    }} 
                                    onMouseLeave={(e) => {
                                        e.currentTarget.querySelector('img').style.filter = 'none'; 
                                    }}
                                >
                                    <img 
                                        style={{ width: '25px', height: '25px', transition: 'filter 0.3s' }} 
                                        src={deletesImage} 
                                        alt="deletessh" 
                                    />
                                </button>
                                </td>
                            </tr>
                            ))}
                            {isAddingKey ? (
                                <tr>
                                    <td>
                                        <input
                                            type="text"
                                            placeholder="Название ключа"
                                            value={newKeyName}
                                            onChange={(e) => setNewKeyName(e.target.value)}
                                            className="fixed-input"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            placeholder="SSH ключ"
                                            value={newSshKey}
                                            onChange={(e) => setNewSshKey(e.target.value)}
                                            className="fixed-textarea"
                                        />
                                    </td>
                                    <td>
                                        <div className="button-group">
                                        <button 
                                            className="toggle-inputs-btn" 
                                            style={{
                                                backgroundColor: 'transparent',
                                                borderRadius: '14px',
                                                color: '#ffffff',
                                                transition: 'background-color 0.3s, color 0.3s' 
                                            }} 
                                            onClick={handleAddKey}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.color = '#4937D8'; 
                                            }} 
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.color = '#ffffff'; 
                                            }}
                                        >
                                            Подтвердить
                                        </button>

                                        <button 
                                            className="toggle-inputs-btn" 
                                            style={{
                                                backgroundColor: 'transparent',
                                                borderRadius: '14px',
                                                color: '#ffffff',
                                                transition: 'background-color 0.3s, color 0.3s' 
                                            }} 
                                            onClick={handleCancelAddKey}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.color = '#4937D8'; 
                                            }} 
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.color = '#ffffff'; 
                                            }}
                                        >
                                            Отмена
                                        </button>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td colSpan="3">
                                    <button 
                                        style={{
                                            backgroundColor: 'transparent',
                                            color: '#ffffff',
                                            border: 'none',
                                            borderRadius: '14px',
                                            transition: 'color 0.3s' 
                                        }} 
                                        onClick={() => setIsAddingKey(true)}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.color = '#4937D8'; 
                                        }} 
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.color = '#ffffff'; 
                                        }}
                                    >
                                        Добавить ключ
                                    </button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Modalssh;