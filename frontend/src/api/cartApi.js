import axios from "axios";

const getCartApi = (id, token) => {
    return axios.get(`/api/cart/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
};

const addToCartApi = (id, itemId, portions, token) => {
    return axios.get('/api/cart/add', {
        id, itemId, portions
        },
        { headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

const clearCart = (id, token) => {
    return axios.get('/api/cart/add', {id}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export { getCartApi, addToCartApi, clearCart }