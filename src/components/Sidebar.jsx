import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import logi from "../assets/logo.jpg";
import socket from "../Socket/socket.js";
import dots from "../assets/dots.jpg";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";

import notificationSound from "../assets/mixkit-elevator-tone-2863.wav"; // Import the notification sound file
// setid is setuseritem
const Sidebar = ({
  list,
  isonline,
  setisonline,
  useritem,
  curr,
  setid,
  setuser,
  msglist,
  data,
  setdata,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredList, setFilteredList] = useState(false);
  const [searchperson, setSearchperson] = useState("");
  const [highlight, setHighlight] = useState(null);
  const [Count, setCount] = useState(0);
  const navigate = useNavigate();
  const changing = (e) => {
    setFilteredList(!filteredList);
    setSearchperson(e.target.value);
  };
  useEffect(() => {
    // 🔹 online users list
    socket.on("online-users", (users) => {
      setisonline(users);
    });
    return () => {
      socket.off("online-users");
    };
  }, []);
  useEffect(() => {
    if (
      String(data[0]?.senderId) === String(useritem?._id) ||
      String(data[0]?.receiverId) === String(useritem?._id)
    ) {
      setHighlight(null);
      // playNotification();
      alert("You have a new message from " + useritem?.fullname);
    } else {
      
      setCount(data.length == 0 ? 0 : data.length);
      setHighlight(data[0]?.senderId || data[0]?.receiverId);
      
    }
    if(data.length > 0){
      playNotification();
    }

  }, [data]);
  //i want to write for backend api for wheter the message is read or not and then i will use that api in the frontend to set the read state to true or false
  const handleRead = async (senderId, receiverId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/message/markAsRead`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            senderId: senderId,
            receiverId: receiverId,
          }),
        },
      );
      if (response.ok) {
        const resp = await response.json();
        console.log("Message marked as read: ", resp);
        setHighlight(null);
        setCount(0);
        setdata([]); // Clear the data state after marking messages as read
      }
    } catch (err) {
      console.log("Error marking message as read: " + err);
    }
  };
  const playNotification = () => {
    const audio = new Audio(notificationSound);
    audio.volume = 0.5; // 0.0 - 1.0
    audio.play().catch((err) => console.log(err));
  };
  async function LOGOUT() {
    const isConfirmed = await Swal.fire({
      title: "Are you sure?",
      text: "You want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });
    console.log("isConfirmed value: ", isConfirmed);
    if (isConfirmed.isConfirmed) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/logout`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          },
        );
        if (response.ok) {
          const resp = await response.json();
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
        console.log(" Logout problem ho rha h " + err);
      }
    } else {
      console.log("User clicked NO");
    }
  }

  const filteredUsers = list.filter((item) =>
    item.fullname.toLowerCase().includes(searchperson.toLowerCase()),
  );
  return (
    <div className="h-full flex flex-col bg-black/20 backdrop-blur-md">
      {/* Header */}
      <div className="p-4 space-y-4 border-b border-white/5">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <img src={logo} alt="logo" className="h-8 w-auto" />
            <h1 className="text-white font-bold text-xl hidden sm:block">
              Chats
            </h1>
          </div>

          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <img
                src={dots}
                alt="menu"
                className="h-5 w-5 invert opacity-70"
              />
            </button>

            {isOpen && (
              <div className="absolute right-0 top-12 bg-[#1a1a1a] text-white border border-white/10 rounded-xl shadow-2xl w-48 z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
                <div
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/profile");
                  }}
                  className="px-4 py-3 hover:bg-white/5 cursor-pointer flex items-center gap-3 transition-colors border-b border-white/5"
                >
                  <span className="text-sm">Edit Profile</span>
                </div>
                <div
                  onClick={() => {
                    setIsOpen(false);
                    LOGOUT();
                  }}
                  className="px-4 py-3 hover:bg-red-500/20 text-red-400 cursor-pointer flex items-center gap-3 transition-colors"
                >
                  <span className="text-sm">Logout</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="relative group">
          <input
            value={searchperson}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white text-sm outline-none focus:ring-2 focus:ring-violet-500/50 transition-all placeholder-gray-500"
            type="text"
            placeholder="Search messages or people"
            onChange={changing}
          />
        </div>
      </div>

      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto px-2 py-4 space-y-1 custom-scrollbar">
        {list.length !== 0 && !filteredList ? (
          <div className="space-y-1">
            {list.map((item, index) => (
              <div
                key={item._id || index}
                onClick={() => {
                  setuser(true);
                  setid(item);
                  handleRead(curr?._id, item?._id);
                }}
                className={`flex items-center gap-4 p-3 rounded-2xl cursor-pointer transition-all duration-200 group
                  ${
                    highlight === item._id
                      ? "bg-violet-600/20 border-white/10"
                      : "hover:bg-white/5 border-transparent"
                  } border ${highlight === item._id ? `border-green-500 text-black  text-white ` : ""}`}
              >
                <div className="relative flex-shrink-0">
                  <img
                    className="w-12 h-12 rounded-full object-cover border border-white/10"
                    src={item?.avatar || logi}
                    alt={item.fullname}
                  />
                  {isonline.includes(item._id) && (
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-[#1a1a1a] rounded-full" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <h3
                      className={`font-semibold text-sm truncate ${highlight === item._id ? "text-violet-400" : "text-white"}`}
                    >
                      {item.fullname}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-400 truncate">
                    {isonline.includes(item._id) ? "Active now" : "Offline"}
                  </p>
                </div>
                <div>
                  {Count > 0 && highlight === item._id && (
                    <span className="flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                      {Count}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : list.length !== 0 && filteredList ? (
          <div className="space-y-1">
            {filteredUsers.map((item, index) => (
              <div
                key={item._id || index}
                onClick={() => {
                  setHighlight(item._id);
                  setuser(true);
                  setid(item);
                }}
                className={`flex items-center gap-4 p-3 rounded-2xl cursor-pointer transition-all duration-200
                  ${highlight === item._id ? "bg-violet-600/20" : "hover:bg-white/5"}`}
              >
                <div className="relative">
                  <img
                    className="w-12 h-12 rounded-full object-cover border border-white/10"
                    src={item?.avatar || logi}
                    alt={item.fullname}
                  />
                  {isonline.includes(item._id) && (
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-[#1a1a1a] rounded-full" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium text-sm truncate">
                    {item.fullname}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {isonline.includes(item._id) ? "Active now" : "Offline"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full opacity-40">
            <p className="text-white text-sm">No conversations yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
