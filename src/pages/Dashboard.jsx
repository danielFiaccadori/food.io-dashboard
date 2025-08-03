import OrderList from "../components/OrderList";

function Dashboard() {
    return (
        <div className="flex h-screen">
            <main className="flex-1 overflow-y-auto p-10 bg-[#101014]">
                <div>
                    <div className="text-white text-3xl font-medium text-left p-4">
                        <h1>Bem-vindo ao dashboard, Sakura Sushis!</h1>
                    </div>
                    <OrderList />
                </div>
            </main>
        </div>
    );
}

export default Dashboard;