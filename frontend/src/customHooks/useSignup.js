import axios from "axios"
import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (firstname, lastname, email, password, phone) => {
        setIsLoading(true)
        setError(null)
        
        axios.post('/api/user/register', {
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
            const json = response.data;
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))
            
            // update the auth context
            dispatch({type: 'LOGIN', payload: json})
            setIsLoading(false)
            
          })
          .catch(error => {
            console.log(error.response.data)
            setIsLoading(false)
            setError(error.response.data.error)
          });
    }

    return { signup, isLoading, error}
}