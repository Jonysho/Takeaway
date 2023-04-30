import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { useLogin } from "../../customHooks/useLogin";
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [visible, setVisible] = useState(false)
    const {login, googleLogin, error, isLoading, isResend, setError, setIsResend, resendEmail} = useLogin()
    
    const handleLogin = async (e) => {
        e.preventDefault()
        setError(null)
        setIsResend(false)
        await login(email, password)
    }

    const handleGoogleLogin = async (e) => {
        e.preventDefault()
        googleLogin()
    }

    const handleResend = async(e) => {
        e.preventDefault()
        resendEmail(email)
    }
    return ( 
        <div className="w-full h-full p-10">
        <div>
            <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl lg:mx-4 text-center text-green-600 drop-shadow-sm">Login</h1>
            <div className="pt-6 mx-4 sm:mx-12 lg:mx-18 text-center text-gray-700 font-bold">
                <label>Please enter your details to proceed</label>
            </div>
        </div>
        <div className="h-full max-w-xl mx-auto">
            <form className="mx-10 p-6">
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Email address:</label>
                    <input type="email" value={email} name="email" onChange={e => setEmail(e.target.value)} className="inputbox border-gray-400 focus:border-blue-700"/>
                </div>
                <div className="mb-2">
                    <label className="block text-gray-700 font-bold mb-2">Password:</label>
                    <div className="flex relative items-center">
                        <input type={!visible ? 'password' : 'text'} value={password} name="newPass" onChange={e => setPassword(e.target.value)} className='inputbox border-gray-400 focus:border-blue-700'/>
                        <label className="absolute right-4 cursor-pointer hover:text-blue-700" onClick={(e) => setVisible(!visible)}>{visible ? <AiFillEyeInvisible size={22}/> : <AiFillEye size={22}/>}</label>
                    </div>
                </div>
                <div className="mb-2">
                    <NavLink to="/forgotpassword">
                        <span className="text-blue-800 hover:text-blue-600">Forgot Password</span>
                    </NavLink>
                </div>
                <div className="mb-4">
                    <label htmlFor="error" className="text-red-600 font-bold pr-2">
                        {error} 
                    </label>
                    {isResend && <button className="text-gray-600 hover:text-gray-500 font-bold" onClick={e => handleResend(e)}>Click here to send again.</button>}
                </div>
                <button type="submit" disabled={isLoading} onClick={e => handleLogin(e)} className='submitBtn mb-6'>Login</button>
                <div className="flex justify-center mb-6">
                    <button 
                        className="bg-white text-gray-700 font-semibold py-2 px-4 border border-gray-400 rounded shadow hover:bg-gray-100 focus:outline-none focus:shadow-outline"
                        onClick={e => handleGoogleLogin(e)}
                        >
                        <span className="mx-auto flex items-center"> <FcGoogle className="mr-2" size={24}/> Sign in with Google</span>
                    </button>
                </div>
                <div className="block ml-2 xs:ml-0 xs:flex justify-center items-center">
                    <p className="xs:mx-1">Dont have an account? </p>
                    <NavLink to="/register"><p className="text-blue-800 hover:text-blue-600">Register Here</p></NavLink>
                </div>
            </form>
        </div>
        </div>
     );
}
 
export default Login;