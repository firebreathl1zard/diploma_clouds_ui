import React, { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import yaml from 'js-yaml';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/yaml/yaml';

function PackagesTab() {
    const [yamlContent, setYamlContent] = useState('');
    const [error, setError] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                setYamlContent(content);
                validateYaml(content);
                setError(null);
            };
            reader.readAsText(file);
        }
    };

    const handleYamlChange = (editor, data, value) => {
        setYamlContent(value);
        validateYaml(value);
    };

    const validateYaml = (value) => {
        try {
            yaml.load(value);
            setError(null);
        } catch (e) {
            console.error(e);
            setError(e.message);
        }
    };

    const handleSaveFile = () => {
        const blob = new Blob([yamlContent], { type: 'text/yaml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'packages.yaml';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div>
            <h2>Пакеты</h2>
            <input type="file" accept=".yml,.yaml" onChange={handleFileChange} />
            <div style={{ marginTop: '20px' }}>
                <CodeMirror
                    value={yamlContent}
                    options={{
                        mode: 'yaml',
                        lineNumbers: true,
                        theme: 'default',
                    }}
                    onBeforeChange={handleYamlChange}
                />
            </div>
            {error && <div style={{ color: 'red' }}>Ошибка: {error}</div>}
            <button onClick={handleSaveFile} style={{ marginTop: '20px' }}>
                Сохранить файл
            </button>
        </div>
    );
}

export default PackagesTab;
