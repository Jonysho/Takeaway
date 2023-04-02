import { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import PasswordCheck from "../components/PasswordCheck";

const Register = () => {
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [visible, setVisible] = useState('')
    const [error, setError] = useState('All fields are required.')
    const [dash, setDash] = useState(true) // User sees dash rather than cross/tick before typing

    const letterRegex = /[a-zA-Z]/;
    const digitRegex = /\d/;
    const specialReg = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

    const checkLength = () => {return password.length <= 30 && password.length >= 8}
    const checkLetterNum = () => {return letterRegex.test(password) && digitRegex.test(password)}
    const checkSymbol = () => {return specialReg.test(password)}

    const updateField = (e) => {
        const name = e.target.name
        switch(name) {
            case 'fname':
                setFname(e.target.value)
                break
            case 'lname':
                setLname(e.target.value)
                break
            case 'email':
                setEmail(e.target.value)
                break
            case 'phone':
                setPhone(e.target.value)
                break
            case 'password':
                setDash(false)
                setPassword(e.target.value)
            default:
                break
        }
    }

    const handleRegister = (e) => {
        // Post new User to DB
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
                    <input type="text" value={fname} name="fname" onChange={e => updateField(e)} className="inputbox border-gray-400 focus:border-blue-700"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Last Name:</label>
                    <input type="text" value={lname} name="lname" onChange={e => updateField(e)} className="inputbox border-gray-400 focus:border-blue-700"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Email address:</label>
                    <input type="email" value={email} name="email" onChange={e => updateField(e)} className="inputbox border-gray-400 focus:border-blue-700"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Contact Number:</label>
                    <input type="number" value={phone} name="phone" onChange={e => updateField(e)} className="inputbox border-gray-400 focus:border-blue-700"/>
                </div>
                <div className="mb-2">
                    <label className="block text-gray-700 font-bold mb-2">Password:</label>
                    <div className="flex relative items-center">
                        <input type={!visible ? 'password' : 'text'} value={password} name="password" onChange={e => updateField(e)} className='inputbox border-gray-400 focus:border-blue-700'/>
                        <label className="absolute right-4 cursor-pointer hover:text-blue-700" onClick={(e) => setVisible(!visible)}>{visible ? <AiFillEyeInvisible size={22}/> : <AiFillEye size={22}/>}</label>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="error" className="text-red-600 font-bold">{error}</label>
                </div>
                <PasswordCheck checkLength={checkLength} checkLetterNum={checkLetterNum} checkSymbol={checkSymbol} dash={dash} />
                <button type="submit" onClick={e => handleRegister(e)} className='submitBtn mb-6'>Register</button>
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