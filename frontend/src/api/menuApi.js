import axios from "axios";

const getAllMenuItemsApi = () => {
    return axios.get("/api/menu");
};

const getMenuItemApi = (id, token) => {
    return axios.get(`/api/menu/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
};

const getMenuPdfApi = () => {
    return axios.get("/api/menu/pdf");
}

const addMenuItemApi = (data, imageFile, token) => {
    const formData = new FormData();
    formData.append('formData', JSON.stringify(data))
    formData.append('image', imageFile);
    return axios.post('/api/menu/add', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });
}

const updateMenuItemApi = (id, data, token) => {
    return axios.patch(`/api/menu/update/${id}`, data, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
})
}

const deleteMenuItemApi = (id, token) => {
    return axios.delete(`/api/menu/delete/${id}`, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
})
}

export { getAllMenuItemsApi, getMenuItemApi, getMenuPdfApi, addMenuItemApi, updateMenuItemApi, deleteMenuItemApi }