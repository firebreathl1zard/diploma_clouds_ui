import React, { useState } from "react";
import '../styles/AdminPages.css';
import FinancesTab from '../components/Admin/FinancesTab/finances'; 
import ManagmentTab from '../components/Admin/ManagmentTab/managment'; 

function AdminPages() {
    const [activeTab, setActiveTab] = useState("management");

    const renderContent = () => {
        switch (activeTab) {
            case "management":
                return <ManagmentTab/>;
            case "finance":
                return <FinancesTab />;;
            case "packages":
                return <div>Содержимое пакетов</div>;
            case "configuration":
                return <div>Содержимое конфигурации</div>;
            default:
                return <div>Выберите вкладку</div>;
        }
    };

    return (
        <div style={{ display: "flex" }}>
            <div className="sidebar">
                <ul style={{ display: "flex", flexDirection: "column"}}>
                    <li 
                        onClick={() => setActiveTab("management")} 
                        className={activeTab === "management" ? "active" : ""}
                    >
                        Управление
                    </li>
                    <li 
                        onClick={() => setActiveTab("finance")} 
                        className={activeTab === "finance" ? "active" : ""}
                    >
                        Финансы
                    </li>
                    <li 
                        onClick={() => setActiveTab("packages")} 
                        className={activeTab === "packages" ? "active" : ""}
                    >
                        Пакеты
                    </li>
                    <li 
                        onClick={() => setActiveTab("configuration")} 
                        className={activeTab === "configuration" ? "active" : ""}
                    >
                        Конфигурация
                    </li>
                </ul>
            </div>
            <div className="content">
                {renderContent()}
            </div>
        </div>
    );
}

export default AdminPages;