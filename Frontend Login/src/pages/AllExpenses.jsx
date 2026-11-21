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
      
<div className="w-full max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-6">

  <h1 className="text-2xl sm:text-3xl text-center font-bold mb-5">
    All Expenses
  </h1>

  {/* Summary Cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">

    <div className="border rounded-xl p-4 flex justify-between items-center gap-3">
      <h1 className="font-semibold text-base sm:text-xl">
        Total Expense
      </h1>
      <h1 className="font-semibold text-lg sm:text-xl break-all">
        ₹{totalExpense}
      </h1>
    </div>

    <div className="border rounded-xl p-4 flex flex-col gap-2">
      <h1 className="font-semibold text-base sm:text-xl">
        Monthly Expense
      </h1>

      <input
        type="month"
        className="border rounded-lg p-2 w-full"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      />

      <h1 className="font-semibold text-lg sm:text-xl">
        ₹{monthlyTotal}
      </h1>
    </div>

  </div>

  {/* Filter by Date */}
  <div className="border rounded-xl p-3 sm:p-4 mb-4">
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">

      <h1 className="font-semibold">Filter by date</h1>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <input
          type="date"
          className="border rounded-lg p-2 w-full sm:w-auto"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        <button
          className="rounded-lg px-4 py-2 bg-red-500 text-white w-full sm:w-auto"
          onClick={() => {
            setSelectedDate("");
            setFilteredExpenses(expenses);
          }}
        >
          Clear
        </button>
      </div>

    </div>
  </div>

  {/* Search by Title */}
  <div className="border rounded-xl p-3 sm:p-4 mb-5">
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">

      <h1 className="font-semibold">Search by title</h1>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <input
          type="text"
          placeholder="Search by title..."
          className="border rounded-lg p-2 w-full sm:w-64"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />

        <button
          className="rounded-lg px-4 py-2 bg-red-500 text-white w-full sm:w-auto"
          onClick={() => {
            setSearchTitle("");
            setFilteredExpenses(expenses);
          }}
        >
          Clear
        </button>
      </div>

    </div>
  </div>

  {/* Expense List */}
  {filteredExpenses.length ? (
    <div className="space-y-3">
      {filteredExpenses.map((expense) => (
        <div
          key={expense._id}
          className="p-3 sm:p-4 border rounded-xl shadow-sm"
        >
          <div className="space-y-1 break-words">
            <h2 className="font-semibold text-base sm:text-lg">
              <b>Title:</b> {expense.title}
            </h2>

            <p className="text-sm sm:text-base">
              <b>Amount:</b> ₹{expense.amount}
            </p>

            <p className="text-sm sm:text-base">
              <b>Created At:</b> {formatDate(expense.date)}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 mt-4">

            <Link
              className="rounded-lg px-3 py-1.5 bg-indigo-600 text-white text-sm"
              to={`/expense/${expense._id}`}
            >
              Details
            </Link>

            <Link
              className="rounded-lg px-3 py-1.5 bg-green-600 text-white text-sm"
              to={`/expense/update/${expense._id}?title=${expense.title}&amount=${expense.amount}&description=${expense.description}&date=${expense.date}`}
            >
              Edit
            </Link>

            <button
              className="rounded-lg px-3 py-1.5 bg-red-600 text-white text-sm"
              onClick={() => DeleteExpenseById(expense._id)}
            >
              Delete
            </button>

          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="text-center border rounded-xl p-6 text-gray-500">
      No Expense
    </div>
  )}

</div>

    </>
  )
}

export default AllExpenses