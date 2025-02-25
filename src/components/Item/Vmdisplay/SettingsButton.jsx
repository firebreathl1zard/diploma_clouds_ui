import React, { useState, useEffect } from 'react';
import settingImage from '../../../images/2849830-gear-interface-multimedia-options-setting-settings_107986.png';

const SettingsButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [sshKeys, setSshKeys] = useState([]); 
    const [vms, setVms] = useState([]);
    const [selectedKeyId, setSelectedKeyId] = useState(null);
    const [selectedVmId, setSelectedVmId] = useState(null);
    const [confirmationVisible, setConfirmationVisible] = useState(false);
    const [success, setSuccess] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL; 

    const toggleModal = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            fetchSshKeys();
            fetchVms();
            resetState();
        }
    };

    const resetState = () => {
        setSshKeys([]);
        setVms([]);
        setSelectedKeyId(null);
        setSelectedVmId(null);
        setConfirmationVisible(false);
        setSuccess(false);
    };

    const fetchSshKeys = async () => {
        try {
            const response = await fetch(`${apiUrl}/v1/sshkeys`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setSshKeys(data);
        } catch (error) {
            console.error('Error fetching SSH keys:', error);
        }
    };

    const fetchVms = async () => {
        try {
            const response = await fetch(`${apiUrl}/v1/project/id/vms`); // Замените 'id' на фактический ID проекта
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setVms(data);
            if (data.length > 0) {
                setSelectedVmId(data.id); // Автоматически выбрать первую ВМ
            }
        } catch (error) {
            console.error('Error fetching VMs:', error);
        }
    };

    const handleKeySelect = (keyId) => {
        setSelectedKeyId(keyId);
        setConfirmationVisible(true);
    };

    const handleConfirm = async () => {
        if (selectedKeyId && selectedVmId) {
            try {
                const response = await fetch('https://api.firebreathlizard.space/api/v1/sshkey/apply', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        vm_id: selectedVmId,
                        ssh_key_id: selectedKeyId,
                    }),
                });

                if (response.ok) {
                    setSuccess(true);
                } else {
                    console.error('Error applying SSH key:', response.statusText);
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
                            {sshKeys.map(key => (
                                <li key={key.id} onClick={() => handleKeySelect(key.id)}>
                                    {key.title} {success && selectedKeyId === key.id && '✔️'}
                                </li>
                            ))}
                        </ul>

                        <h3>Virtual Machines</h3>
                        <ul>
                            {vms.map(vm => (
                                <li key={vm.id}>
                                    {vm.name} {selectedVmId === vm.id && '✔️'}
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