import Api from "./Api";

const RestaurantService = {
    getSelfDetails: () => {
        return Api.get(`/api/v1/restaurants/self`);
    },

    getOrders: (page = 0) => {
        return Api.get(`/api/v1/restaurants/orders`, {
            params: {
                page,
                size: 5,
                sort: 'createdAt'
            }
        });
    },

    getFinancialStatistics: (initialDate, finalDate) => {
        return Api.get(`/api/v1/restaurants/financial/statistics`, {
            params: {
                startDate: initialDate,
                endDate: finalDate
            }
        });
    },

    getOrderStatistics: (initialDate, finalDate) => {
        return Api.get(`/api/v1/restaurants/orders/statistics`, {
            params: {
                startDate: initialDate,
                endDate: finalDate
            }
        });
    },

    getProduct: (productId) => {
        return Api.get(`/api/v1/restaurants/products`, productId);
    },

    getProducts: () => {
        return Api.get(`/api/v1/restaurants/products`);
    },

    searchProduct: (char) => {
        return Api.get(`/api/v1/restaurants/products/search`, {
            params: {
                name: char
            }
        });
    },

    addProduct: (data) => {
        return Api.post(`/api/v1/restaurants/products`, data);
    },

    updateProduct: (data) => {
        const id = typeof data === "object" ? data.id : data;
        const { id: _ignored, ...payload } = data;
        return Api.put(`/api/v1/restaurants/products/${id}`, payload);
    },


    deleteProduct: (id) => {
        return Api.delete(`/api/v1/restaurants/products/${id}`);
    },

    rejectOrder: (orderId) => {
        return Api.put(`/api/v1/restaurants/orders/reject`, null, {
            params: { orderId }
        });
    },

    acceptOrder: (orderId) => {
        return Api.put(`/api/v1/restaurants/orders/accept`, null, {
            params: { orderId }
        });
    }
};

export default RestaurantService;
