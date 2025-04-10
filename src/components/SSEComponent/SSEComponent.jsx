import React, { useState } from 'react';

const SSEComponent = () => {
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('https://api.firebreathlizard.space:444/api/v1/test');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let done = false;

            while (!done) {
                const { done: streamDone, value } = await reader.read();
                done = streamDone;

                if (value) {
                    const chunk = decoder.decode(value, { stream: true });
                    chunk.split('\n').forEach(line => {
                        if (line.startsWith('data: ')) {
                            const jsonData = line.substring(6);
                            const parsedData = JSON.parse(jsonData);
                            console.log(parsedData);
                            setStatus(parsedData.status);
                        }
                    });
                }
            }
        } catch (err) {
            console.error('Fetch error:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={fetchData} disabled={loading}>
                {loading ? 'Loading...' : 'Fetch Data'}
            </button>
            {error && <p>Error: {error}</p>}
            {status && <p>Status: {status}</p>}
        </div>
    );
};

export default SSEComponent;