import Api from "./Api";

const RestaurantService = {
    getOrders: (restaurantUUID) =>
        Api.get(`api/v1/restaurants/${restaurantUUID}/orders`, {
            params: {
                page: 0,
                size: 5,
                sort: 'createdAt'
            }
        }),

    getProducts: () =>
        Api.get(`api/v1/restaurants/products`),

    addProduct: (data) =>
        Api.post(`api/v1/restaurants/products`),

    updateProduct: (id, data) =>
        Api.put(`api/v1/restaurants/products/${id}`),

    deleteProduct: (id) =>
        Api.delete(`api/v1/restaurants/products/${id}`),

    rejectOrder: (restaurantId, orderId) =>
        Api.put(`api/v1/restaurants/${restaurantId}/orders/reject`, null, {
            params: {
                orderId: {orderId}
            }
        }),

    acceptOrder: (restaurantId, orderId) =>
        Api.put(`api/v1/restaurants/${restaurantId}/orders/accept`, null, {
            params: {
                orderId: {orderId}
            }
        }),

}

export default RestaurantService;