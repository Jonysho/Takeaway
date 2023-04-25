import axios from "axios";
import { useState } from "react";

export const usePassword = (resetFields) => {
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const changePassword = async (id, token, details) => {   
        setIsLoading(true)
        setError(null)

        axios.patch(`/api/user/change-password/${id}`, {
            ...details, id
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            const json = response.data
            setIsLoading(false)
            resetFields()
            setMessage(json.message)
        })
        .catch(error => {
            setError(error.response.data.error)
            setIsLoading(false)
        });
    }

    return {changePassword, error, message, isLoading, setError, setMessage}
}