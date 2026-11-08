
import React, { useState } from "react";

function SignupPage() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

         const signupData = {
        name: name,
        email: email,
        password: password,
        gender: gender
    };

        try {
            const res = await fetch(
                "http://127.0.0.1:8080/auth/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(signupData)
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Signup failed");
            }

            console.log(data);
            alert("Signup Successful!");

            setName("");
            setEmail("");
            setPassword("");
            setGender("");

        } catch (error) {
            console.log("Error:", error);
            alert(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-4"
            >

                <h2 className="text-2xl font-bold text-center">
                    Signup Form
                </h2>

                <label htmlFor="">Name*</label>
                <input
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full border p-3 rounded-lg"
                />
                <label htmlFor="">Email*</label>
                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border p-3 rounded-lg"
                />
                <label htmlFor="">Password*</label>
                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={6}
                    required
                    className="w-full border p-3 rounded-lg"
                />
                <label htmlFor="">gender</label>
                <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                    className="w-full border p-3 rounded-lg"
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 cursor-pointer"
                >
                    Sign Up
                </button>

            </form>
        </div>
    );
}

export default SignupPage;
