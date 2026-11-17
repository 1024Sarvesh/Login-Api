import React, { useEffect, useState } from 'react'
import { getCookie } from '../utils/getcookie';
import { Link } from 'react-router';

function AllUser() {

  const [users, setUsers] = useState([])
  const GetAllUsers = async () => {

    const token = getCookie("token")?.replace(/;$/, "");
    console.log(token)
    try {
      const res = await fetch("http://127.0.0.1:8080/auth/allusers", {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })

      const data = await res.json()
      console.log(data)
      setUsers(data.users || data)

    } catch (error) {
      console.log(error)
    }
  }

  const DeleteUserById = async (id) => {

    const token = getCookie("token")?.replace(/;$/, "");

    try {
      const res = await fetch(`http://127.0.0.1:8080/user/delete/${id}`,{
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        }
      )

      const data = await res.json()

      if (!res.ok) {
        alert(data.message || "User delete failed")
        return
      }

      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== id)
      )

      alert("User deleted successfully!")

    } catch (error) {
      console.log(error)
      alert("Something went wrong")
    }
  }

  useEffect(() => {
    GetAllUsers()
  }, [])

  return (
    <>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-5">All Users</h1>

        {users.map((user) => (
          <div key={user._id} className=" flex justify-between items-center p-4 border rounded-lg mb-3">
            <div>

              <h2 className="font-semibold"><b>Name: </b>{user.name}</h2>
              <p><b>Email: </b>{user.email}</p>
            </div>
            <div className='grid grid-rows-1'>
              <Link className=' rounded shadow-2xs  mb-2 px-2 py-0.5 bg-indigo-600 text-white' to={`/user/${user._id}`}>Details</Link>
              <Link className=' rounded shadow-2xs  mb-2 px-2 py-0.5 bg-red-600 text-white' onClick={() => DeleteUserById(user._id)}>Delete</Link>
            </div>

          </div>
        ))}
      </div>
    </>
  )
}

export default AllUser