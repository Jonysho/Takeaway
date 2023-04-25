import { useGoogleLogin } from "@react-oauth/google"
import axios from "axios"
import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isResend, setIsResend] = useState(false)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const googleLogin = useGoogleLogin({
      onSuccess: async ({code}) => {
        axios.post('/api/auth/google', {  
          code,
        }).then(response => {
          const json = response.data;
          // save the user to local storage
          localStorage.setItem('user', JSON.stringify(json))
          
          // update the auth context
          dispatch({type: 'LOGIN', payload: json})
          setIsLoading(false)
          
        })
        .catch(error => {
          setIsLoading(false)
          setError(error.response.data.error)
        });
      },
      flow: 'auth-code',
    })

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)
        axios.post('/api/auth/login', {
            email: email,
            password: password,
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(response => {
            const json = response.data;
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))
            
            // update the auth context
            dispatch({type: 'LOGIN', payload: json})
            setIsLoading(false)
            
          })
          .catch(error => {
            setIsLoading(false)
            setError(error.response.data.error)
            if (error.response.data.button) setIsResend(true)
          });
        }

    const resendEmail = async (email) => {
      await axios.post("/api/user/resend-email", {email})
        .then( response => setError(response.data.error))
    }
  return { login, googleLogin, isLoading, error, isResend, setError, setIsResend, resendEmail}
}