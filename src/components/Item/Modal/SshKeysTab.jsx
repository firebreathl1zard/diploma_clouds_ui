import React, { useState, useEffect } from 'react';

const SshKeysTab = ({ vm_id, onSshKeyApplied }) => {
    const [sshKeys, setSshKeys] = useState([]); 
    const [selectedKeyId, setSelectedKeyId] = useState(null);
    const [confirmationVisible, setConfirmationVisible] = useState(false);
    const [success, setSuccess] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL; 

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
                    setSelectedKeyId(null);
                    setConfirmationVisible(false);
                    onSshKeyApplied();
                } else {
                    const errorData = await response.json();
                    console.error('Error applying SSH key:', response.statusText, errorData);
                }
            } catch (error) {
                console.error('Error applying SSH key:', error);
            }
        }
    };

    useEffect(() => {
        fetchSshKeys();
    }, []);

    return (
        <>
            <h3>SSH Keys</h3>
            <ul>
                {Array.isArray(sshKeys) && sshKeys.map(key => (
                    <li 
                        key={key.id} 
                        onClick={() => handleKeySelect(key.id)} 
                        className={selectedKeyId === key.id ? 'selected-key' : ''}
                    >
                        {key.title} {success && selectedKeyId === key.id && '✔️'}
                    </li>
                ))}
            </ul>

            {confirmationVisible && (
                <div className="confirmation">
                    <p>Вы уверены, что хотите применить этот SSH ключ?</p>
                    <button onClick={handleConfirm}>Да</button>
                </div>
            )}
        </>
    );
};

export default SshKeysTab;