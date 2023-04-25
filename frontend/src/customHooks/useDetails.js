import axios from "axios"
import { useState } from "react"

export const useDetails = () => {
    const [userInfo, setUserInfo] = useState(null)

    const getDetails = (id, token) => {
        axios.get(`/api/user/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setUserInfo(response.data)
        })
        .catch(err => {
            console.log(err)
        }) 
    }

    return {userInfo, getDetails}
}