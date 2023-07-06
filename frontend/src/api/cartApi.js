import axios from "axios";

const getCartApi = (id, token) => {
    return axios.get(`/api/cart/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
};

const addToCartApi = (id, itemId, size, token) => {
    return axios.post('/api/cart/add', {
        id, itemId, size
        },
        { headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

const removeFromCartApi = (id, itemId, size, token) => {
    return axios.patch('/api/cart/remove', {
        id, itemId, size
        },
        { headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

const clearCartApi = (userId, token) => {
    return axios.patch('/api/cart/clear', {id: userId}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

const saveFavouriteApi = (userId, token, favName) => {
    return axios.post('/api/cart/favourite/add', {userId, favName}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

const loadFavouriteApi = (userId, favCartId, token) => {
    return axios.patch('/api/cart/favourite/load', {userId, favCartId}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

const checkoutAPI = (userId, token) => {
    return axios.post("/api/checkout/create-checkout-session", {userId}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}
export { getCartApi, addToCartApi, clearCartApi, removeFromCartApi, saveFavouriteApi, loadFavouriteApi, checkoutAPI }