import { useState, useEffect } from "react";
import RestaurantService from "../api/RestaurantService";
import { motion } from "framer-motion";
import ProductList from "../components/ProductList";

function Products() {
    const [restaurantId, setRestaurantId] = useState(null);
    
        useEffect(() => {
            const fetchName = async () => {
                try {
                    const response = await RestaurantService.getSelfDetails();
                    const uuid = response.data.data.uuid;
    
                    setRestaurantId(uuid);
                } catch (err) {
                    console.log("Error at restaurant id fetch at Products::fetchName")
                }
            };
    
            fetchName();
        }, []);

    return (
        <div className="flex h-screen">
            <main className="flex-1 overflow-y-auto p-4 bg-[#101014]">
                <div>
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="text-white text-3xl font-medium text-left p-4">
                    </motion.div>
                    {restaurantId && <ProductList restaurantId={restaurantId} />}
                </div>
            </main>
        </div>
    );
}

export default Products;