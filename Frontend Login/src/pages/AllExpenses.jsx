import React, { useEffect, useState } from 'react'
import { getCookie } from '../utils/getcookie';
import { Link } from 'react-router';

function AllExpenses() {

    const [expenses, setExpenses] = useState([])
    const GetAllExpenses = async()=>{
    
      const token = getCookie("token")?.replace(/;$/, "");

      // console.log(token)
      try {
        const res = await fetch("http://127.0.0.1:8080/expense/all",{
          headers:{
            "Content-type":"application/json",
            "Authorization": `Bearer ${token}`
          }
        })
        
        const data = await res.json()
        console.log(data)

        if(data.success== false){
          return
        }

        setExpenses(data.expenses || data)
        
      } catch (error) {
        console.log(error)
      }
      }


      
      
      
      useEffect(()=>{
        GetAllExpenses()
      },[])
      const DeleteExpenseById = async (id) => {
    
        const token = getCookie("token")?.replace(/;$/, "");
    
        try {
          const res = await fetch(`http://127.0.0.1:8080/expense/delete/${id}`,{
              method: "DELETE",
              headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
              }
            }
          )
    
          const data = await res.json()
    
          if (!res.ok) {
            alert(data.message || "Expense delete failed")
            return
          }
    
          setExpenses((prevExpenses) =>
            prevExpenses.filter((expense) => expense._id !== id)
          )
    
          alert("Expense deleted successfully!")
    
        } catch (error) {
          console.log(error)
          alert("Something went wrong")
        }
      }

  return (
    <>
    <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-5">All Expenses</h1>

            {expenses.map((expense) => (
                <div key={expense._id} className="p-4 border rounded-lg mb-3">
                  <div>

                    <h2 className="font-semibold"><b>Title: </b>{expense.title}</h2>
                    <p><b>Amount: </b>{expense.amount}</p>
                    {/* <p><b>Description: </b>{expense.description}</p>
                    <p><b>Expense_Id: </b>{expense._id}</p>
                    <p><b>User_Id: </b>{expense.user}</p>
                    <p><b>Created_At: </b>{expense.date}</p> */}
                    </div>

                    <div className='mt-2 space-x-3'>

                          <Link className=' rounded shadow-2xs  mb-2 px-2 py-0.5 bg-indigo-600 text-white' to={`/expense/${expense._id}`}>Details</Link>
                          <Link className=' rounded shadow-2xs  mb-2 px-2 py-0.5 bg-green-600 text-white' 
                          to={`/expense/update/${expense._id}?title=${expense.title}&amount=${expense.amount}&description=${expense.description}
                          &date=${expense.date}`}>Edit</Link>
                          <Link className=' rounded shadow-2xs  mb-2 px-2 py-0.5 bg-red-600 text-white' onClick={() => DeleteExpenseById(expense._id)}>Delete</Link>

                    </div>

                </div>
            ))}
        </div>
    </>
  )
}

export default AllExpenses