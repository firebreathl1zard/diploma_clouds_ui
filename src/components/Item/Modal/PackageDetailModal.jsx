import React, { useEffect, useState } from 'react';

const PackageDetailModal = ({ packageData, onClose }) => {
    const [packageDetails, setPackageDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>&times;</span>
                <h2>{packageDetails.package}</h2>
                <ul>
                    {packageDetails.versions.map(version => (
                        <li key={version.id}>{`${packageDetails.package}:${version.version}`}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PackageDetailModal;