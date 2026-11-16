import React, { useEffect, useState } from 'react'
import { getCookie } from '../utils/getcookie';

function AllUser() {

  const [users, setUsers] = useState([])
const GetAllUsers = async()=>{

  const token = getCookie("token")?.replace(/;$/, "");
  console.log(token)
  try {
    const res = await fetch("http://127.0.0.1:8080/auth/allusers",{
      headers:{
        "Content-type":"application/json",
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

  useEffect(()=>{
    GetAllUsers()
  },[])

  return (
    <>
    {/* <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-5">All Users</h1>

            {users.map((user) => (
                <div key={user._id} className="p-4 border rounded-lg mb-3">
                    <h2 className="font-semibold">{user.name}</h2>
                    <p>{user.email}</p>
                </div>
            ))}
        </div> */}
    </>
  )
}

export default AllUser