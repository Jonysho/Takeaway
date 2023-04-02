import { VscCheck, VscChromeClose, VscChromeMinimize} from "react-icons/vsc";

const PasswordCheck = ({checkLength, checkLetterNum, checkSymbol, dash}) => {
    return (  
        <ul>
            <li className="flex items-center mb-2">
                <div className="p-2">{dash ? <VscChromeMinimize className="text-gray-700" size={20}/> : checkLength() ? <VscCheck className="text-green-600" size={20}/> : <VscChromeClose className="text-red-600" size={20}/>}</div>
                <span className="block text-gray-700 font-bold">Bewteen 8-30 characters</span>
            </li>
            <li className="flex items-center mb-2">
            <div className="p-2">{dash ? <VscChromeMinimize className="text-gray-700" size={20}/> : checkLetterNum() ? <VscCheck className="text-green-600" size={20}/> : <VscChromeClose className="text-red-600" size={20}/>}</div>

                <span className="block text-gray-700 font-bold">A letter & number</span>
            </li> 
            <li className="flex items-center mb-2">
            <div className="p-2">{dash ? <VscChromeMinimize className="text-gray-700" size={20}/> : checkSymbol() ? <VscCheck className="text-green-600" size={20}/> : <VscChromeClose className="text-red-600" size={20}/>}</div>

                <span className="block text-gray-700 font-bold"> A special character</span>
            </li>
        </ul>
    );
}
 
export default PasswordCheck;