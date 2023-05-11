import { useEffect, useState } from "react";
import MenuCard from "../../components/cards/MenuCard";
import categories from '../../utils/menu/itemCategories';
import sizes from '../../utils/menu/itemSizes';
import {IoMdAdd, IoMdRemove} from 'react-icons/io';
import { addMenuItemApi, deleteMenuItemApi, getMenuItemApi, updateMenuItemApi } from "../../api/menuApi";
import { useAuthContext } from "../../customHooks/useAuthContext";

const AdminMenu = () => {
    const {user} = useAuthContext()
    const [menuItem, setMenuItem] = useState({
        itemId: '',
        name: '',
        category: '',
        moreInfo: '',
        hot: false,
        recommended: false,
        image: '',
        quantity: '',
        portions: []
    })
    const [size, setSize] = useState('')
    const [price, setPrice] = useState(0.00)
    const [imageFile, setImageFile] = useState(null)
    const [image, setImage] = useState('')

    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)

    useEffect(() => {
        if (error) setMessage(null)
        else if (message) setError(null)
    }, [error, message])
    
    const handleReset = () => {
        setMenuItem({
            itemId: '',
            name: '',
            category: '',
            moreInfo: '',
            hot: false,
            recommended: false,
            quantity: '',
            image: '',
            portions: []
        })
        setSize('')
        setPrice(0.00)
        setImageFile(null)
        setImage('')
    }

    const handleChange = (e) => {
        setError(null)
        setMessage(null)
        const {name, checked, value} = e.target
        if (name === "hot" || name === "recommended"){   
            setMenuItem(prevItem => ({...prevItem, [name]: checked}))
        } else {
            setMenuItem(prevItem => ({...prevItem, [name]: value}))
        }
    }

    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
    const handleFileUpload = (e) => {
        e.preventDefault()
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        console.log(file.size)
        if (file.size > MAX_FILE_SIZE) {
            alert(`File size must be less than ${MAX_FILE_SIZE} bytes.`);
            return;
        }
        
        setImage(URL.createObjectURL(file))
        setImageFile(file)
    };

    const addSize = (e) => {
        setError(null)
        setMessage(null)
        // check if portion exists in size
        const exists = menuItem.portions.find(obj => obj.size === size)
        if (exists){
            setError('This portion has already been added.')
            return;
        }
        const parsedPrice = parseFloat(price)
        if (isNaN(parsedPrice)) {
            setError('Price must be a valid number.');
            return;
        }
        const newPortions = [...menuItem.portions, { "size": size, "price": parsedPrice.toFixed(2) }]
        setMenuItem(prevItem => ({...prevItem, portions: newPortions}))
    }

    const removeSize = (delSize) => {
        const newPortions = menuItem.portions.filter(obj => obj.size !== delSize)
        setMenuItem(prevItem => ({...prevItem, portions: newPortions}))
    }

    const handleMessage = response => {
        setMessage(response.data.message)
    }
    
    const handleError = error => {
        console.log(error)
        setError(error.response.data.error)
    }

    const handleApi = async (e) => {
        e.preventDefault()
        const { name } = e.target
        if (!menuItem.itemId){
            setError('Item ID is required.')
            return false
        }
        switch(name) {
            case "get":
                getMenuItemApi(menuItem.itemId, user.token)
                .then((response) => {setMenuItem({...response.data}); handleMessage(response)})
                .catch(handleError)
                break
            case "add":
                addMenuItemApi(menuItem, imageFile, user.token)
                .then(handleMessage)
                .catch(handleError)
                break;
            case "update":
                updateMenuItemApi(menuItem.itemId, menuItem, user.token)
                .then(handleMessage)
                .catch(handleError)
                break;
            case "delete":
                const confirmed = window.confirm('Are you sure you want to delete this item?');
                if (confirmed) {
                    deleteMenuItemApi(menuItem.itemId, user.token)
                    .then(handleMessage)
                    .catch(handleError)
                }
                break;
        }
    }

    return (    
        <div>
        <div className="flex-1 flex-wrap justify-center sm:grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex col-span-1 mx-auto md:mx-0 w-full">
                <div className="mx-auto p-2 flex-1">
                    <div className="mb-2 max-w-[20rem]">
                        <label className="block text-gray-700 font-bold mb-2">Item ID</label>
                        <div className="flex items-center">
                            <input type="number" value={menuItem.itemId} name={"itemId"} onChange={handleChange} 
                                className="inputbox border-gray-400 focus:border-blue-700 max-w-[5rem]"/>
                            <button className="ml-4 bg-gray-300 hover:bg-gray-400 px-2 rounded-sm" onClick={handleApi} name="get">Load</button>
                            <button className="ml-4 bg-gray-300 hover:bg-gray-400 px-2 rounded-sm" onClick={handleReset}>Reset</button>
                        </div>
                    </div>
                    <div className="mb-2 max-w-[28rem]">
                        <label className="block text-gray-700 font-bold mb-2">Name</label>
                        <input type="text" value={menuItem.name} name={"name"} onChange={handleChange} 
                            className="inputbox border-gray-400 focus:border-blue-700"/>
                    </div>
                    <div className="mb-2 max-w-[28rem]">
                        <label className="block text-gray-700 font-bold mb-2">Category</label>
                        <select type="text" value={menuItem.category} name={"category"} onChange={handleChange} 
                            className="inputbox border-gray-400 focus:border-blue-700 cursor-pointer">
                            <option value="" disabled defaultValue>Select a category</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="max-w-[20rem]">
                        <div className="flex justify-between items-center mb-1">
                            <label className="text-gray-700 font-bold mb-2">Recommended</label>
                            <input type="checkbox" name="recommended" checked={menuItem.recommended} onChange={handleChange}/>
                        </div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="text-gray-700 font-bold mb-2">Hot & Spicy</label>
                            <input type="checkbox" name="hot" checked={menuItem.hot} onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="mb-2 max-w-[30rem]">
                        <label className="block text-gray-700 font-bold mb-2">More Info</label>
                        <textarea name="moreInfo" cols="30" rows="4" value={menuItem.moreInfo} onChange={handleChange}
                            className="inputbox border-gray-400 resize-none"></textarea>
                    </div>
                </div>
            </div>
            <div className="col-span-1 mb-4 w-full p-2">
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Image {"(<10MB)"} </label>
                    <input type="file" onChange={handleFileUpload} className="cursor-pointer w-full"/>
                </div>
                <div className="flex justify-between mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Quantity</label>
                    <input type="number" name="quantity" value={menuItem.quantity} onChange={handleChange} 
                        className="border border-gray-400 rounded-lg text-center focus:border-blue-700 max-w-[3rem]"/>
                </div>
                <div className="flex mb-4">
                    <div className="mx-auto flex-1 grid grid-cols-4 gap-2">
                        <label className="block text-gray-700 font-bold col-span-2">Portion Size</label>
                        <label className="block text-gray-700 font-bold">Price</label>
                        <div></div>
                        <div className="max-w-[8rem] col-span-2">
                            <select type="text" value={size} onChange={(e) => setSize(e.target.value)} 
                                className="py-2 border border-gray-400 rounded-md text-left focus:outline-none focus:border-blue-700 w-full cursor-pointer pl-1">
                                <option value="" disabled defaultValue>Select a size</option>
                                {sizes.map((size, index) => (
                                    <option key={index} value={size}>
                                        {size}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center max-w-[4rem]">
                            <label className="absolute ml-1">£</label>
                            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}
                                className="p-2 pl-3 border border-gray-400 rounded-md text-left focus:outline-none focus:border-blue-700 w-full"/>
                        </div>
                        <button onClick={addSize} className="rounded-lg bg-green-400 text-center max-w-[4rem]">
                            <IoMdAdd size={20} className="w-full"/>
                        </button>
                    </div>
                </div>
                <div className="mx-auto flex-1">
                    <label className="font-bold underline">Current Prices </label>
                    <ul className="mt-2">
                        { menuItem.portions.map(({size, price}) => (
                            <li key={size} className="flex justify-between">
                                <div className="mb-2"> {size}: £{price}</div>
                                <button onClick={() => removeSize(size)} className="rounded-lg bg-red-400 text-center px-1 h-fit">
                                    <IoMdRemove size={20}/>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="h-full sticky top-20 z-50 w-64 md:w-56 lg:w-64 xs:col-span-2 md:col-span-1 mx-auto">
                <span className="text-bold text-xl">Preview:</span>
                <MenuCard menuItem={menuItem} image={image}/>
                <div className="text-center my-4">
                    <label htmlFor="error" className="text-red-600 font-bold">
                        {error}
                    </label>
                    <label htmlFor="error" className="text-green-600 font-bold">
                        {message}
                    </label>
                </div>
                <div className="flex w-full mt-2 justify-evenly">
                    <button className="bg-green-400 hover:bg-green-500 p-3 rounded-lg font-semibold" onClick={handleApi} name="add">Add</button>
                    <button className="bg-amber-400 hover:bg-amber-500 p-3 rounded-lg font-semibold" onClick={handleApi} name="update">Update</button>
                    <button className="bg-red-500 hover:bg-red-600 p-3 rounded-lg font-semibold" onClick={handleApi} name="delete">Delete</button>
                </div>
            </div>
        </div>
    </div>
    )
}
 
export default AdminMenu;