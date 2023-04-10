import { useState } from "react";
import {AiFillEyeInvisible, AiFillEye}  from 'react-icons/ai'
import {VscCheck, VscChromeClose, VscChromeMinimize} from 'react-icons/vsc';
import PasswordCheck from "../components/PasswordCheck";
import { useAuthContext } from "../customHooks/useAuthContext";
import { usePassword } from "../customHooks/usePassword"; 

const Security = () => {
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [dash, setDash] = useState(true) // User sees dash rather than cross/tick before typing
    const [visible1, setVisible1] = useState(false)
    const [visible2, setVisible2] = useState(false)
    const [visible3, setVisible3] = useState(false)

    const resetFields = () => {
        setPassword('')
        setNewPassword('')
        setConfirmPassword('')
        setDash(true)
        setVisible1(false)
        setVisible2(false)
        setVisible3(false)
    }

    const { changePassword, error, message, isLoading, setError, setMessage } = usePassword(resetFields)
    const {user} = useAuthContext()
    
    // Validation variables & functions
    const letterRegex = /[a-zA-Z]/;
    const digitRegex = /\d/;
    const specialReg = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

    const checkLength = () => {return newPassword.length <= 30 && newPassword.length >= 8}
    const checkLetterNum = () => {return letterRegex.test(newPassword) && digitRegex.test(newPassword)}
    const checkSymbol = () => {return specialReg.test(newPassword)}
    const checkMatch = () => {return newPassword === confirmPassword}

/* --------------------------------------------------------------------------------------------------------------- */

    const handleUpdate = async (e) => {
        e.preventDefault()

        // Validate password entered (From backend)
        if (user) {
            await changePassword(user.id, user.token, {password, newPassword, confirmPassword})
        }
    }

    const updateFields = () => {
        setDash(false)
        setError(false)
        setMessage(false)
    }

    return ( 
        <div className="h-full bg-white shadow-md max-w-xl mx-auto">
            <div className="pt-6 mx-4 sm:mx-12 lg:mx-18 text-center text-gray-700 font-bold">
                <label>Please change your password so we can have you ordering pizza in no time.</label>
            </div>
            <form className="mx-4 p-6">
                <div className="mb-7">
                    <label className="block text-gray-700 font-bold mb-2">Current Password:</label>
                    <div className="flex relative items-center">
                        <input type={!visible1 ? 'password' : 'text'} value={password} name="password" onChange={e => {setPassword(e.target.value); updateFields()}} className={`inputbox ${error ? 'border border-red-700 focus:border-red-700' : 'border-gray-400 focus:border-blue-700'}`}/>
                        <label className="absolute right-4 cursor-pointer hover:text-blue-700" onClick={(e) => setVisible1(!visible1)}>{visible1 ? <AiFillEyeInvisible size={22}/> : <AiFillEye size={22}/>}</label>
                    </div>
                </div>
                <div className="my-4">
                    <label className="block text-gray-700 font-bold mb-2">New Password:</label>
                    <div className="flex relative items-center">
                        <input type={!visible2 ? 'password' : 'text'} value={newPassword} name="newPassword" onChange={e => {setNewPassword(e.target.value); updateFields()}} className='inputbox border-gray-400 focus:border-blue-700'/>
                        <label className="absolute right-4 cursor-pointer hover:text-blue-700" onClick={(e) => setVisible2(!visible2)}>{visible2 ? <AiFillEyeInvisible size={22}/> : <AiFillEye size={22}/>}</label>
                    </div>
                </div>
                <div className="my-4">
                    <label className="block text-gray-700 font-bold mb-2">Confirm Password:</label>
                    <div className="flex relative items-center">
                        <input type={!visible3 ? 'password' : 'text'} value={confirmPassword} name="confirmPassword" onChange={e => {setConfirmPassword(e.target.value); updateFields()}} className='inputbox border-gray-400 focus:border-blue-700'/>
                        <label className="absolute right-4 cursor-pointer hover:text-blue-700" onClick={(e) => setVisible3(!visible3)}>{visible3 ? <AiFillEyeInvisible size={22}/> : <AiFillEye size={22}/>}</label>
                    </div>
                </div>
                <PasswordCheck checkLength={checkLength} checkLetterNum={checkLetterNum} checkMatch={checkMatch} checkSymbol={checkSymbol} dash={dash} />
                <li className="flex items-center mb-2">
                <div className="p-2">{dash ? <VscChromeMinimize className="text-gray-700" size={20}/> : checkMatch() ? <VscCheck className="text-green-600" size={20}/> : <VscChromeClose className="text-red-600" size={20}/>}</div>
                    <span className="block text-gray-700 font-bold"> Passwords need to match</span>
                </li>
                <div className="my-4">
                    <label className="bottom-[-1.7rem] text-red-700 font-bold">{error}</label>
                    <label className="bottom-[-1.7rem] text-green-700 font-bold">{message}</label>
                </div>
                <button type="submit" disabled={isLoading} onClick={e => handleUpdate(e)} className="submitBtn mt-1">Submit</button>
            </form>
        </div>
     );
}
 
export default Security;