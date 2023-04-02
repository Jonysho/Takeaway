import { useState } from "react";

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')

    const handleReset = () => {
        // Send link to reset password
    }

    return ( 
        <div className="w-full h-full p-10">
            <div className="pt-6 mx-4 sm:mx-12 lg:mx-18 text-center text-gray-700 font-bold">
                <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl lg:mx-4 text-center text-green-600 drop-shadow-sm">Forgot Password</h1>
                <p className="pt-6 mx-4 sm:mx-24 lg:mx-40 xl:mx-60 text-center text-gray-700 font-bold">If you've forgotten your password or need to set up a new one, please enter your email address. We'll send you a link to a page where you can easily create a new password.</p>
            </div>
            <div className="h-full max-w-xl mx-auto">
                <form className="p-6 mx-10">
                    <div className="mb-2">
                        <label className="block text-gray-700 font-bold mb-2">Email address:</label>
                        <input type="email" value={email} name="email" onChange={e => setEmail(e.target.value)} className="inputbox border-gray-400 focus:border-blue-700"/>
                    </div>
                    <div className="mb-6">
                    <label className="text-red-600 font-bold">{error}</label>
                    </div>
                    <button type="submit" onClick={e => handleReset(e)} className='submitBtn mb-6'>Reset Password</button>
                </form>
            </div>
        </div>
     );
}
 
export default ForgotPassword;