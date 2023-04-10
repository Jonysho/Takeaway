import { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { useLogin } from "../customHooks/useLogin";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [visible, setVisible] = useState(false)
    const {login, error, isLoading} = useLogin()
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }

    return ( 
        <div className="w-full h-full p-10">
        <div className="mb-6">
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
                    <label htmlFor="error" className="text-red-600 font-bold">{error}</label>
                </div>
                <button type="submit" disabled={isLoading} onClick={e => handleSubmit(e)} className='submitBtn mb-6'>Login</button>
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