import { useState, useEffect } from "react";
import RestaurantService from "../api/RestaurantService";
import { DollarSign, ShoppingCart, Package } from "lucide-react";
import { Inbox, AlertCircle } from "lucide-react";
import Placeholder from "./Placeholders";
import loadingAnim from "../assets/loading.json"
import emptyAnim from "../assets/empty.json"
import SmallValueChart from "./SmallValueChart";
import { Button } from "@headlessui/react";
import { motion } from "framer-motion";

function OrderList({ restaurantId }) {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalSoldToday, setTotalSoldToday] = useState(0);
    const [totalOrdersToday, setTotalOrdersToday] = useState(0);

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(prev => prev + 1);
        }
    }

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const handleAccept = async (orderId) => {
        try {
            await RestaurantService.acceptOrder(orderId);
            fetchOrders();
        } catch (err) {
            console.error("Error when accepting order: ", err)
        }
    };

    const handleReject = async (orderId) => {
        try {
            await RestaurantService.rejectOrder(orderId);
            fetchOrders();
        } catch (err) {
            console.error("Error when rejecting order: ", err)
        }
    };

    useEffect(() => {
        const now = new Date();
        const startOfDay = new Date(now);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(now);
        endOfDay.setHours(23, 59, 59, 999);

        const fetchTotalOrdersToday = async () => {
            try {
                const response = await RestaurantService.getOrderStatistics(
                    startOfDay.toISOString(),
                    endOfDay.toISOString()
                );

                setTotalOrdersToday(response.data.data.totalOrders);
            } catch (err) {
                setTotalOrdersToday(999);
            }
        };

        const fetchTotalSoldToday = async () => {
            try {
                const response = await RestaurantService.getFinancialStatistics(
                    startOfDay.toISOString(),
                    endOfDay.toISOString()
                );

                setTotalSoldToday(response.data.data.count);
            } catch (err) {
                setTotalSoldToday(999);
            }
        };

        fetchTotalSoldToday();
        fetchTotalOrdersToday();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);

        try {
            const response = await RestaurantService.getOrders(currentPage);
            setOrders(response.data.data.content || []);
            setTotalPages(response.data.data.totalPages);
            setError(false);
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [restaurantId, currentPage]);

    if (loading) {
        return (
            <div className="text-center text-white mt-20 p-20">
                <Placeholder animation={loadingAnim} title={"Carregando os dados..."} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-white mt-20 flex flex-col items-center justify-center h-64 opacity-60">
                <AlertCircle size={48} className="mb-4" />
                <p className="text-lg font-medium">Não consegui me conectar ao servidor :(</p>
                <p className="text-sm font-light">O servidor está fora do ar. Nos contate se o erro persistir!</p>
            </div>
        );
    }

    return (
        <div className="p-4">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                <SmallValueChart value={totalSoldToday} title={"Total vendido hoje"} icon={DollarSign} />
                <SmallValueChart value={totalOrdersToday} title={"Pedidos realizados"} icon={ShoppingCart} />
                <SmallValueChart value={1250.0} title={"Estoque disponível"} icon={Package} />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}

                className="text-white text-base font-bold text-left mt-4 mb-2">
                <h1>Pedidos recentes</h1>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}

                className="bg-[#2a2a31] rounded-xl text-white grid grid-cols-5 gap-x-10 px-6 py-3 mb-4 mt-4 font-semibold text-sm">
                <div>Nome do cliente</div>
                <div>Id</div>
                <div>Preço</div>
                <div>Horário</div>
                <div>Status</div>
            </motion.div>

            {orders.length > 0 ? (
                orders.map((order) => {
                    const total = order.totalPrice;

                    return (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}

                            key={order.id}
                            className="bg-[#1e1e24] text-white font-mono rounded-xl grid grid-cols-5 gap-x-10 px-6 py-4 mb-2 shadow border border-dashed border-[#393946]"
                        >
                            <div className="text-sm flex flex-col">
                                <span className="font-bold">{order.customer.username || "Cliente X"}</span>
                            </div>

                            <div className="text-sm flex flex-col">
                                <span className="font-bold">#{order.id}</span>
                            </div>

                            <div className="text-sm flex items-center justify-center">R$ {total}</div>

                            <div className="text-sm flex items-center justify-center">
                                {new Date(order.createdAt).toLocaleTimeString()}
                            </div>

                            <div className="flex items-center justify-center">
                                {order.orderStatus === 'PENDING' ? (
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={() => handleAccept(order.id)}
                                            className="bg-green-600 hover:bg-green-800 text-xs text-white rounded-xl px-3 py-1 transition"
                                        >
                                            Aceitar
                                        </Button>
                                        <Button
                                            onClick={() => handleReject(order.id)}
                                            className="bg-red-600 hover:bg-red-800 text-xs text-white rounded-xl px-3 py-1 transition"
                                        >
                                            Rejeitar
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="bg-[#366b36] font-medium text-xs py-1 px-2 ml-10 mr-10 rounded-xl text-center w-full">
                                        {order.orderStatus}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    );
                })
            ) : (
                <div className="text-center text-white mt-20 flex flex-col items-center justify-center h-64 opacity-60">
                    <Placeholder animation={emptyAnim} height={200} width={200}/>
                    <p className="text-lg font-medium">Ainda não há pedidos por aqui...</p>
                </div>
            )}
        </div>
    );
}

export default OrderList;