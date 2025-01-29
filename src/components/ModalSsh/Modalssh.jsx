import React from 'react';
import '../../styles/modalssh.css'

const Modalssh = ({ isOpen, onClose, sshKeys, onAddKey, keyName, setKeyName, sshKey, setSshKey, handleSendKey }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>SSH Ключи</h2>
                <div className="input-container">
                    <div className="input-fields">
                        <input
                            type="text"
                            placeholder="Название ключа"
                            value={keyName}
                            onChange={(e) => setKeyName(e.target.value)}
                        />
                        <textarea
                            placeholder="SSH ключ"
                            value={sshKey}
                            onChange={(e) => setSshKey(e.target.value)}
                        />
                        <button onClick={handleSendKey}>Отправить ключ</button>
                    </div>
                </div>
                <h3>Существующие ключи:</h3>
                <div className="ssh-keys-list">
                    {sshKeys.map((key, index) => (
                        <div className="ssh-key-block" key={index}>
                            <strong className="ssh-key-title">{key.title}</strong>
                            <pre className="ssh-key-value">{key.ssh_key}</pre>
                        </div>
                    ))}
                </div>
                <button onClick={onClose}>Закрыть</button>
            </div>
        </div>
    );
};

export default Modalssh;