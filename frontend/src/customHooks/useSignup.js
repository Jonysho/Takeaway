import axios from "axios"
import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const signup = async (firstname, lastname, email, password, phone) => {
        setIsLoading(true)
        setError(null)
        
        axios.post('/api/auth/register', {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            phone: phone,
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
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