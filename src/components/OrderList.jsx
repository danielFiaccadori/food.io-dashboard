import { useState, useEffect } from "react";
import RestaurantService from "../api/RestaurantService";
import { DollarSign, ShoppingCart, Package } from "lucide-react";
import { Inbox, AlertCircle } from "lucide-react";
import Placeholder from "./Placeholders";
import loadingAnim from "../assets/loading.json"
import SmallValueChart from "./SmallValueChart";
import { Button } from "@headlessui/react";

function OrderList({ restaurantId }) {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        setLoading(true);

        try {
            const response = await RestaurantService.getOrders(restaurantId);
            setOrders(response.data.data.content || []);
            setError(false);
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const handleAccept = async (orderId) => {
        try {
            await RestaurantService.acceptOrder(restaurantId, orderId);
            fetchOrders();
        } catch (err) {
            console.error("Error when accepting order: ", err)
        }
    }

    const handleReject = async (orderId) => {
        try {
            await RestaurantService.rejectOrder(restaurantId, orderId);
            fetchOrders();
        } catch (err) {
            console.error("Error when rejecting order: ", err)
        }
    }

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);

            const mockData = [
                {
                    id: 1,
                    customerName: "João Silva",
                    createdAt: new Date().toISOString(),
                    orderStatus: "ENTREGUE",
                    products: [
                        {
                            product: { price: 25.0 },
                            quantity: 2,
                        },
                        {
                            product: { price: 10.0 },
                            quantity: 1,
                        },
                    ],
                },
                {
                    id: 2,
                    customerName: "Maria Souza",
                    createdAt: new Date().toISOString(),
                    orderStatus: "PENDENTE",
                    products: [
                        {
                            product: { price: 50.0 },
                            quantity: 1,
                        },
                    ],
                },
            ];

            await new Promise((resolve) => setTimeout(resolve, 1000));

            setOrders(mockData);
            setError(false);
            setLoading(false);

            // QUANDO A API ESTIVER PRONTA, descomente:
            /*
            try {
                const response = await RestaurantService.getOrders(restaurantId);
                setOrders(response.data.data.content || []);
                setError(false);
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
            */
        };

        fetchOrders();
    }, [restaurantId]);

    if (loading) {
        return (
            <div className="text-center text-white mt-20 opacity-60">
                <Placeholder animation={loadingAnim} title={"Carregando dashboard..."} />
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <SmallValueChart value={1250.0} title={"Total vendido hoje"} icon={DollarSign} />
                <SmallValueChart value={25} title={"Pedidos realizados"} icon={ShoppingCart} />
                <SmallValueChart value={1250.0} title={"Estoque disponível"} icon={Package} />
            </div>

            <div className="text-white text-base font-bold text-left mt-4 mb-2">
                <h1>Pedidos recentes</h1>
            </div>

            <div className="bg-[#2a2a31] rounded-xl text-white grid grid-cols-4 gap-x-10 px-6 py-3 mb-4 mt-4 font-semibold text-sm">
                <div>Nome do cliente</div>
                <div>Preço</div>
                <div>Horário</div>
                <div>Status</div>
            </div>

            {orders.length > 0 ? (
                orders.map((order) => (
                    <div
                        key={order.id}
                        className="bg-[#22222980] items-center rounded-xl text-white grid grid-cols-4 gap-x-10 px-6 py-4 mb-2 shadow"
                    >
                        <div>{order.customerName || "Cliente X"}</div>
                        <div>
                            R${" "}
                            {order.products
                                ?.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
                                .toFixed(2)}
                        </div>
                        <div>{new Date(order.createdAt).toLocaleTimeString()}</div>
                        <div>
                            {order.orderStatus === 'PENDENTE' ? (
                                <div>
                                    <Button onClick={handleAccept}
                                        className="rounded-xl bg-sky-600 px-2 py-2 text-sm text-white transition data-active:bg-sky-700 data-hover:bg-sky-500 mr-2">
                                        Accept
                                    </Button>
                                    <Button onClick={handleReject}
                                        className="rounded-xl bg-sky-600 px-3 py-2 text-sm text-white transition data-active:bg-sky-700 data-hover:bg-sky-500">
                                        Decline
                                    </Button>
                                </div>
                            ) : (
                                <div className="bg-[#366b36] rounded-xl ml-20 mr-20 pb-1 pt-1 text-[#1c1c21] font-medium">
                                    {order.orderStatus}
                                </div>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center text-white mt-20 flex flex-col items-center justify-center h-64 opacity-60">
                    <Inbox size={48} className="mb-4" />
                    <Placeholder />
                    <p className="text-lg font-medium">Ainda não há pedidos por aqui...</p>
                </div>
            )}
        </div>
    );
}

export default OrderList;
