import React, { useState, useEffect } from 'react';
import '../styles/SSHkey.css';
import Modalssh from './ModalSsh/Modalssh';

const SSHkey = () => {
    const [sshKeys, setSshKeys] = useState([]);
    const [keyName, setKeyName] = useState('');
    const [sshKey, setSshKey] = useState('');
    const [showModal, setShowModal] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL; 

    const fetchSshKeys = async () => {
        const response = await fetch(`${apiUrl}/v1/sshkeys`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        const data = await response.json();
        
        if (data && Array.isArray(data.user_ssh_keys)) {
            setSshKeys(data.user_ssh_keys);
        } else {
            setSshKeys([]);
        }
    };

    useEffect(() => {
        fetchSshKeys();
    }, []);

    const handleSendKey = async () => {
        const response = await fetch(`${apiUrl}/v1/sshkey/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                ssh_key: sshKey,
                title: keyName
            }),
        });

        setKeyName('');
        setSshKey('');
        await fetchSshKeys(); 
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setKeyName('');
        setSshKey('');
    };

    const addNewKey = (newKey) => {
        setSshKeys(prevKeys => [...prevKeys, { title: 'Новый ключ', ssh_key: newKey }]);
    };

    return (
        <div className="ssh-container">
            <button className="toggle-inputs-btn" onClick={openModal}>
                Показать SSH ключи
            </button>
            <Modalssh
                isOpen={showModal} 
                onClose={closeModal} 
                sshKeys={sshKeys}
                onAddKey={addNewKey}
                keyName={keyName}
                setKeyName={setKeyName}
                sshKey={sshKey}
                setSshKey={setSshKey}
                handleSendKey={handleSendKey}
            />
        </div>
    );
};

export default SSHkey;