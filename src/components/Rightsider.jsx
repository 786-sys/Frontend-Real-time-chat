import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg"

const Rightsider = ({responsive,useritem, msglist}) => {
  const LOGOUT = async () => {
    const isConfirmed = confirm("Are you sure you want to continue?");

    if (isConfirmed) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/logout`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        if (response.ok) {
          const resp = await response.json();
          alert("response logout ho gya " + resp.message);
          navigate("/");
        } else {
          alert("logout failed");
        }
      } catch (err) {
        console.log(" Logout problem ho rha h " + err);
      }
    } else {
      console.log("User clicked NO");
    }
  };
    const navigate = useNavigate();
  return (
    <div className='w-[40%] bg-[#8185B2]/10 text-white w-full relative max-md:hidden'>
  
  {/* NEW FLEX WRAPPER */}
  <div className="flex flex-col h-full overflow-y-scroll">

    <div className='pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto'>
      <img
        src={useritem?.avatar || logo}
        className='max-w-[110px] rounded-lg object-cover shadow'
        alt=""
      />
      <h1 className='px-10 text-xl font-medium mx-auto flex items-center gap-2'>
        {useritem?.fullname}
      </h1>
      <p className='px-10 mx-auto'>{useritem?.description}</p>
    </div>

    <hr className='border-[#ffffff50] my-4' />

    <div className='px-5 text-xs'>
      <p>Media</p>
      <div className='flex flex-row flex-wrap gap-2 mt-2'>
        {msglist.map((item, index) => {
          if (item.type === 'image') {
            return (
              <img
                key={index}
                src={item.content}
                alt="media"
                className='w-16 h-16 object-cover rounded-lg m-1'
              />
            );
          }
        })}
      </div>
    </div>

    {/* ✅ STICKS TO BOTTOM */}
    <div className="flex justify-center items-center mt-auto py-4 text-xs text-gray-400">
      <button className="px-3 py-1 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer">
        <div
          onClick={LOGOUT}
          className="px-4 py-2 cursor-pointer"
        >
          Logout
        </div>
      </button>
    </div>

  </div>
</div>

  )
}

export default Rightsider
