import React, { useState, useEffect } from 'react';
import '../styles/SSHkey.css';
import Modalssh from './ModalSsh/Modalssh';

const SSHkey = () => {
    const [sshKeys, setSshKeys] = useState([]);
    const [keyName, setKeyName] = useState('');
    const [sshKey, setSshKey] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const fetchSshKeys = async () => {
        if (username) {
            try {
                const response = await fetch(`http://ivan.firebreathlizard.space:8000/api/v1/sshkeys?login=${username}`);
                if (!response.ok) {
                    throw new Error('Ошибка при получении SSH ключей');
                }
                const data = await response.json();
                
                if (data && Array.isArray(data.user_ssh_keys)) {
                    setSshKeys(data.user_ssh_keys);
                } else {
                    console.error('Полученные данные не содержат массив user_ssh_keys:', data);
                    setSshKeys([]);
                }
            } catch (error) {
                console.error('Ошибка при получении SSH ключей:', error.message);
                alert('Не удалось получить SSH ключи. Пожалуйста, проверьте соединение с сервером.');
            }
        }
    };

    useEffect(() => {
        fetchSshKeys();
    }, [username]);

    const validateSSHKey = (key) => {
        const trimmedKey = key.trim();
        const regex = /^(ssh-(rsa|dss|ed25519|ecdsa-sha2-nistp(256|384|521)|rsa-cert-v01@openssh.com|ed25519-cert-v01@openssh.com|ecdsa-sha2-nistp(256|384|521)-cert-v01@openssh.com)) ([A-Za-z0-9+/=]+) ?(.*)?$/;

        return regex.test(trimmedKey);
    };

    const handleSendKey = async () => {
        if (!username) {
            alert('Пожалуйста, войдите в систему, чтобы отправить SSH ключ.');
            return;
        }

        if (validateSSHKey(sshKey)) {
            try {
                const response = await fetch('http://ivan.firebreathlizard.space:8000/api/v1/sshkey/save', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user_login: username,
                        ssh_key: sshKey,
                        title: keyName
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Ошибка: ${response.status} ${errorData.message || response.statusText}`);
                }

                // После успешной отправки, запрашиваем SSH ключи
                setKeyName('');
                setSshKey('');
                await fetchSshKeys(); // Обновляем список ключей

            } catch (error) {
                console.error('Ошибка при отправке SSH ключа:', error.message);
                alert('Не удалось отправить SSH ключ. Пожалуйста, проверьте соединение с сервером.');
            }
        } else {
            alert('Неверный SSH ключ. Пожалуйста, проверьте его.');
        }
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