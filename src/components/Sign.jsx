import React, { useState } from "react";
import Desc from "./Desc";
import toast from "react-hot-toast";
const Sign = ({ register,setsigntrue ,fullname,email,password , description}) => {
  
  const [isdesc,setisdesc]=useState(false);
  const dekhozara=async(e)=>{
           if (
      fullname.fullname.trim() === "" ||
      email.email.trim() === "" ||
      password.password.trim() === "" 
    ) {
      alert("Please fill all fields first");
      return;
    }

    // ✅ move to next page ONLY if valid
    setisdesc(true);
  }
  return (
    <div 
      className="border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg"
    >
      {!isdesc  ? <>
      <h2 className="font-medium text-2xl flex justify-between items-center">
        Sign up
        {/* {fullname.fullname  +" "+email.email+" "+password.password} */}
      </h2>
        <input
        className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
        type="text"
        onChange={(e)=>{fullname.setfullname(e.target.value)}}
        required
        placeholder="Fullname"
        value={fullname.fullname}
      />
      <input
        className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
        type="email"
        onChange={(e) => {
          email.setemail(e.target.value);
        }}
        required
        placeholder="email"
        value={email.email}
      />
      <input
        className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
        type="password"
        onChange={(e) => {
          password.setpassword(e.target.value);
        }}
        required
        placeholder="password"
        value={password.password}
      />
      <button onClick={(e)=>{dekhozara(e)}} className="py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer">
        Create Accoutnt 
      </button>
      </>
      :
    <>
      <div className="flex flex-row item-center justify-between">
        <h2 className="font-medium text-2xl flex justify-between items-center">
        Sign up
      </h2>
      
      <img onClick={()=>{setisdesc(false)}} className="w-5 cursor-pointer" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAABCCAYAAAACPxW5AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxEAAAsRAX9kX5EAAAH7SURBVGhD7dq/SsNQFMfxJnYQHBxKUereIV2d3ARxc+sTCILgQ/QpdBKfIEgnH8HZoQ0FZ0cn8c9QuN5fORERmya5f865cL9LuJcM+ZBwh0M6sVgsFoutb4uuIppMJulgMOjNZrMP2jIupauEkvl8fr1cLh/H4/EB7RmX0JW7RKNukiS5pPWzUuo4z/MXWrdOAvAvrswKkhu4DldmjOQEbsKVGSFZTlGclv1+/1bjLmirqp6+7yzLsvuiKN5or3Ycp+jqtNQPfU7rjek3+K5P1y9aNsr3J1r3s/xJ45407mQ6nb7SVqN8Ar3jkC8gCw75ALLhkGsgKw65BLLjkCugCBxyARSDQ7aBonDIJlAcDtkCisQhG0CxOGQKFI1DJkDxONQWGAQOtQEGg0NNgUHhUBNgcDgkafDrpEZDp6IoHrIs29Nv8ZC2KtP37adpejocDvPFYvFJ215rPFULDdlqbBgSsvVcNBSk0eA3BKQREElHGgORZKQVIJKKtAZEEpFWgUga0joQSUI6ASIpSGdAJAHpFIi4kc6BiBPpBYi4kN6AiAPpFYh8IzlGFmo0Gl0ppe5ovTGN3Ol2u9u0bJTJ4Ne0ukOs8H4EKqvxuRr/ysUKRBVIKz/jsQPRP0grOCQCiH4hd23hkKTB7+p01aflkS1cLBaLxWKVdTrf5kX+OXj25HwAAAAASUVORK5CYII=" alt="" />
      </div>
            <Desc description={description} register={register} isdesc={isdesc} setisdesc={setisdesc}/>
      </>
      }
     
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <input type="checkbox" required />
        <p>Agree to terms and condition apply</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-gray-600">
          Already have an account
          <span
            onClick={() => {
              setsigntrue(false);
            }}
            className="font-medium text-white cursor-pointer m-2"
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Sign;
