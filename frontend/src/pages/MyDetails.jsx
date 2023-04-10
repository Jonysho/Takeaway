import { useEffect, useState } from "react";
import { useAuthContext } from "../customHooks/useAuthContext";
import { useUpdate } from "../customHooks/useUpdate";

const MyDetails = () => {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    
    const { updateDetails, error, isLoading } = useUpdate()
    const {user} = useAuthContext()

    useEffect(() => {
        if (user){
            const {firstname, lastname, email, phone} = user
            setFirstname(firstname)
            setLastname(lastname)
            setEmail(email)
            setPhone(phone)
        }
    }, [user])

    const handleUpdate = async (e) => {
        e.preventDefault()
        if (user){
            await updateDetails(user.id, user.token, {firstname, lastname, email, phone})
        }
    }

    return ( 
        <div className="h-full bg-white shadow-md max-w-xl mx-auto">
            <form    className="mx-4 p-6">
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
                <div className="mb-3">
                    <label htmlFor="error" className="text-red-600 font-bold">{error}</label>
                </div>
                <button type="submit" disabled={isLoading} onClick={e => handleUpdate(e)} className='submitBtn'>Update</button>
            </form>
        </div>
     );
}
 
export default MyDetails;