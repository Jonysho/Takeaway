import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

const Search = ({handleSearch, resetUsers}) => {
    const [search, setSearch] = useState('firstname')
    const [input, setInput] = useState('')
    
    useEffect(() => {
        resetUsers()
        handleSearch(search, input)
    }, [input, search])

    return ( 
        <div className="w-full mb-4 bg-gray-50 text-sm">
            <div className="p-2">
                <div className="flex flex-col sm:flex-row justify-start sm:justify-end items-center mb-4 relative">
                    <div className="mr-2 sm:mb-0">
                        <label className="mr-1">Search By: </label>
                        <select id="sortBy" name="search" value={search} onChange={(e) => setSearch(e.target.value)} className="bg-gray-200 mb-3 sm:mb-0 rounded-sm cursor-pointer p-1 w-fit outline-none">
                            <option value="firstname">Firstname</option>
                            <option value="lastname">Lastname</option>
                            <option value="email">Email</option>
                            <option value="phone">Phone Number</option>
                        </select>
                    </div>
                    <div className="relative flex justify-end items-center">
                        <input type="text" id="searchInput" value={input} onChange={(e) => setInput(e.target.value)}
                            className="w-64 bg-gray-100 rounded-lg border border-gray-400 shadow-sm p-1 text-sm px-2 pr-5 focus:outline-none focus:ring-1 focus:ring-gray-400" />
                        <CiSearch className="absolute mr-1 opacity-50 right-0"/>
                    </div>
                </div>
            </div>
      </div>      
     );
}
 
export default Search;