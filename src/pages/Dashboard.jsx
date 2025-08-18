import { useEffect, useState } from "react";
import OrderList from "../components/OrderList";
import RestaurantService from "../api/RestaurantService";
import { motion } from "framer-motion";

function Dashboard() {
    const [greetings, setGreetings] = useState("");
    const [restaurantId, setRestaurantId] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchName = async () => {
            try {
                const response = await RestaurantService.getSelfDetails();
                const name = response.data.data.name;
                const uuid = response.data.data.uuid;
                const isOpen = response.data.data.isOpen;

                setGreetings(`Seja bem-vindo ao dashboard, ${name}!`);
                setRestaurantId(uuid);
                setIsOpen(isOpen);
            } catch (err) {
                setGreetings("Seja bem-vindo ao dashboard!");
            }
        };

        fetchName();
    }, []);

    return (
        <div className="flex h-screen">
            <main className="flex-1 overflow-y-auto p-10 bg-[#101014]">
                <div>
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="p-4"
                    >
                        <div className="flex items-center gap-3">
                            <h1 className="text-white text-3xl font-medium">
                                {greetings}
                            </h1>

                            <span
                                className={[
                                    "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1",
                                    isOpen
                                        ? "bg-emerald-500/10 text-emerald-300 ring-emerald-400/30"
                                        : "bg-rose-500/10 text-rose-300 ring-rose-400/30",
                                ].join(" ")}
                                aria-label={isOpen ? "Restaurante aberto" : "Restaurante fechado"}
                            >
                                <span
                                    className={[
                                        "h-2 w-2 rounded-full",
                                        isOpen ? "bg-emerald-400" : "bg-rose-400",
                                    ].join(" ")}
                                />
                                {isOpen ? "Aberto" : "Fechado"}
                            </span>
                        </div>
                    </motion.div>

                    {restaurantId && <OrderList restaurantId={restaurantId} />}
                </div>
            </main>
        </div>
    );
}

export default Dashboard;