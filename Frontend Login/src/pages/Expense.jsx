import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router'
import { getCookie } from '../utils/getcookie'

function Expense() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [title, setTitle] = useState("")
    const [amount, setAmount] = useState("")
    const [date, setDate] = useState("")
    const [description, setDescription] = useState("")
    // const [loading, setLoading] = useState(false)



    const [searchParams] = useSearchParams();

    const Paramstitle = searchParams.get('title');
    const Paramsamount = searchParams.get('amount');
    const Paramsdescription = searchParams.get('description');
    const Paramsdate = searchParams.get('date');


    //   console.log(Paramsamount,Paramsdate,Paramsdescription,Paramstitle)

    useEffect(() => {
        if (id) {
            setTitle(Paramstitle || "");
            setAmount(Paramsamount || "");
            setDescription(Paramsdescription || "");

            if (Paramsdate) {
                setDate(new Date(Paramsdate).toISOString().slice(0, 16));
            }
        }
    }, [id, Paramstitle, Paramsamount, Paramsdescription, Paramsdate]);


    const Expense = {
        title: title,
        amount: Number(amount),
        date: new Date(date),
        description: description
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = getCookie("token")?.replace(/;$/, "");
        try {
            const res = await fetch(
                id
                    ? `http://127.0.0.1:8080/expense/update/${id}`
                    : "http://127.0.0.1:8080/expense/create",
                {
                    method: id ? "PUT" : "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },

                    body: JSON.stringify(Expense)
                }
            )

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            const data = await res.json();

            console.log(data)
            alert(data.message)
            setAmount("")
            setDate("")
            setTitle("")
            setDescription("")

            navigate("/")


        } catch (error) {
            console.log(error)
        }

    }



    return (
        <>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8">

                    <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
                        {id ? "Edit Expense" : "Add New Expense"}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-5">

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Expense Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value)
                                }}
                                placeholder="Enter expense title"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Amount
                            </label>
                            <input
                                type="number"
                                name="amount"
                                placeholder="Enter amount"
                                value={amount}
                                onChange={(e) => {
                                    setAmount(e.target.value)
                                }}
                                min="0.01"
                                step="0.01"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Date
                            </label>
                            <input
                                type="datetime-local"
                                name="date"
                                value={date}
                                onChange={(e) => {
                                    setDate(e.target.value)
                                }}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                name="description"
                                placeholder="Enter expense description"
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value)
                                }}
                                rows="4"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-50"
                        >
                            {/* Add Expense */}
                            {id ? "Update Expense" : "Add Expense"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Expense