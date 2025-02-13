import React, { useState } from 'react';
import settingImage from '../../../images/2849830-gear-interface-multimedia-options-setting-settings_107986.png';
import '../../../styles/SSHkey.css';

const SettingsButton = ({ vm_id }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [sshKeys, setSshKeys] = useState([]); 
    const [selectedKeyId, setSelectedKeyId] = useState(null);
    const [confirmationVisible, setConfirmationVisible] = useState(false);
    const [success, setSuccess] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL; 

    const toggleModal = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            fetchSshKeys();
            resetState();
        }
    };

    const resetState = () => {
        setSshKeys([]);
        setSelectedKeyId(null);
        setConfirmationVisible(false);
        setSuccess(false);
    };

    const fetchSshKeys = async () => {
        try {
            const response = await fetch(`${apiUrl}/v1/sshkeys`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            
            const sshKeys = data.user_ssh_keys.map(key => ({
                id: key.id,
                title: key.title,
                ssh_key: key.ssh_key
            }));
    
            setSshKeys(sshKeys);
            console.log('SSH Keys:', sshKeys);
            
        } catch (error) {
            console.error('Error fetching SSH keys:', error);
        }
    };

    const handleKeySelect = (keyId) => {
        setSelectedKeyId(keyId);
        setConfirmationVisible(true);
    };

    const handleConfirm = async () => {
        if (selectedKeyId) {
            try {
                const response = await fetch(`${apiUrl}/v1/sshkey/apply`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        vm_id: String(vm_id),
                        ssh_key_id: String(selectedKeyId),
                    }),
                });
    
                if (response.ok) {
                    setSuccess(true);
                } else {
                    const errorData = await response.json();
                    console.error('Error applying SSH key:', response.statusText, errorData);
                }
            } catch (error) {
                console.error('Error applying SSH key:', error);
            }
            setConfirmationVisible(false);
        }
    };

    return (
        <div>
            <button className="settings-button" onClick={toggleModal}>
                <img src={settingImage} alt="Settings" />
            </button>

            {isOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={toggleModal}>&times;</span>
                        <h2>Присвоение ssh ключа</h2>

                        <h3>SSH Keys</h3>
                        <ul>
                            {Array.isArray(sshKeys) && sshKeys.map(key => (
                                <li 
                                    key={key.id} 
                                    onClick={() => handleKeySelect(key.id)} 
                                    className={selectedKeyId === key.id ? 'selected-key' : ''}
                                >
                                    {key.title} {success && selectedKeyId === key.id && '✔️'}
                                    {/* <div>{key.ssh_key}</div> */}
                                </li>
                            ))}
                        </ul>

                        {confirmationVisible && (
                            <div>
                                <p>Вы уверены, что хотите применить этот SSH ключ?</p>
                                <button onClick={handleConfirm}>Да</button>
                                {/* <button onClick={() => setConfirmationVisible(false)}>Нет</button> */}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SettingsButton;