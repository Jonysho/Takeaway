import { useState } from "react"
import { signupAPI } from "../api/authApi"

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const signup = async (firstname, lastname, email, password, phone) => {
        setIsLoading(true)
        setError(null)
        
        signupAPI(firstname, lastname, email, password, phone)
          .then(response => {
            console.log(response)
            setMessage(response.data.message)
          })
          .catch(error => {
            console.log(error.response.data)
            setIsLoading(false)
            setError(error.response.data.error)
          });
    }

    return { signup, isLoading, error, message, setMessage}
}