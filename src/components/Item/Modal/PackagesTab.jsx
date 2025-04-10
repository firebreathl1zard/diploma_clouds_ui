import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AvailablePackagesModal from './AvailablePackagesModal';

const PackagesTab = ({ onPackageSelect, vm_id, projectId, setIsAvailablePackagesModalOpen, setPackages }) => {
    const [attachedPackages, setAttachedPackages] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL; 

    useEffect(() => {
        const fetchAttachedPackages = async () => {
            try {
                const response = await fetch(`${apiUrl}/v1/project/${projectId}/vm/${vm_id}`, {
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
                setAttachedPackages(data.packages);
            } catch (error) {
                console.error('Ошибка при получении привязанных пакетов:', error);
            }
        };

        fetchAttachedPackages();
    }, [apiUrl, projectId, vm_id]);



    return (
        <>
            <h3>Привязанные пакеты:</h3>
            <ul>
                {attachedPackages.map(pkg => (
                    <li key={pkg.id}>
                        {pkg.package_name} <br /> {pkg.package_version}
                    </li>
                ))}
                <li 
                    onClick={() => setIsAvailablePackagesModalOpen(true)}
                    style={{ fontSize: '20px', textAlign: 'center', cursor: 'pointer' }}
                >
                    +
                </li>
            </ul>
        </>
    );
};

export default PackagesTab;