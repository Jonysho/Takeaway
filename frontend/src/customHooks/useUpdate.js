import axios from "axios";
import { useState } from "react";

export const useUpdate = () => {
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const updateDetails = async (id, token, details) => {       
        setIsLoading(true)
        setError(null)

        axios.patch(`/api/user/update-details/${id}`, {
            ...details, id
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setMessage(response.data.message)
            setIsLoading(false)
        })
        .catch(error => {
            setIsLoading(false)
            setError(error.response.data.error)
        });
    }

    return { updateDetails, message, setMessage, error, setError, isLoading }
}