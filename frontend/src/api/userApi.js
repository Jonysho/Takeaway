import axios from "axios"

const getDetailsAPI = (id, token) => {
    return axios.get(`/api/user/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

const resendEmailAPI = (email) => {
    return axios.post("/api/user/resend-email", {email})
}

const changePasswordAPI = (id, token, details) => {
    return axios.patch(`/api/user/change-password/${id}`, {
        ...details, id
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

const updateDetailsAPI = (id, token, details) => {
    return axios.patch(`/api/user/update-details/${id}`, {
        ...details, id
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export { getDetailsAPI, resendEmailAPI, changePasswordAPI, updateDetailsAPI }