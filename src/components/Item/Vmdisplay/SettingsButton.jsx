import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import settingImage from '../../../images/options.png';
import '../../../styles/SSHkey.css';
import StopButton from './StopButton';
import ResetButton from './ResetButton';
import DestroyButton from './DestroyButton';
import AttachedSshKeysTab from '../Modal/AttachedSshKeysTab'; 
import SshKeysTab from '../Modal/SshKeysTab';
import PackagesTab from '../Modal/PackagesTab'; 
import PackageDetailModal from '../Modal/PackageDetailModal';
import AvailablePackagesModal from '../Modal/AvailablePackagesModal';
import Investment from '../Investment';
import PaymentButton from '../PaymentButton';

const SettingsButton = ({ vm_id, buttons, cpu, ram, projectId, vm_ip, userLogin }) => {
    const [packages, setPackages] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('general');
    const [activeModal, setActiveModal] = useState(null);
    const [selectedPackage, setSelectedPackage] = useState(false);
    const [isAvailablePackagesModalOpen, setIsAvailablePackagesModalOpen] = useState(false);
    const userData = useSelector((state) => state.user);
    const apiUrl = process.env.REACT_APP_API_URL; 

    const toggleModal = () => {
        setIsOpen(!isOpen);
        setActiveModal(null);
        setSelectedPackage(false);
        setIsAvailablePackagesModalOpen(false);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            if (activeModal === 'packageDetail') {
                handleClosePackageDetailModal();
            } else if (activeModal === 'sshKeys') {
                handleCloseSshKeysTab();
            } else if (isAvailablePackagesModalOpen) {
                handleCloseAvailablePackagesModal();
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
    }, [activeModal, isAvailablePackagesModalOpen]);

    const renderGeneralTab = () => {
        const ipAddresses = vm_ip.split(',');
        const secondIp = ipAddresses[1] ? ipAddresses[1].trim() : '';

        const handleCopyToClipboard = (text) => {
            navigator.clipboard.writeText(text).then(() => {
                console.log('Команда скопирована в буфер обмена! Теперь вы можете вставить её в терминал.');
            }).catch(err => {
                console.error('Ошибка при копировании: ', err);
            });
        };
        // console.log(userData)

        const handleAdmin = () => {
            if(userData.role === 'admin') {
                return userData.role
            } else {
                return userData.login
            }
        }
        
    
        return (
            <>
                <h3>General</h3>
                <div className="general-info">
                <Investment project_id={projectId} />
                    <p>IP: {secondIp}</p>
                    <p>CPU: {cpu}</p>
                    <p>RAM: {ram}</p>
                    <pre onClick={() => handleCopyToClipboard(`ssh ${handleAdmin()}@${secondIp}`)}>ssh {handleAdmin()}@{secondIp}</pre>
                </div>
                {userLogin === "i22s0626" && <PaymentButton />}
                <Link to="/console" className="navigate-button">Консоль</Link>
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
    };

    const handleOpenSshKeysTab = () => {
        setActiveModal('sshKeys'); 
    };

    const handleCloseSshKeysTab = () => {
        setActiveModal(null);
    };

    const handleClosePackageDetailModal = () => {
        setActiveModal(null);
        setSelectedPackage(false);
        setIsAvailablePackagesModalOpen(true);
    };

    const handleCloseAvailablePackagesModal = () => {
        setIsAvailablePackagesModalOpen(false);
        setActiveTab('languages');
    };

    const handleSshKeyApplied = () => {
        handleCloseSshKeysTab();
    };

    const handlePackageSelect = (pkg) => {
        setSelectedPackage(pkg);
        setActiveModal('packageDetail');
        setIsAvailablePackagesModalOpen(false);
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
                                vm_id={vm_id} 
                                packageData={selectedPackage} 
                                onClose={handleClosePackageDetailModal} 
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
                                        <PackagesTab 
                                            setPackages={setPackages}
                                            onPackageSelect={handlePackageSelect} 
                                            vm_id={vm_id} 
                                            projectId={projectId}
                                            setIsAvailablePackagesModalOpen={setIsAvailablePackagesModalOpen}
                                        /> : 
                                        renderGeneralTab()}
                            </>
                        )}
                    </div>
                </div>
            )}

            {isAvailablePackagesModalOpen && (
                <AvailablePackagesModal 
                    onClose={handleCloseAvailablePackagesModal} 
                    packages={packages}
                    onPackageSelect={handlePackageSelect}
                    vm_id={vm_id}
                />
            )}
        </div>
    );
};

export default SettingsButton;