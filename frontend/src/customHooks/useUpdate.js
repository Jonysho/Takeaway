import { useState } from "react";
import { updateDetailsAPI } from "../api/userApi";

export const useUpdate = () => {
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const updateDetails = async (id, token, details) => {       
        setIsLoading(true)
        setError(null)

        updateDetailsAPI(id, token, details)
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