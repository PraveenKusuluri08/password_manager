import { useState } from "react";
import axios from "axios"
const Register = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  let token = localStorage.getItem("token");

  if(token){
    window.location.href="/"
  }

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister=(e)=>{
    e.preventDefault();
    console.log(user);
    axios
      .post("http://localhost:5000/register", user).then((response)=>{
         console.log(response.data);
        alert(response.data.message);
        window.location.href="/login"
      }).catch((error)=>{
        console.log(error);
      })
  }

  console.log(user);

  return (
    <div className="flex justify-center items-center content-center h-full">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 items-center justify-center content-center h-full">
        <div className="pb-4 font-bold text-2xl">Register</div>
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
          onClick={handleRegister}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Signup
          </button>

          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="/login"
          >
           User Signin
          </a>
          <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/masterlogin">
        Master Login
      </a>
        </div>
      </form>
    </div>
  );
};

export default Register;
