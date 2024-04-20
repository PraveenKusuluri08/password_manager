import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  let token = localStorage.getItem("token");

  if (token) {
    window.location.href = "/";
  }

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    axios.post("http://localhost:5000/login",user).then((res)=>{
      console.log("res",res);
      localStorage.setItem("token",res.data.token);
      localStorage.setItem("user",JSON.stringify(res.data.user))
      window.location.href = "/";
    })
  };

  return (
    <div className="flex justify-center items-center content-center h-full">
        
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 items-center justify-center content-center h-full">
        <div className="pb-4 font-bold text-2xl">Login</div>
        <div className="mb-4 w-96 ">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="******************"
          />
          {user.password === "" ? (
            <p className="text-red-500 text-xs italic">
              Please choose a password.
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
          onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Sign In
          </button>
          <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/register">
        User Register
      </a>
          <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/masterlogin">
        Master Login
      </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
