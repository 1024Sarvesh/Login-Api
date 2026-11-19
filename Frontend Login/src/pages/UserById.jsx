import React, { useEffect, useState } from 'react'
import { getCookie } from '../utils/getcookie';
import { useParams } from 'react-router';
import { formatDate } from '../utils/formateDate';

function UserById() {


  const [user, setUser] = useState([])
  const { id } = useParams()
  const GetUserbyId = async () => {

    const token = getCookie("token")?.replace(/;$/, "");
    console.log(token)

    try {
      const res = await fetch(`http://127.0.0.1:8080/user/${id}`, {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })

      const data = await res.json()
      console.log(data.user)
      setUser(data.user || data)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    GetUserbyId()
  }, [])


  return (
    <>
      <div className="max-w-6xl mx-auto p-6">

        <h1 className="text-2xl font-bold mb-5">
          User Details
        </h1>

        {user && (
          <div className="p-4 border rounded-lg mb-3">
            <p><b>Name:</b> {user.name}</p>
            <p><b>Email:</b> {user.email}</p>
            <p><b>Gender:</b> {user.gender}</p>
            <p><b>_Id:</b> {user._id}</p>
            <p><b>Created_At:</b> {formatDate(user.createdAt)}</p>
          </div>
        )}

      </div>
    </>
  )
}

export default UserById