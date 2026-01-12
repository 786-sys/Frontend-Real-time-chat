import React, { useState } from "react";

const Login = ({ Log,loading,setloading, setsigntrue, email, password }) => {
  const [isField, setisField] = useState(true);

  const checkfield = () => {
    
    if (email.email.trim() === "" || password.password.trim() === "") {
      setisField(false);
      return;
    }
    setloading(true);
    console.log(email.email +" "+password.password)
     Log();
  };
  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 md:justify-evenly px-4 md:px-0 backdrop-blur-2xl">
      <div className="border-2 w-full max-w-md bg-white/8 text-white border-gray-500 p-4 md:p-6 flex flex-col gap-4 md:gap-6 rounded-lg shadow-lg">
        <h2 className="font-medium text-xl md:text-2xl flex justify-between items-center">
          Log in
        </h2>
        {!isField ? <p className="text-xs md:text-sm text-red-400">Fields are compulsory for Login</p> : ""}

        <input
          className="w-full p-2 md:p-3 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black text-sm md:text-base"
          value={email.email}
          type="email"
          onChange={(e) => {
            email.setemail(e.target.value);
            setisField(true);
          }}
          required
          placeholder="email"
        />
        <input
          className="w-full p-2 md:p-3 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black text-sm md:text-base"
          value={password.password}
          type="password"
          onChange={(e) => {
        password.setpassword(e.target.value)
        setisField(true);
          }}
          required
          placeholder="password"
        />
        <button 
          onClick={()=>{checkfield()}}
          className="py-2 md:py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer text-sm md:text-base hover:opacity-90"
        >
          {loading?<p>Logging in...</p>:<p>Login </p>}
        </button>
        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
          <input type="checkbox" required />
          <p>Agree to terms and condition apply</p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-xs md:text-sm text-gray-600 gap-2">
            Don't have an account?
            <span
              onClick={() => {
                setsigntrue(true);
              }}
              className="font-medium text-white cursor-pointer mx-1 md:mx-2 hover:opacity-80"
            >
              Sign here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
