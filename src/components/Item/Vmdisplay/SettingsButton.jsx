import React, { useState, useEffect } from 'react';
import settingImage from '../../../images/options.png';
import '../../../styles/SSHkey.css';
import StopButton from './StopButton';
import ResetButton from './ResetButton';
import DestroyButton from './DestroyButton';
import AttachedSshKeysTab from '../Modal/AttachedSshKeysTab'; 
import SshKeysTab from '../Modal/SshKeysTab';
import PackagesTab from '../Modal/PackagesTab'; 
import PackageDetailModal from '../Modal/PackageDetailModal';

const SettingsButton = ({ vm_id, buttons, cpu, ram, projectId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('general');
    const [activeModal, setActiveModal] = useState(null);
    const [selectedPackage, setSelectedPackage] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL; 

    const toggleModal = () => {
        setIsOpen(!isOpen);
        setActiveModal(null);
        setSelectedPackage(false);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            if (activeModal) {
                setActiveModal(null);
                setSelectedPackage(false);
            } else {
                setIsOpen(false);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [activeModal]);

    const renderGeneralTab = () => (
        <>
            <h3>General</h3>
            <div className="general-info">
                <p>CPU: {cpu}</p>
                <p>RAM: {ram}</p>
            </div>
            <div className="general-buttons">
                <StopButton 
                    onClick={buttons.stop.onClick} 
                    isLoading={false}
                    vm_id={vm_id} 
                    disabled={buttons.stop.disabled} 
                />
                <ResetButton 
                    onClick={buttons.reset.onClick} 
                    isLoading={false}
                    vm_id={vm_id} 
                    disabled={buttons.reset.disabled} 
                />
                <DestroyButton 
                    onClick={buttons.destroy.onClick} 
                    isLoading={false}
                    vm_id={vm_id} 
                    disabled={buttons.destroy.disabled} 
                />
            </div>
        </>
    );

    const handleOpenSshKeysTab = () => {
        setActiveModal('sshKeys'); 
    };

    const handleCloseSshKeysTab = () => {
        setActiveModal(null);
    };
    const handleSshKeyApplied = () => {
        handleCloseSshKeysTab();
    };

    const handlePackageSelect = (pkg) => {
        setSelectedPackage(pkg);
        setActiveModal('packageDetail');
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
                        <h2>Настройки</h2>

                        {activeModal === 'packageDetail' && selectedPackage ? (
                            <PackageDetailModal 
                                packageData={selectedPackage} 
                                onClose={() => {
                                    setSelectedPackage(false);
                                    setActiveModal(null);
                                }} 
                            />
                        ) : activeModal === 'sshKeys' ? (
                            <div className="modal">
                                <div className="modal-content">
                                    <span className="close-button" onClick={handleCloseSshKeysTab}>&times;</span>
                                    <SshKeysTab vm_id={vm_id} onSshKeyApplied={handleSshKeyApplied}/>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="tabs">
                                    <button onClick={() => setActiveTab('general')} className={activeTab === 'general' ? 'active' : ''}>General</button>
                                    <button onClick={() => setActiveTab('attachedSshKeys')} className={activeTab === 'attachedSshKeys' ? 'active' : ''}>Привязанные SSH</button>
                                    <button onClick={() => setActiveTab('languages')} className={activeTab === 'languages' ? 'active' : ''}>Пакеты</button>
                                </div>

                                {activeTab === 'attachedSshKeys' ? 
                                    <AttachedSshKeysTab 
                                        vm_id={vm_id} 
                                        projectId={projectId}
                                        onAddKey={handleOpenSshKeysTab} 
                                    /> : 
                                    activeTab === 'languages' ? 
                                        <PackagesTab onPackageSelect={handlePackageSelect} /> : 
                                        renderGeneralTab()}
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SettingsButton;