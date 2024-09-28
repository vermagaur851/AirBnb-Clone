import React, { useContext } from "react";
import { useState } from "react";
import { Link, Navigate} from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";

function LoginPages() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const {setUser} = useContext(UserContext)
  async function loginUser(e) {
    e.preventDefault();
    try {
      const {data} = await axios.post(
        "/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      setUser(data || null);
      alert("Login Successfull");
      setRedirect(true);
    } catch (error) {
      console.log(error);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64 ">
        <h1 className="text-4xl text-center ">Login</h1>
        <form className="max-w-md mx-auto border" onSubmit={loginUser}>
          <input
            type="email"
            placeholder="your@gmail.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary">login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?
            <Link className="underline text-black p-1" to={"/register"}>
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPages;
