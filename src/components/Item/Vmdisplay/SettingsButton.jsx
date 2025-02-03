import React, { useState } from 'react';
import settingImage from '../../../images/2849830-gear-interface-multimedia-options-setting-settings_107986.png';

const SettingsButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [sshKeys, setSshKeys] = useState([]); 
    const [vms, setVms] = useState([]);
    const [selectedKeyId, setSelectedKeyId] = useState(null);
    const [confirmationVisible, setConfirmationVisible] = useState(false);
    const [success, setSuccess] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
        // Reset states when modal is closed
        if (isOpen) {
            setSshKeys([]);
            setVms([]);
            setSelectedKeyId(null);
            setConfirmationVisible(false);
            setSuccess(false);
        }
    };

    const handleKeySelect = (keyId) => {
        setSelectedKeyId(keyId);
        setConfirmationVisible(true);
    };

    const handleConfirm = () => {
        if (selectedKeyId) {
            // Simulate success
            setSuccess(true);
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
                            {sshKeys.map(key => (
                                <li key={key.id} onClick={() => handleKeySelect(key.id)}>
                                    {key.title} {success && selectedKeyId === key.id && '✔️'}
                                </li>
                            ))}
                        </ul>

                        {confirmationVisible && (
                            <div>
                                <p>Вы уверены, что хотите применить этот SSH ключ?</p>
                                <button onClick={handleConfirm}>Да</button>
                                <button onClick={() => setConfirmationVisible(false)}>Нет</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SettingsButton;