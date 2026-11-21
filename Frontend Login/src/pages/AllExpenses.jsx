import React, { useEffect, useState } from 'react'
import { getCookie } from '../utils/getcookie';
import { Link } from 'react-router';
import { formatDate } from '../utils/formateDate';

function AllExpenses() {

  const [expenses, setExpenses] = useState([])
  const [FilteredExpenses, setFilteredExpenses] = useState([])
  const [selectedDate, setSelectedDate] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [month, setMonth] = useState("")

  const GetAllExpenses = async () => {

    const token = getCookie("token")?.replace(/;$/, "");

    // console.log(token)
    try {
      const res = await fetch("http://127.0.0.1:8080/expense/all", {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })

      const data = await res.json()
      console.log(data)

      if (data.success == false) {
        return
      }

      setExpenses(data.expenses || data)
      setFilteredExpenses(data.expenses || data)

    } catch (error) {
      console.log(error)
    }


  }

  useEffect(() => {
    GetAllExpenses()
  }, [])
  const DeleteExpenseById = async (id) => {

    const token = getCookie("token")?.replace(/;$/, "");

    try {
      const res = await fetch(`http://127.0.0.1:8080/expense/delete/${id}`, {
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
  const filteredExpenses = expenses.filter((expense) => {
    const matchesDate = selectedDate
      ? new Date(expense.date).toLocaleDateString("en-CA") === selectedDate
      : true;

    const matchesTitle = expense.title
      ?.toLowerCase()
      .includes(searchTitle.toLowerCase());

    return matchesDate && matchesTitle;
  });

  const totalExpense = filteredExpenses.reduce((total, expense) => {
    return total + Number(expense.amount);
  }, 0);

  const monthlyExpenses = filteredExpenses.filter((expense) => {
    const date = new Date(expense.date);

    return (
      date.getMonth() === Number(month.split("-")[1]) - 1 &&
      date.getFullYear() === Number(month.split("-")[0])
    );
  });

  const monthlyTotal = monthlyExpenses.reduce((total, expense) => {
    return total + Number(expense.amount);
  }, 0);

  return (
    <>
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6">

        <h1 className="text-3xl text-center font-bold mb-5">All Expenses </h1>
        <div className="w-full flex flex-wrap gap-3 mb-5">

          <div className="flex-1 min-w-[280px] border rounded-lg p-3 flex justify-between items-center">
            <h1 className="font-semibold text-lg sm:text-xl">
              Total Expense
            </h1>

            <h1 className="font-semibold text-lg sm:text-xl">
              ₹{totalExpense}
            </h1>
          </div>

          <div className="flex-1 min-w-[280px] border rounded-lg p-3 flex flex-col gap-2">

            <h1 className="font-semibold text-lg sm:text-xl">
              Monthly Expense
            </h1>

            <input
              type="month"
              className="border rounded p-1"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />

            <h1 className="font-semibold text-lg sm:text-xl">
              ₹{monthlyTotal}
            </h1>

          </div>
        </div>




        <div className='min-w-xl border h-10 flex justify-around items-center mb-5 rounded-lg'>
          <h1 className='font-semibold'>Filter by date</h1>
          <div className='space-x-2 rounded'><input type="date" className='border rounded bg-gray-300' value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)} />
            <button className='rounded  px-3 bg-red-500 text-white' onClick={() => {
              setSelectedDate("")
              setFilteredExpenses(expenses)
            }}>Clear</button>
          </div>
        </div>



        <div className='min-w-xl border h-10 flex justify-around items-center mb-3 rounded-lg'>
          <h1 className='font-semibold'>Search by title</h1>
          <div className='space-x-2 rounded '><input type="text" placeholder="Search by title..."
            className='border rounded bg-gray-300' value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)} />
            <button className='rounded  px-3 bg-red-500 text-white' onClick={() => {
              setSearchTitle("")
              setFilteredExpenses(expenses)
            }}>Clear</button>
          </div>
        </div>
        {
          filteredExpenses.length ? <>
            {filteredExpenses.map((expense) => (
              <div key={expense._id} className="p-4 border rounded-lg mb-3">
                <div>

                  <h2 className="font-semibold"><b>Title: </b>{expense.title}</h2>
                  <p><b>Amount: </b>{expense.amount}</p>
                  <p><b>Created_At: </b>{formatDate(expense.date)}</p>
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
          </> : <div>No Expense</div>
        }

      </div>
    </>
  )
}

export default AllExpenses