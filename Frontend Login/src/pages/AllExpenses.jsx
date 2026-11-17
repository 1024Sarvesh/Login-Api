import React, { useEffect, useState } from 'react'
import { getCookie } from '../utils/getcookie';
import { Formatedate } from '../utils/formateDate';

function AllExpenses() {

    const [expenses, setExpenses] = useState([])
    const GetAllExpenses = async()=>{
    
      const token = getCookie("token")?.replace(/;$/, "");
      console.log(token)
      try {
        const res = await fetch("http://127.0.0.1:8080/expense/all",{
          headers:{
            "Content-type":"application/json",
            "Authorization": `Bearer ${token}`
          }
        })
        
        const data = await res.json()
        console.log(data)
        setExpenses(data.expenses || data)
        
      } catch (error) {
        console.log(error)
      }
      }
    
      useEffect(()=>{
        GetAllExpenses()
      },[])

  return (
    <>
    <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-5">All Users</h1>

            {expenses.map((expense) => (
                <div key={expense._id} className="p-4 border rounded-lg mb-3">
                    <h2 className="font-semibold"><b>Title: </b>{expense.title}</h2>
                    <p><b>Amount: </b>{expense.amount}</p>
                    {/* <p><b>Description: </b>{expense.description}</p>
                    <p><b>Expense_Id: </b>{expense._id}</p>
                    <p><b>User_Id: </b>{expense.user}</p>
                    <p><b>Created_At: </b>{expense.date}</p> */}
                </div>
            ))}
        </div>
    </>
  )
}

export default AllExpenses