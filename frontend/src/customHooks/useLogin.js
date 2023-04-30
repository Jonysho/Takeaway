import { useGoogleLogin } from "@react-oauth/google"
import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { googleLoginAPI, loginAPI } from "../api/authApi"
import { resendEmailAPI } from "../api/userApi"

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isResend, setIsResend] = useState(false)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const googleLogin = useGoogleLogin({
      onSuccess: async ({code}) => {
        googleLoginAPI(code).then(response => {
            const json = response.data;
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
        loginAPI(email, password)
          .then(response => {
            const json = response.data;

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
      await resendEmailAPI(email)
        .then( response => setError(response.data.error))
    }
  return { login, googleLogin, isLoading, error, isResend, setError, setIsResend, resendEmail}
}