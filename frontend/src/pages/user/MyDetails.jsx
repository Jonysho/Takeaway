import { useEffect, useState } from "react";
import { useAuthContext } from "../../customHooks/useAuthContext";
import { useUpdate } from "../../customHooks/useUpdate";
import { useDetails } from "../../customHooks/useDetails";

const MyDetails = () => {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [phone, setPhone] = useState('')
    
    const {user} = useAuthContext()

    const {userInfo, getDetails} = useDetails()
    const { updateDetails, message, setMessage, error, setError, isLoading } = useUpdate()
    
    useEffect(() => {
        if (user){
            getDetails(user.id, user.token)
        }
    }, [user])

    useEffect(() => {
        if (userInfo){
            const {firstname, lastname, phone} = userInfo
            firstname && setFirstname(firstname)
            lastname && setLastname(lastname)
            phone && setPhone(phone)
        }
    }, [userInfo])

    const updateFields = () => {
        setError(false)
        setMessage(false)
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        if (user){
            await updateDetails(user.id, user.token, {firstname, lastname, phone})
        }
    }

    return ( 
        <div className="bg-white shadow-md max-w-xl mx-auto">
            <form className="mx-4 p-6">
                <div className="pb-4">
                    <label className="block text-gray-700 font-bold mb-2">First Name:</label>
                    <input type="text" value={firstname} name="firstname" onChange={e => {setFirstname(e.target.value); updateFields()}} className="inputbox border-gray-400 focus:border-blue-700"/>
                </div>
                <div className="pb-4">
                    <label className="block text-gray-700 font-bold mb-2">Last Name:</label>
                    <input type="text" value={lastname} name="lastname" onChange={e => {setLastname(e.target.value); updateFields()}} className="inputbox border-gray-400 focus:border-blue-700"/>
                </div>
                <div className="pb-4">
                    <label className="block text-gray-700 font-bold mb-2">Email address:</label>
                    <input type="email" value={userInfo.email} name="email" disabled={true} className="inputbox border-gray-400 focus:border-blue-700 opacity-75"/>
                </div>
                <div className="pb-4">
                    <label className="block text-gray-700 font-bold mb-2">Contact Number:</label>
                    <input type="number" value={phone} name="phone" onChange={e => {setPhone(e.target.value); updateFields()}} className="inputbox border-gray-400 focus:border-blue-700"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="error" className="text-red-600 font-bold">{error}</label>
                    <label htmlFor="message" className="text-green-600 font-bold">{message}</label>
                </div>
                <button type="submit" disabled={isLoading} onClick={e => handleUpdate(e)} className='submitBtn'>Update</button>
            </form>
        </div>
     );
}
 
export default MyDetails;