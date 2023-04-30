import { useState } from "react"
import { getDetailsAPI } from "../api/userApi"

export const useDetails = () => {
    const [userInfo, setUserInfo] = useState(null)

    const getDetails = (id, token) => {
        getDetailsAPI(id, token)
        .then(response => {
            setUserInfo(response.data)
        })
        .catch(err => {
            console.log(err)
        }) 
    }

    return {userInfo, getDetails}
}