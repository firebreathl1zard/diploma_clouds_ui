import React, { useState, useEffect } from "react";
import DestroyButton from "../../Item/Vmdisplay/DestroyButton";
import ResetButton from "../../Item/Vmdisplay/ResetButton";
import RebootButton from "../../Item/Vmdisplay/RebootButton";
import ShutdownButton from "../../Item/Vmdisplay/ShutdownButton";
import StartButton from "../../Item/Vmdisplay/StartButton";
import StopButton from "../../Item/Vmdisplay/StopButton";

const getBorderColor = (status, isSelected) => {
    if (isSelected) return 'white';
    switch (status) {
        case 'running':
            return '#25C230';
        case 'stopped':
            return '#7C7A8C';
        default:
            return 'yellow';
    }
};
function ManagmentTab() {
    const [selectedProjects, setSelectedProjects] = useState(new Set());
    const [vmData, setVmData] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL; 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${apiUrl}/v1/vm/all`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                const data = await response.json();
                setVmData(data.data);
            } catch (error) {
                console.error("Ошибка при загрузке данных:", error);
            }
        };
        fetchData();
    }, []);

    const toggleSelectVm = (vmId, projectId) => {
        const newSelectedProjects = new Set(selectedProjects);
        if (newSelectedProjects.has(projectId)) {
            newSelectedProjects.delete(projectId);
        } else {
            newSelectedProjects.add(projectId);
        }
        setSelectedProjects(newSelectedProjects);
    };
    const selectAllProjects = () => {
        const allProjectIds = new Set(vmData.map(project => project.project_id));
        if (selectedProjects.size === allProjectIds.size) {
            setSelectedProjects(new Set());
        } else {
            setSelectedProjects(allProjectIds);
        }
    };

    const handleShowSelectedProjects = () => {
        console.log("Выбранные проекты:", Array.from(selectedProjects).join(", "));
    };
    return (
        <>
            <h3>Virtual Machines Management</h3>
            <button onClick={selectAllProjects} style={{ marginBottom: '20px' }}>
                {selectedProjects.size === vmData.length ? 'Снять выбор всех' : 'Выбрать все'}
            </button>
            <div style={{ display: 'flex', flexDirection: 'row', flex: "none", marginTop: '20px' }}>
                <ul style={{ display: 'flex', flexDirection: 'column', flex: "none", width: '900px' }}>
                    {vmData.length > 0 ? (
                        vmData.map((project) => (
                            project.vms && project.vms.length > 0 ? (
                                project.vms.map((vm) => {
                                    const ipAddresses = vm.vm_ip_address;
                                    const second_ip = ipAddresses.split(",")[1];
                                    const isSelected = selectedProjects.has(project.project_id);

                                    return (
                                        <li key={vm.vm_id} id={project.project_id} style={{
                                            width: '100%',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            gap: '10px',
                                            border: `2px solid ${getBorderColor(vm.status, isSelected)}`,
                                            alignItems: 'center', 
                                            padding: '10px',
                                            marginBottom: '10px'
                                        }}>
                                            <div style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
                                                <p>VM Name: {vm.vm_name}</p>
                                                <p>Purpose: {vm.vm_purpose}</p>
                                                <p>Status: {vm.status}</p>
                                                <p>Project ID: {project.project_id}</p>
                                                <p>CPU: {vm.configuration[0].cpu}</p>
                                                <p>RAM: {vm.configuration[0].ram} GB</p>
                                                <p>IP Address: {vm.vm_ip_address}</p>
                                            </div>
                                        </li>
                                    );
                                })
                            ) : (
                                <p key={project.project_id}>No virtual machines available for project ID: {project.project_id}</p>
                            )
                        ))
                    ) : (
                        <p>No projects available.</p>
                    )}
                </ul>
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px', marginTop: '4px' }}>
                    {vmData.map((project) => (
                        project.vms && project.vms.length > 0 ? (project.vms.map((vm) => {
                                const isSelected = selectedProjects.has(project.project_id);

                                return (
                                    <div key={vm.vm_id} style={{ display: 'flex', flexDirection: 'row', gap: '5px', marginBottom: '13px' }}>
                                        <div 
                                            onClick={() => toggleSelectVm(vm.vm_id, project.project_id)} 
                                            style={{
                                                cursor: 'pointer',
                                                width: '45px',
                                                height: '45px',
                                                border: `2px solid ${getBorderColor(vm.status, isSelected)}`,
                                                borderRadius: '4px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor: isSelected ? 'lightcoral' : 'transparent'
                                            }}>{isSelected ? '❌' : '✔️'}</div>
                                    </div>
                                );
                            })
                        ) : null))}
                </div>
            </div>
            <DestroyButton />
            <RebootButton />
            <ResetButton />
            <ShutdownButton />
            <StartButton />
            <StopButton />
            <button onClick={handleShowSelectedProjects} style={{ marginTop: '20px' }}>
                Показать выбранные проекты
            </button>
        </>
    );
}

export default ManagmentTab;