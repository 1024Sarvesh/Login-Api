import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getCookie } from '../utils/getcookie'

function ExpenseById() {

    const [expense, setExpense] = useState([])
    const { id } = useParams()

    const GetExpenseById = async () => {
        const token = getCookie("token")?.replace(/;$/, "");
        console.log(token)


        try {
            const res = await fetch(`http://127.0.0.1:8080/expense/${id}`, {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })

            const data = await res.json()
            console.log(data)
            setExpense(data.expense || data)
        } catch (error) {
            console.log(error)
        }
        
    }
    useEffect(() => {
        GetExpenseById()
    }, [])
    return (
        <>
            <div className="max-w-6xl mx-auto p-6">

                <h1 className="text-2xl font-bold mb-5">
                    Expense Details
                </h1>

                {expense && (
                    <div className="p-4 border rounded-lg mb-3">
                        <p><b>Title:</b>{expense.title} </p>
                        <p><b>Amount:</b> {expense.amount}</p>
                        <p><b>Description:</b> {expense.description}</p>
                        <p><b>_Id:</b> {expense._id}</p>
                        <p><b>User_Id:</b> {expense.user}</p>
                        <p><b>Date:</b> {expense.date}</p>
                    </div>
                )}

            </div>
        </>
    )
}

export default ExpenseById