// import axios from "axios";
// import { useEffect, useState } from "react";
import { openingHours } from "../utils/openingHours";
import map from "../img/map.png";
import {ImCross} from 'react-icons/im';

const Info = ({setIsInfoOpen}) => {
    // const [mapUrl, setMapUrl] = useState(null);

    // // Fetch the map URL from the backend server on component mount
    // useEffect(() => {
    //     axios.get('http://localhost:8000/api/map')
    //         .then(response => 
    //             setMapUrl(response.data))
    //         .catch(error => console.log(error));
    // }, []);

    return ( 
        <div className="bg-white rounded-xl p-4  text-black flex items-center mx-auto">
        <div className="absolute right-0 top-0 p-5 ">
            <ImCross size={20} className="cursor-pointer text-black-600 hover:text-red-600" onClick={() => setIsInfoOpen(false)}/>
        </div>
        <table className="divide-y divide-gray-200 mr-4">
            <thead className="bg-gray-100">
            <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opening Times</th>
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {openingHours.map(({ day, time }) => (
            <tr key={day}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{day}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{time}</td>
            </tr>
            ))}
            </tbody>
        </table>
        <div className="">
            <p className="text-center text-lg font-bold text-gray-500 uppercase tracking-wider my-4 h-full">Location</p>
            {/* {mapUrl && <iframe src={mapUrl} width="100%" height="450" frameborder="0" style={{ border: 0 }} allowFullScreen></iframe>} */}
            <a href="https://goo.gl/maps/1mtj5wFaTrcYgShY9" target="_blank"><img src={map} alt="Google map" className="mx-auto items-center"/></a>
        </div>
        </div>

     );
}
 
export default Info;