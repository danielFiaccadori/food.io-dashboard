import { NavLink } from "react-router-dom";
import logo from "../assets/logo_title.png"
import { LayoutDashboard, ShoppingCart, Package, Wallet, Activity } from "lucide-react";

function Sidebar() {
    const linkClasses = ({ isActive }) =>
        `flex items-center text-sm block px-3 mb-2 mt-2 py-3 ${isActive ? "bg-[#F37359] rounded-lg font-medium" : ""
        }`;

    return (
        <div className="w-1/6 bg-[#0c0c0f] text-white p-4 h-full text-left">
            <div className="h-1/2">
                <img
                    className="w-1/3 mb-4"
                    src={logo} />
                <NavLink to="/dashboard/home" className={linkClasses}><LayoutDashboard className="mr-2" size={20} />Resumo</NavLink>
                <NavLink to="/dashboard/orders" className={linkClasses}><ShoppingCart className="mr-2" size={20} />Pedidos</NavLink>
                <NavLink to="/dashboard/products" className={linkClasses}><Package className="mr-2" size={20} />Produtos</NavLink>
                <NavLink to="/finance" className={linkClasses}><Wallet className="mr-2" size={20} />Resumo Financeiro</NavLink>
            </div>

            <div className="flex items-end h-1/2">
                <div className="flex items-center block">
                    <Activity className="ml-2" size={15} />
                    <h1 className="px-3 py-3 text-xs">Sistema em funcionamento</h1>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;