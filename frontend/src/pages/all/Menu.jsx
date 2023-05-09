import { getMenuPdfApi } from "../../api/menuApi";

const Menu = () => {
    return (
        <div className="w-full h-full">
            <h1>menu</h1>          
            <a onClick={() => {
                getMenuPdfApi()
                .then((response) => window.open(response.data.url))
                .catch((error) => console.error(error));
            }}>
                <span className=' text-gray-700 font-semibold hover:text-red-600 sm:text-xl sm:font-bold lg:text-2xl'>Menu (PDF)</span>
            </a>
        </div> 
     );
}
 
export default Menu;
