import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
                <Topbar />
                <main className="flex-1 overflow-y-auto bg-[#101014] pt-16 px-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default DashboardLayout;
