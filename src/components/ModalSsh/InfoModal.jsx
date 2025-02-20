import React, { useState } from 'react';
import '../../styles/infomodal.css';

const InfoModal = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState('Windows');

    if (!isOpen) return null;

    const renderContent = () => {
        switch (activeTab) {
            case 'Windows':
                return (
                    <div>
                        <h3>Создание SSH-ключа на Windows</h3>
                        <ol>
                            <li><strong>Установите Git Bash:</strong> Скачайте и установите с <a href="https://git-scm.com/downloads" target="_blank" rel="noopener noreferrer">официального сайта Git</a>.</li>
                            <li><strong>Откройте Git Bash:</strong> Найдите в меню "Пуск".</li>
                            <li><strong>Создайте SSH-ключ:</strong> Введите команду:
                                <pre><code>ssh-keygen</code></pre>
                            </li>
                            <li><strong>Выберите место для сохранения ключа:</strong> Нажмите <code>Enter</code> для использования пути по умолчанию (<code>~/.ssh/id_rsa</code>).</li>
                            <li><strong>Введите пароль (опционально):</strong> Введите пароль или оставьте пустым.</li>
                            <li><strong>Проверьте созданные ключи:</strong> Перейдите в директорию <code>~/.ssh</code>:
                                <pre><code>cd ~/.ssh</code></pre>
                            </li>
                            <li><strong>Скопируйте публичный ключ:</strong>
                                <pre><code>cat id_rsa.pub</code></pre>
                            </li>
                            <li><strong>Вернитесь в модалку:</strong> Вставьте ключ в поле, введите название и нажмите "Отправить".</li>
                            <li><strong>Проверьте наличие ключа:</strong> Убедитесь, что он отображается ниже.</li>
                            <li><strong>Закройте модалку:</strong> Откройте проект, нажмите на шестеренку в виртуалке, выберите необходимый ключ и подтвердите привязку.</li>
                        </ol>
                    </div>
                );
            case 'Unix':
                return (
                    <div>
                        <h3>Создание SSH-ключа на Unix (macOS и Linux)</h3>
                        <ol>
                            <li><strong>Откройте терминал:</strong> Найдите в меню приложений или используйте <code>Ctrl + Alt + T</code> для Linux.</li>
                            <li><strong>Создайте SSH-ключ:</strong> Введите команду:
                                <pre><code>ssh-keygen</code></pre>
                            </li>
                            <li><strong>Выберите место для сохранения ключа:</strong> Нажмите <code>Enter</code> для использования пути по умолчанию (<code>~/.ssh/id_rsa</code>).</li>
                            <li><strong>Введите пароль (опционально):</strong> Введите пароль или оставьте пустым.</li>
                            <li><strong>Проверьте созданные ключи:</strong> Перейдите в директорию <code>~/.ssh</code>:
                                <pre><code>cd ~/.ssh</code></pre>
                            </li>
                            <li><strong>Скопируйте публичный ключ:</strong>
                                <pre><code>cat id_rsa.pub</code></pre>
                            </li>
                            <li><strong>Вернитесь в модалку:</strong> Вставьте ключ в поле, введите название и нажмите "Отправить".</li>
                            <li><strong>Проверьте наличие ключа:</strong> Убедитесь, что он отображается ниже.</li>
                            <li><strong>Закройте модалку:</strong> Откройте проект, нажмите на шестеренку в виртуалке, выберите необходимый ключ и подтвердите привязку.</li>
                        </ol>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={onClose} className="close-button" aria-label="Закрыть">
                    &times;
                </button>
                <h2>Инструкция</h2>
                <div className="tabs">
                    <button onClick={() => setActiveTab('Windows')} className={activeTab === 'Windows' ? 'active' : ''}>Windows</button>
                    <button onClick={() => setActiveTab('Unix')} className={activeTab === 'Unix' ? 'active' : ''}>Unix (macOS, Linux)</button>
                </div>
                <div className="tab-content">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default InfoModal;