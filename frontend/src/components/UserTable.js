import { useEffect, useState } from 'react';
import {AiFillDelete} from 'react-icons/ai';
import { BiChevronsLeft, BiChevronLeft, BiChevronsRight, BiChevronRight, BiChevronDown, BiChevronUp } from 'react-icons/bi';

const ROWS_PER_PAGE = 8;

function UserTable({ sortedUsers, handleDelete, changeSort, sortBy, asc }) {
  // Pagination 
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedUsers, setDisplayedUsers] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [endIndex, setEndIndex] = useState(1)

  const handlePagination = () => {
    let startIndex = (currentPage - 1) * ROWS_PER_PAGE;
    let endIndex = startIndex + ROWS_PER_PAGE;
    setEndIndex(endIndex)

    let totalPages = Math.ceil(sortedUsers.length / ROWS_PER_PAGE)
    setTotalPages(totalPages)
    if (currentPage > totalPages) setCurrentPage(totalPages)
    if (totalPages > 0 && currentPage === 0) setCurrentPage(1)

    const newDisplayedUsers = sortedUsers.slice(startIndex, endIndex)
    setDisplayedUsers(newDisplayedUsers)
  }
  
  useEffect(() => {
    handlePagination()
  }, [sortedUsers, currentPage])

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };
 
  return (
    <div>
    <div className='mx-auto overflow-auto'>
      <table className='table-auto w-full text-left min-w-[40rem]'>
        <thead className='bg-gray-100'>
          <tr className='border-b border-gray-200 text-sm lg:text-base whitespace-nowrap'>
            <th className='p-3'><span onClick={() => {changeSort(0)}} className='flex items-center cursor-pointer'>First Name 
              <div className='ml-1'>{sortBy === 0 && (asc ? <BiChevronDown/> : <BiChevronUp/>)}</div></span>
            </th>
            <th className='p-3'><span onClick={() => {changeSort(1)}} className='flex items-center cursor-pointer'>Last Name 
              <div className='ml-1'>{sortBy === 1 && (asc ? <BiChevronDown/> : <BiChevronUp/>)}</div></span>
            </th>
            <th className='p-3'><span className='flex items-center'>Email </span></th>
            <th className='p-3'><span  onClick={() => {changeSort(2)}} className='flex items-center cursor-pointer'>Phone Number 
              <div className='ml-1'>{sortBy === 2 && (asc ? <BiChevronDown/> : <BiChevronUp/>)}</div></span>
            </th>
            <th className='p-3'><span className='flex items-center'>Is Verified</span></th>
            <th className='p-3'></th>
          </tr>
        </thead>
        <tbody className='w-full'>
          {displayedUsers.map((user) => (
            <tr key={user._id} className='border-b border-gray-200 text-xs lg:text-sm break-all'>
              <td className='p-3'>{user.firstname}</td>
              <td className='p-3'>{user.lastname}</td>
              <td className='p-3'>{user.email}</td>
              <td className='p-3'>{user.phone}</td>
              <td className='p-3'>{user.verified ? 'Yes' : 'No'}</td>
              <td className='p-3'>
                <div className='text-center flex items-center cursor-pointer' onClick={() => handleDelete(user._id)}>
                  <AiFillDelete size={24} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className='flex justify-end mt-4 items-center text-sm'>
    <div className='flex-1 text-sm font-light'>Page {currentPage} of {totalPages} </div>
    <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}
      className={currentPage === 1 ? 'cursor-not-allowed' : ''}>
        <BiChevronsLeft size={20}/>
    </button>
    <button onClick={handlePreviousPage} disabled={currentPage === 1}
      className={currentPage === 1 ? 'cursor-not-allowed' : ''}>
        <BiChevronLeft size={20}/>
    </button>
    <div>
      <button onClick={() => setCurrentPage(currentPage - 1)}className={`mx-1 ${currentPage - 1 < 1 && 'hidden'}`}>{currentPage - 1}</button>
      <button className='mx-1 cursor-not-allowed font-bold'>{currentPage}</button>
      <button onClick={() => setCurrentPage(currentPage + 1)}className={`mx-1 ${currentPage + 1 > totalPages && 'hidden'}`}>{currentPage + 1}</button>
    </div>
    <button onClick={handleNextPage} disabled={endIndex >= sortedUsers.length}
      className={currentPage >= totalPages ? 'cursor-not-allowed' : ''}>
        <BiChevronRight size={20}/>
    </button>
    <button onClick={() => setCurrentPage(totalPages)} disabled={endIndex >= sortedUsers.length}
      className={currentPage >= totalPages ? 'cursor-not-allowed' : ''}>
        <BiChevronsRight size={20}/>
    </button>
    </div>
    </div>
  );
}

export default UserTable;