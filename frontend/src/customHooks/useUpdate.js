import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "../customHooks/useAuthContext";

export const useUpdate = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

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
            const json = response.data
            // update the auth context
            dispatch({type: 'UPDATE', payload: json})
            setIsLoading(false)
        })
        .catch(error => {
            console.log(error.response.data)
            setIsLoading(false)
            setError(error.response.data.error)
        });
    }

    return { updateDetails, error, isLoading }
}