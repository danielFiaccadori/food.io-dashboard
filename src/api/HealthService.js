import Api from "./Api";

const HealthService = {
    checkHealth: () => Api.get("/health-status"),
};

export default HealthService;