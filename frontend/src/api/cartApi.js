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

const clearCartApi = (id, token) => {
    return axios.patch('/api/cart/add', {id}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export { getCartApi, addToCartApi, clearCartApi, removeFromCartApi }