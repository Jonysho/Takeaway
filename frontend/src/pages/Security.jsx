import { useEffect, useState } from "react";
import {AiFillEyeInvisible, AiFillEye}  from 'react-icons/ai'
import {VscCheck, VscChromeClose, VscChromeMinimize} from 'react-icons/vsc';

const Security = () => {
    const [currPass, setCurrPass] = useState('')
    const [newPass, setNewPass] = useState('')
    const [confPass, setConfPass] = useState('')
    const [error, setError] = useState('') // To be updated when validated in backend
    const [dash, setDash] = useState(true) // User sees dash rather than cross/tick before typing

    const [visible1, setVisibile1] = useState(false)
    const [visible2, setVisibile2] = useState(false)
    const [visible3, setVisibile3] = useState(false)

    // Fetch user's current password
    const password = 'abc123'

    const updateField = (e) => {
        const name = e.target.name
        setDash(false)
        switch(name) {
            case 'currPass':
                setCurrPass(e.target.value)
                break
            case 'newPass':
                setNewPass(e.target.value)
                break
            case 'confPass':
                setConfPass(e.target.value)
                break
            default:
                break
        }
    }

    const letterRegex = /[a-zA-Z]/;
    const digitRegex = /\d/;
    const specialReg = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

    const checkLength = () => {return newPass.length <= 30 && newPass.length >= 8}
    const checkLetterNum = () => {return letterRegex.test(newPass) && digitRegex.test(newPass)}
    const checkSymbol = () => {return specialReg.test(newPass)}
    const checkMatch = () => {return newPass === confPass}

    const updatePassword = (e) => {
        // Validate password entered (From backend)
        // Update user password to newPass
        console.log("Successfully updated password");
    }

    return ( 
        <div className="h-full bg-white shadow-md max-w-xl mx-auto">
            <div className="pt-6 mx-4 sm:mx-12 lg:mx-18 text-center text-gray-700 font-bold">
                <label>Please change your password so we can have you ordering pizza in no time.</label>
            </div>
            <form className="mx-auto p-6">
                <div className="mb-7">
                    <label className="block text-gray-700 font-bold mb-2">Current Password:</label>
                    <div className="flex relative items-center">
                        <input type={!visible1 ? 'password' : 'text'} value={currPass} name="currPass" onChange={e => updateField(e)} className={`inputbox ${error ? 'border border-red-700 focus:border-red-700' : 'border-gray-400 focus:border-blue-700'}`}/>
                        <label className="absolute right-4" onClick={(e) => setVisibile1(!visible1)}>{visible1 ? <AiFillEyeInvisible size={20}/> : <AiFillEye size={20}/>}</label>
                        <label className="absolute bottom-[-1.7rem] text-red-700 font-bold">{error}</label>
                    </div>
                </div>
                <div className="my-4">
                    <label className="block text-gray-700 font-bold mb-2">New Password:</label>
                    <div className="flex relative items-center">
                        <input type={!visible2 ? 'password' : 'text'} value={newPass} name="newPass" onChange={e => updateField(e)} className='inputbox border-gray-400 focus:border-blue-700'/>
                        <label className="absolute right-4" onClick={(e) => setVisibile2(!visible2)}>{visible2 ? <AiFillEyeInvisible size={20}/> : <AiFillEye size={20}/>}</label>
                    </div>
                </div>
                <div className="my-4">
                    <label className="block text-gray-700 font-bold mb-2">Confirm Password:</label>
                    <div className="flex relative items-center">
                        <input type={!visible3 ? 'password' : 'text'} value={confPass} name="confPass" onChange={e => updateField(e)} className='inputbox border-gray-400 focus:border-blue-700'/>
                        <label className="absolute right-4" onClick={(e) => setVisibile3(!visible3)}>{visible3 ? <AiFillEyeInvisible size={20}/> : <AiFillEye size={20}/>}</label>
                    </div>
                </div>
                <ul>
                    <li className="flex items-center mb-2">
                        <div className="p-2">{dash ? <VscChromeMinimize className="text-gray-700" size={20}/> : checkLength() ? <VscCheck className="text-green-600" size={20}/> : <VscChromeClose className="text-red-600" size={20}/>}</div>
                        <span className="block text-gray-700 font-bold">Bewteen 8-30 characters</span>
                    </li>
                    <li className="flex items-center mb-2">
                    <div className="p-2">{dash ? <VscChromeMinimize className="text-gray-700" size={20}/> : checkLength() ? <VscCheck className="text-green-600" size={20}/> : <VscChromeClose className="text-red-600" size={20}/>}</div>

                        <span className="block text-gray-700 font-bold">A letter & number</span>
                    </li> 
                    <li className="flex items-center mb-2">
                    <div className="p-2">{dash ? <VscChromeMinimize className="text-gray-700" size={20}/> : checkLength() ? <VscCheck className="text-green-600" size={20}/> : <VscChromeClose className="text-red-600" size={20}/>}</div>

                        <span className="block text-gray-700 font-bold"> A special character</span>
                    </li>
                    <li className="flex items-center mb-2">
                    <div className="p-2">{dash ? <VscChromeMinimize className="text-gray-700" size={20}/> : checkLength() ? <VscCheck className="text-green-600" size={20}/> : <VscChromeClose className="text-red-600" size={20}/>}</div>
                        <span className="block text-gray-700 font-bold"> Passwords need to match</span>
                    </li>
                </ul>
                <button type="submit" onClick={e => updatePassword(e)} className="submitBtn mt-1">Submit</button>
            </form>
        </div>
     );
}
 
export default Security;