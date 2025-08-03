import { Icon } from "lucide-react";

function SmallValueChart({ title, value, icon: Icon }) {
    return (
        <div className="p-4 bg-[#22222980] rounded-xl text-white flex items-center text-left gap-4 shadow-lg">
            <div className="bg-[#22222980] p-3 rounded-full">
                {Icon && <Icon size={20} />}
            </div>
            <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">{title}</p>
                <h2 className="text-lg font-medium">{value}</h2>
            </div>
        </div>
    );
}

export default SmallValueChart;

