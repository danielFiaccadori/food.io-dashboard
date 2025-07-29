import Api from "./api";

const RestaurantService = {
    getOrders: (restaurantUUID) =>
        Api.get(`api/v1/restaurants/${restaurantUUID}/orders`),

    getProducts: () =>
        Api.get(`api/v1/restaurants/products`),

    addProduct: (data) =>
        Api.post(`api/v1/restaurants/products`),

    updateProduct: (id, data) =>
        Api.put(`api/v1/restaurants/products/${id}`),

    deleteProduct: (id) =>
        Api.delete(`api/v1/restaurants/products/${id}`)

}

export default RestaurantService;