import { useEffect, useState } from 'react';
import {getAllUsersAPI, deleteUserAPI} from '../../api/userApi';
import { useAuthContext } from '../../customHooks/useAuthContext';
import UserTable from '../../components/UserTable';
import Search from '../../components/Search';

const AdminUsers = () => {
    const {user} = useAuthContext()
    const [users, setUsers] = useState([])
    const [sortedUsers, setSortedUsers] = useState([])

    useEffect(() => {
        if (user) {
            getAllUsersAPI(user.token)
            .then(response => {
                setUsers(response.data)
                setSortedUsers(response.data)
            })
            .catch(error => console.log(error))
        }
    }, [user])

    const resetUsers = () => {
        setSortedUsers(users)
    }

    const handleDelete = (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this user?');
        if (id == user.id) {
            console.log("Are you sure you want to delete your own account?")
            return;
        }
        if (confirmed){
            deleteUserAPI(id, user.token)
            .then(response => {
                const newUsers = users.filter(user => user._id !== id)
                setUsers(newUsers)
            })
            .catch(error => console.log(error))
        }
    }

    // Sorting
    const [sortBy, setSortBy] = useState(null) // Sort By Firstname 0 / Lastname 1
    const [asc, setAsc] = useState(true) // Sort By Ascending Order
    const changeSort = (x) => {
        if (x == sortBy){
            setAsc(!asc)
        } else {
            setSortBy(x)
            if (asc) setAsc(true)
        }
    }
    
    const handleSort = () => {
        let field;
        switch (sortBy){
            case 0:
                field = 'firstname'
                break
            case 1:
                field = 'lastname'
                break
            case 2:
                field = 'phone'
                break
            default:
                field = null;
        }
        let newSortedUsers;
        if (!field) return;
        if (asc){
          newSortedUsers = [...sortedUsers].sort((a, b) => {
            return a[field].localeCompare(b[field], undefined, { sensitivity: 'base' });
          })
        } else {
          newSortedUsers = [...sortedUsers].sort((a, b) => {
            return b[field].localeCompare(a[field], undefined, { sensitivity: 'base' });
          });
        }
        setSortedUsers(newSortedUsers)
    }

    useEffect(() => {
        handleSort()
      }, [sortBy, asc])
      
    if (!users) {
        return (
            <h1>Cannot get users</h1>
        )
    }

    // Searching
    const handleSearch = (field, word) => {
        const newSortedUsers = users.filter(user => {
            return user[field].toLowerCase().includes(word.toLowerCase())
        })
        setSortedUsers(newSortedUsers)
    }

    if (!users) {
        return <h1> No users found.</h1>
    }
    
    return ( 
        <div className='max-w-7xl mx-auto'>
            <Search handleSearch={handleSearch} handleSort={handleSort} resetUsers={resetUsers}/>
            <UserTable handleDelete={handleDelete} sortedUsers={sortedUsers} changeSort={changeSort} sortBy={sortBy} asc={asc}/>
        </div>
     );
}
 
export default AdminUsers;