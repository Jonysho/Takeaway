import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Error404 from "./Error404";

const EmailVerify = () => {
    const [validUrl, setValidUrl] = useState(false);
    const param = useParams()
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null)

    const verifyEmailUrl = async () => {
        try {   
            const url = `http://localhost:8000/api/user/${param.id}/verify/${param.token}`;
            const {data} = await axios.get(url);
            console.log(data)
            setMessage(data.message)
            setValidUrl(true);
        } catch (error) {
            if (error.response.status !== 404){
                setError(error.response.data.message)
                setValidUrl(true)
            } else {
                setValidUrl(false)
            }
        }
    }

    useEffect(() => {
        verifyEmailUrl()
    }, [param])
    
    return ( 
        <div className="w-full h-full bg-white">
            {validUrl ? 
            <div className="">
                {message && <h1> {message} </h1>}
                {error && <h1> {error} </h1>}
                <Link to="/login">
                    <button>Login</button>
                </Link>
            </div>
            : <Error404/>
            }
        </div>
     );
}
 
export default EmailVerify;