import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-4 bg-[#101014]">
                <Outlet />
            </main>
        </div>
    )
}

export default DashboardLayout;