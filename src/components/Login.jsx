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
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
      <div className="border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg">
        <h2 className="font-medium text-2xl flex justify-between items-center">
          Log in
        </h2>
        {!isField ? "Fields are compulsory for Login" : ""}

        <input
          className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
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
          className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
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
          className="py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer"
        >
          {loading?<p>Logging in...</p>:<p>Login </p>}
        </button>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <input type="checkbox" required />
          <p>Agree to terms and condition apply</p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-600 gap-2">
            Already have an account
            <span
              onClick={() => {
                setsigntrue(true);
              }}
              className="font-medium text-white cursor-pointer mx-2"
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
