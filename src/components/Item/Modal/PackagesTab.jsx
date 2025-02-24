import React, { useEffect, useState } from 'react';

const PackagesTab = ({ onPackageSelect }) => {
    const [packages, setPackages] = useState([]);
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
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPackages(data.packages);
            } catch (error) {
                console.error('Error fetching packages:', error);
            }
        };

        fetchPackages();
    }, []);

    return (
        <>
            <h3>Пакеты</h3>
            <ul>
                {packages.map(pkg => (
                    <li key={pkg.package_id} title={pkg.package_name} onClick={() => onPackageSelect(pkg)}>
                        {pkg.package_name}
                    </li>
                ))}
            </ul>
        </>
    );
};

export default PackagesTab;