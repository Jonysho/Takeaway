import { useEffect, useState } from "react";

const MyDetails = () => {
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [error, setError] = useState('All fields are required.')

    useEffect(() => {
        // Fetch user details
        const user = {
            fname: 'Jonathan',
            lname: 'Ho',
            email: 'jon@123.com',
            phone: '0123456789',
        }
        // set user details
        setFname(user.fname)
        setLname(user.lname)
        setEmail(user.email)
        setPhone(user.phone)
    })

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
            default:
                break
        }
    }

    const updateUser = (e) => {
        e.preventDefault()
        const newUser = {
            fname: fname,
            lname: lname,
            email: email,
            phone: phone,
        }
        // Post new User to DB
    }

    return ( 
        <div className="h-full bg-white shadow-md max-w-xl mx-auto">
            <form method="POST" className="mx-auto p-6">
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
                <div className="mb-3">
                    <label htmlFor="error" className="text-red-600 font-bold">{error}</label>
                </div>
                <button type="submit" onClick={e => updateUser(e)} className='submitBtn'>Update</button>
            </form>
        </div>
     );
}
 
export default MyDetails;