import React, { useEffect } from "react";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Rightsider from "../components/Rightsider";
import Chatbox from "../components/Chatbox";
import Blankchat from "../components/Blankchat";
import socket from "../Socket/socket.js";

const Homepage = ({ array, itemuser, setitemuser, curr }) => {
  const [selectedUser, setselectedUser] = useState(false);
  const [isonline, setisonline] = useState([]);
  const [msglist, setmsglist] = useState([]);

  useEffect(() => {
    // 🔹 online users list
    socket.on("online-users", (users) => {
      setisonline(users);
    });
    return () => {
      socket.off("online-users");
    };
  }, [curr?._id || itemuser?._id]);
  console.log("homepage re rendered " + selectedUser);

  return (
    <div className="w-full h-screen bg-slate-900 p-0 sm:p-6">
  <div
    className="
      flex h-full mx-auto max-w-7xl
      backdrop-blur-xl bg-black/30
      border border-gray-700 rounded-none sm:rounded-2xl
      overflow-hidden
    "
  >
    {/* ================= SIDEBAR ================= */}
    <div
      className={`
        ${selectedUser ? "hidden sm:flex" : "flex"}
        w-full sm:w-72
        border-r border-gray-700
      `}
    >
      <Sidebar
        list={array}
        isonline={isonline}
        setisonline={setisonline}
        useritem={itemuser}
        curr={curr}
        setid={setitemuser}
        user={selectedUser}
        setuser={setselectedUser}
      />
    </div>

    {/* ================= MAIN CHAT AREA ================= */}
    {selectedUser ? (
      <div className="flex flex-1 h-full">
        {/* CHATBOX */}
        <div className="flex flex-1 flex-col">
          <Chatbox
            useritem={itemuser}
            curr={curr}
            msglist={msglist}
            setmsglist={setmsglist}
            onBack={() => setselectedUser(false)} // mobile back
          />
        </div>

        {/* RIGHT SIDEBAR (Desktop only) */}
        <div className="hidden lg:flex w-80 border-l border-gray-700">
          <Rightsider useritem={itemuser} msglist={msglist} />
        </div>
      </div>
    ) : (
      <div className="hidden sm:flex flex-1">
        <Blankchat setuser={setselectedUser} />
      </div>
    )}
  </div>
</div>

  );
};

export default Homepage;
