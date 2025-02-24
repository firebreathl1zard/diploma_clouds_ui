import React, { useState, useEffect } from 'react';
import SshKeysTab from './SshKeysTab';

const AttachedSshKeysTab = ({ vm_id, projectId, onAddKey }) => {
    const [attachedSshKeys, setAttachedSshKeys] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL; 

    const fetchAttachedSshKeys = async () => {
        try {
            const response = await fetch(`${apiUrl}/v1/project/${projectId}/vm/${vm_id}`, {
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
            const attachedKeys = data.ssh_keys.map(key => ({
                id: key.id,
                title: key.title,
                login: key.ssh_key.split(' ')[2],
                userId: key.user_id
            }));
    
            setAttachedSshKeys(attachedKeys);
            console.log('Attached SSH Keys:', attachedKeys);
            
        } catch (error) {
            console.error('Error fetching attached SSH keys:', error);
        }
    };

    useEffect(() => {
        fetchAttachedSshKeys();

        const intervalId = setInterval(() => {
            fetchAttachedSshKeys(); 
        }, 10000);

        return () => clearInterval(intervalId);
    }, [vm_id, projectId, apiUrl]);

    return (
        <>
            <h3>Привязанные SSH</h3>
            <ul>
                {attachedSshKeys.map(key => (
                    <li key={key.id} title={key.userId}>
                        {key.title}
                    </li>
                ))}
                <li onClick={onAddKey} style={{ cursor: 'pointer', color: 'black', fontSize: '20px', textAlign: 'center' }}>
                    +
                </li>
            </ul>
        </>
    );
};

export default AttachedSshKeysTab;