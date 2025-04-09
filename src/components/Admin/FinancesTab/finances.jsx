import React from "react";
import vmData from "../../../consts/vms";
import moneyImage from '../../../images/material-symbols_warning-outline-rounded(1).svg';

const getBorderColor = (status) => {
    switch (status) {
        case 'running':
            return '#25C230';
        case 'stopped':
            return '#7C7A8C';
        default:
            return 'yellow';
    }
};

function FinancesTab() {
    const sortedVmData = vmData.sort((a, b) => {
        const aNeeded = a.money_ask && a.money_ask.length > 0 && a.money_ask[0].needed === "true";
        const bNeeded = b.money_ask && b.money_ask.length > 0 && b.money_ask[0].needed === "true";
        return (aNeeded === bNeeded) ? 0 : aNeeded ? -1 : 1;
    });

    return (
        <>
            <h3>Virtual Machines Management</h3>
            <div style={{ display: 'flex', flexDirection: 'row', flex: "none", marginTop: '20px' }}>
                <ul style={{ display: 'flex', flexDirection: 'column', flex: "none", width: '900px' }}>
                    {sortedVmData.length > 0 ? (
                        sortedVmData.map((project) => (
                            project.vminfo && project.vminfo.length > 0 ? (
                                project.vminfo.map((vm) => {
                                    const ipAddresses = vm.vm_ip_address;
                                    const second_ip = ipAddresses.split(",")[1];
                                    const isNeeded = project.money_ask && project.money_ask.length > 0 && project.money_ask[0].needed === "true";

                                    return (
                                        <li key={vm.vm_id} id={project.project_id} style={{
                                            width: '100%',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            gap: '10px',
                                            border: `2px solid ${getBorderColor(vm.status)}`,
                                        }}>
                                            <div style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
                                                <p>VM Name: {vm.vm_name}</p>
                                                <p>Purpose: {vm.vm_purpose}</p>
                                                <p>Status: {vm.status}</p>
                                                <p>Project ID: {project.project_id}</p>
                                                <p>CPU: {vm.configuration[0].cpu}</p>
                                                <p>RAM: {vm.configuration[0].ram} GB</p>
                                                <p>IP Address: {second_ip}</p>
                                                {isNeeded && (
                                                    <div style={{ display: 'flex', justifyContent: 'right', marginLeft: '4px', width: '100%' }}>
                                                        <img src={moneyImage} alt="Money needed" title={`Запрос на ${project.money_ask[0].amount} валюты`} style={{ width: '20px', height: '20px' }} />
                                                    </div>
                                                )}
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
                <div style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column', marginTop: '4px'}}>
                    {sortedVmData.map((project) => (
                        project.vminfo && project.vminfo.length > 0 ? (
                            project.vminfo.map((vm) => {
                                const isNeeded = project.money_ask && project.money_ask.length > 0 && project.money_ask[0].needed === "true";
                                return isNeeded ? (
                                    <div key={vm.vm_id} style={{ marginBottom: '10px', display: 'flex', flexDirection: 'row', gap: '10px' }}>
                                        <div style={{
                                            borderRadius: '4px',
                                            padding: '10px',
                                            width: '50px',
                                            border: `2px solid ${getBorderColor(vm.status)}`,
                                        }}>
                                            <p>{project.money_ask[0].amount}</p>
                                        </div>
                                        <div
                                         style={{
                                            borderRadius: '4px',
                                            width: '50px',
                                            border: `2px solid ${getBorderColor(vm.status)}`,
                                        }}>
                                            <input style={{width: '46px', height: '100%', border: 'none', backgroundColor: 'rgba(41, 39, 57, 1)', color: 'white'}} placeholder="Сумма пополнения"></input>
                                        </div>
                                    </div>
                                ) : null;
                            })
                        ) : null
                    ))}
                </div>
            </div>
        </>
    );
}

export default FinancesTab;