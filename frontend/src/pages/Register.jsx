import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import PasswordCheck from "../components/PasswordCheck";
import { useSignup } from "../customHooks/useSignup";

const Register = () => {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const {signup, error, isLoading, message, setMessage} = useSignup()

    const [visible, setVisible] = useState('')
    const [dash, setDash] = useState(true) // User sees dash rather than cross/tick before typing

    const letterRegex = /[a-zA-Z]/;
    const digitRegex = /\d/;
    const specialReg = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

    const checkLength = () => {return password.length <= 30 && password.length >= 8}
    const checkLetterNum = () => {return letterRegex.test(password) && digitRegex.test(password)}
    const checkSymbol = () => {return specialReg.test(password)}

    const handleRegister = async (e) => {
        e.preventDefault()

        await signup(firstname, lastname, email, password, phone)
    }

    return ( 
        <div className="w-full h-full p-10">
        <div className="mb-4">
            <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl lg:mx-4 text-center text-green-600 drop-shadow-sm">Register</h1>
        </div>
        <div className="h-full max-w-xl mx-auto">
            <form method="POST" className="mx-4 p-6">
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">First Name:</label>
                    <input type="text" value={firstname} name="firstname" onChange={e => setFirstname(e.target.value)} className="inputbox border-gray-400 focus:border-blue-700"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Last Name:</label>
                    <input type="text" value={lastname} name="lastname" onChange={e => setLastname(e.target.value)} className="inputbox border-gray-400 focus:border-blue-700"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Email address:</label>
                    <input type="email" value={email} name="email" onChange={e => setEmail(e.target.value)} className="inputbox border-gray-400 focus:border-blue-700"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Contact Number:</label>
                    <input type="number" value={phone} name="phone" onChange={e => setPhone(e.target.value)} className="inputbox border-gray-400 focus:border-blue-700"/>
                </div>
                <div className="mb-2">
                    <label className="block text-gray-700 font-bold mb-2">Password:</label>
                    <div className="flex relative items-center">
                        <input type={!visible ? 'password' : 'text'} value={password} name="password" onChange={e => {setPassword(e.target.value); setDash(false)}} className='inputbox border-gray-400 focus:border-blue-700'/>
                        <label className="absolute right-4 cursor-pointer hover:text-blue-700" onClick={(e) => setVisible(!visible)}>{visible ? <AiFillEyeInvisible size={22}/> : <AiFillEye size={22}/>}</label>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="error" className="text-red-600 font-bold">{error}</label>
                    <label htmlFor="error" className="text-green-600 font-bold">{message}</label>
                </div>
                <PasswordCheck checkLength={checkLength} checkLetterNum={checkLetterNum} checkSymbol={checkSymbol} dash={dash} />
                <button type="submit" disabled={isLoading} onClick={e => handleRegister(e)} className='submitBtn mb-6'>Register</button>
                <div className="block ml-2 xs:ml-0 xs:flex justify-center items-center">
                    <p className="xs:mx-1">Already have an account? </p>
                    <NavLink to="/login"><p className="text-blue-800 hover:text-blue-600">Login here</p></NavLink>
                </div>
            </form>
        </div>
        </div>
     );
}
 
export default Register;