import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedPackage } from './selectedPackageSlice';

const PackageDetailModal = ({ packageData, onClose, vm_id }) => {
    const dispatch = useDispatch();
    const [packageDetails, setPackageDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedVersion, setSelectedVersion] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL; 

    useEffect(() => {
        const fetchPackageDetails = async () => {
            try {
                const response = await fetch(`${apiUrl}/v1/package/selected?package_id=${packageData.package_id}`, {
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
                setPackageDetails(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPackageDetails();

        const intervalId = setInterval(fetchPackageDetails, 1000);

        return () => clearInterval(intervalId);
    }, [packageData.package_id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleVersionClick = (version) => {
        setSelectedVersion(version);
        handleButtonClick(version);
    };

    const handleButtonClick = (version) => {
        if (version) {
            console.log(`Selected ID: ${version.id}, Version: ${version.version}`);
            dispatch(setSelectedPackage({ 
                packageId: version.id,
                package_id: packageData.package_id, 
                version: version.version
            }));
            onClose();
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>X</span>
                <h2>{packageDetails.package}</h2>
                <ul>
                    {packageDetails.versions.map(version => (
                        <li 
                            id={`version-${version.id}`} 
                            onClick={() => handleVersionClick(version)}
                            key={version.id}
                        >
                            {`${packageDetails.package}:${version.version}`}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PackageDetailModal;