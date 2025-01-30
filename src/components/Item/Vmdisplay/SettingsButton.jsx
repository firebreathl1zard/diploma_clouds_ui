import React, { useState, useEffect } from 'react';
import settingImage from '../../../images/2849830-gear-interface-multimedia-options-setting-settings_107986.png';

const SettingsButton = ({ username, projectId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [sshKeys, setSshKeys] = useState([]); 
    const [vms, setVms] = useState([]);
    const [selectedKeyId, setSelectedKeyId] = useState(null);
    const [confirmationVisible, setConfirmationVisible] = useState(false);
    const [success, setSuccess] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            fetchSshKeys();
            fetchVms();
        }
    };

    const fetchSshKeys = async () => {
        try {
            const response = await fetch(`http://ivan.firebreathlizard.space:8000/api/v1/sshkeys?login=${username}`);
            const data = await response.json();
            
            if (Array.isArray(data)) {
                setSshKeys(data);
            } else {
                console.error('Expected an array of SSH keys, but got:', data);
                setSshKeys([]); 
            }
        } catch (error) {
            console.error('Error fetching SSH keys:', error);
            setSshKeys([]); 
        }
    };

    const fetchVms = async () => {
        try {
            const response = await fetch(`http://ivan.firebreathlizard.space:8000/api/v1/project/${projectId}/vms`);
            const data = await response.json();
            setVms(data);
        } catch (error) {
            console.error('Error fetching VMs:', error);
        }
    };

    const handleKeySelect = (keyId) => {
        setSelectedKeyId(keyId);
        setConfirmationVisible(true);
    };

    const handleConfirm = async () => {
        if (selectedKeyId) {
            try {
                const response = await fetch('http://ivan.firebreathlizard.space:8000/api/v1/sshkey/apply', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        vm_id: vms[0]?.id, 
                        ssh_key_id: selectedKeyId,
                    }),
                });

                if (response.ok) {
                    setSuccess(true);
                    setConfirmationVisible(false);
                } else {
                    console.error('Error applying SSH key:', response.statusText);
                }
            } catch (error) {
                console.error('Error applying SSH key:', error);
            }
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
                                <button onClick={() => setConfirmationVisible (false)}>Нет</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SettingsButton;