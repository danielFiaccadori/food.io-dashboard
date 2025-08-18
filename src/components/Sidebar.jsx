import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo_title.png"
import { ShoppingCart, Package, Wallet, Activity, House, ForkKnife } from "lucide-react";
import HealthService from "../api/HealthService";

function Sidebar() {
    const [apiStatus, setApiStatus] = useState("Verificando sistema...");

    useEffect(() => {
        const checkAPI = async () => {
            try {
                await HealthService.checkHealth();
                setApiStatus("Sistema em funcionamento")
            } catch (error) {
                setApiStatus("Sistema indisponível")
            }
        };

        checkAPI();

        const interval = setInterval(checkAPI, 30000);
        return () => clearInterval(interval);
    }, []);

    const linkClasses = ({ isActive }) =>
        `flex items-center rounded-lg transition text-sm block px-3 mb-2 mt-2 py-3 
   ${isActive ? "bg-[#F37359] font-medium" : "hover:bg-[#19191f]"}`;

    return (
        <div className="w-64 bg-[#0c0c0f] text-white p-4 h-full text-left">
            <div className="h-1/2">
                <img
                    className="w-1/3 mb-4"
                    src={logo} />
                <NavLink to="/dashboard/home" className={linkClasses}><House className="mr-2" size={20} />Home</NavLink>
                <NavLink to="/dashboard/restaurant" className={linkClasses}><ForkKnife className="mr-2" size={20} />Restaurante</NavLink>
                <NavLink to="/dashboard/products" className={linkClasses}><Package className="mr-2" size={20} />Produtos</NavLink>
                <NavLink to="/dashboard/finance" className={linkClasses}><Wallet className="mr-2" size={20} />Resumo Financeiro</NavLink>
            </div>

            <div className="flex items-end h-1/2">
                <div className="flex items-center block">
                    <Activity className="ml-2" size={15} />
                    <h1 className="px-3 py-3 text-xs">{apiStatus}</h1>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;