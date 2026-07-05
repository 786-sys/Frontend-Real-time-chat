import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg"
import Swal from "sweetalert2";
const Rightsider = ({responsive,useritem, msglist}) => {
  const LOGOUT = async () => {

    const isConfirmed = await Swal.fire({
          title: "Are you sure?",
          text: "You want to logout?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        });
    if (isConfirmed.isConfirmed) {
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
          const resp = await response.json()
          await Swal.fire({
                      icon: "success",
                      title: "Logged Out Successfully",
                      showConfirmButton: false,
                      timer: 1500,
                    });
          navigate("/");
        } else {
          await Swal.fire({
            icon: "error",
            title: "Logout Failed",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (err) {
        await Swal.fire({
          icon: "error",
          title: "Connection error",
          showConfirmButton: false,
          timer: 1500,
        })
      }
    } else {
      console.log("User clicked NO");
    }
  };
    const navigate = useNavigate();
  return (
    <div className="w-[30%] lg:w-[25%] bg-black/30 border-l border-white/5 text-white relative max-md:hidden overflow-hidden">
      <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
        <div className="pt-12 flex flex-col items-center gap-4 px-6 text-center">
          <div className="relative">
            <img
              src={useritem?.avatar || logo}
              className="w-24 h-24 rounded-2xl object-cover shadow-2xl border-2 border-white/10"
              alt={useritem?.fullname}
            />
          </div>
          <div className="space-y-1">
            <h1 className="text-xl font-bold text-white tracking-tight">
              {useritem?.fullname}
            </h1>
            <p className="text-xs text-gray-400 leading-relaxed px-4">
              {useritem?.description || "No bio yet"}
            </p>
          </div>
        </div>

        <div className="mt-8 px-6">
          <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Media Shared</h3>
          <div className="grid grid-cols-3 gap-2">
            {msglist.filter(item => item.type === 'image').slice(0, 9).map((item, index) => (
              <img
                key={index}
                src={item.content}
                alt="media"
                className="aspect-square w-full object-cover rounded-lg border border-white/5 hover:opacity-80 transition-opacity cursor-pointer"
              />
            ))}
            {msglist.filter(item => item.type === 'image').length === 0 && (
              <p className="col-span-3 text-[10px] text-gray-600 italic text-center py-4">No media shared yet</p>
            )}
          </div>
        </div>

        <div className="mt-auto p-6">
          <button 
            onClick={LOGOUT}
            className="w-full py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold rounded-xl border border-red-500/20 transition-all active:scale-[0.98]"
          >
            Logout session
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rightsider
