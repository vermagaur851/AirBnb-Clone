import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function registerUser(e) {
    e.preventDefault();
    try {
      const res = await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("Registration Successfull. Now you can log in");
      return <Navigate to={"/login"} />;
    } catch (error) {
      alert(error.response.data);
      return;
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64 ">
        <h1 className="text-4xl text-center ">Register</h1>
        <form className="max-w-md mx-auto border" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Bhupender Jogi"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <input
            type="email"
            placeholder="gajodhar@gmail.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already have an account?
            <Link className="underline text-black p-1" to={"/login"}>
              Login now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
