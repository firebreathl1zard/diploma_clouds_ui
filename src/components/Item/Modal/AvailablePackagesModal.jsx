import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const AvailablePackagesModal = ({ onClose, packages, onPackageSelect, vm_id }) => {
    const [availablePackages, setAvailablePackages] = useState([]);
    const selectedPackage = useSelector((state) => state.selectedPackage);
    const apiUrl = process.env.REACT_APP_API_URL; 

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await fetch(`${apiUrl}/v1/package/all`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Сетевая ошибка');
                }
                const data = await response.json();
                setAvailablePackages(data.packages);
            } catch (error) {
                console.error('Ошибка при получении пакетов:', error);
            }
        };

        fetchPackages();
    }, [apiUrl]);

    const handleSubmit = async () => {
        const packagesToInstall = selectedPackage.package_ids.map((package_id, index) => ({
            package_id,
            package_version_id: selectedPackage.packageIds[index],
        }));

        const requestBody = {
            vm_id: String(vm_id),
            packages: packagesToInstall,
        };

        try {
            const response = await fetch(`${apiUrl}/v1/package/install`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error('Сетевая ошибка');
            }

            const result = await response.json();
            console.log('Успешно установлено:', result);
            onClose();
        } catch (error) {
            console.error('Ошибка при установке пакетов:', error);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            onClose();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const isAnyVersionSelected = selectedPackage.packageIds.length > 0;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>&times;</span>
                <h2>Доступные пакеты</h2>
                <ul>
                    {availablePackages.map(pkg => (
                        <li key={pkg.package_id} onClick={() => onPackageSelect(pkg)}>
                            {pkg.package_name}<br/>
                            {selectedPackage.package_ids.includes(pkg.package_id) && (
                                <div>
                                    {selectedPackage.versions[selectedPackage.package_ids.indexOf(pkg.package_id)]}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
                {isAnyVersionSelected && (
                    <button onClick={handleSubmit}>
                        Отправить
                    </button>
                )}
            </div>
        </div>
    );
};

export default AvailablePackagesModal;