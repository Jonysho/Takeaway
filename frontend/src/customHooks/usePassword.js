import { useState } from "react";
import { changePasswordAPI } from "../api/userApi";

export const usePassword = (resetFields) => {
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const changePassword = async (id, token, details) => {   
        setIsLoading(true)
        setError(null)

        changePasswordAPI(id, token, details)
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