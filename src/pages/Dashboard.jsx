import React from "react";
import Sidebar from "../components/Sidebar";

function Dashboard() {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-4 bg-[#101014]">
                <h1>Teste</h1>
            </main>
        </div>
    );
}

export default Dashboard;