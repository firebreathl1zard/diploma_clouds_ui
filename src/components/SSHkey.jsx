import React, { useState, useEffect } from 'react';
import '../styles/SSHkey.css';

const SSHkey = () => {
    const [sshKeys, setSshKeys] = useState([]);
    const [keyName, setKeyName] = useState('');
    const [sshKey, setSshKey] = useState('');
    const [showInputs, setShowInputs] = useState(false);

    
    useEffect(() => {
        const storedKeys = JSON.parse(localStorage.getItem('sshKeys')) || [];
        setSshKeys(storedKeys);
    }, []);

    
    useEffect(() => {
        localStorage.setItem('sshKeys', JSON.stringify(sshKeys));
    }, [sshKeys]);

    const validateSSHKey = (key) => {
        
        const regex = /^(ssh-rsa|ssh-ed25519) [A-Za-z0-9+/=]+( [^\s]+)?$/;
        return regex.test(key);
    };

    const handleSaveKey = () => {
        if (validateSSHKey(sshKey)) {
            const newKey = {
                name: keyName,
                key: sshKey,
                createdAt: new Date().toLocaleString(),
            };
            setSshKeys((prevKeys) => [...prevKeys, newKey]);
            setKeyName('');
            setSshKey('');
        } else {
            alert('Неверный SSH ключ. Пожалуйста, проверьте его.');
        }
    };

    const handleDeleteKey = (index) => {
        const updatedKeys = sshKeys.filter((_, i) => i !== index);
        setSshKeys(updatedKeys);
    };

    return (
        <div className="ssh-container">
            <button className="toggle-inputs-btn" onClick={() => setShowInputs(!showInputs)}>
                SSH ключ
            </button>
            {showInputs && (
                <div className="input-container">
                    <div className="input-fields">
                        <input
                            type="text"
                            value={keyName}
                            onChange={(e) => setKeyName(e.target.value)}
                            placeholder="Имя SSH ключа"
                        />
                        <textarea
                            value={sshKey}
                            onChange={(e) => setSshKey(e.target.value)}
                            placeholder="Введите SSH ключ"
                            rows="4"
                        />
                    </div>
                    <button className="save-key-btn" onClick={handleSaveKey}>Сохранить ключ</button>
                </div>
            )}
            <div className="ssh-keys-list">
                {sshKeys.map((key, index) => (
                    <div key={index} className="ssh-key-block">
                        <span>
                            {key.name} <span className="key-icon">🔑</span>
                        </span>
                        <span>{key.key}</span>
                        <span>{key.createdAt}</span>
                        <button className="delete-key-btn" onClick={() => handleDeleteKey(index)}>Удалить</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SSHkey;