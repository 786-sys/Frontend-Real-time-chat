import React, { use, useEffect } from "react";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Rightsider from "../components/Rightsider";
import Chatbox from "../components/chatbox";
import Blankchat from "../components/Blankchat";
import socket from "../Socket/socket.js";
import Swal from "sweetalert2";
const Homepage = ({responsive, array, itemuser, setitemuser, curr }) => {
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
    <div className="w-full h-screen flex items-center justify-center sm:p-4 md:p-8 lg:p-12 overflow-hidden">
      <div
        className="flex flex-row w-full h-full max-w-7xl 
                  backdrop-blur-2xl bg-black/40
                  sm:border sm:border-white/10 sm:rounded-2xl
                  overflow-hidden shadow-2xl relative animate-in fade-in duration-500"
      >
        {/* Sidebar Container */}
        <div
          className={`md:w-[30%] lg:w-[25%] border-r border-white/5 transition-all duration-300 ease-in-out
                    ${selectedUser ? 'max-sm:-translate-x-full max-sm:hidden' : 'max-sm:translate-x-0 max-sm:w-full'}`}
        >
          <Sidebar
            list={array}
            isonline={isonline}
            setisonline={setisonline}
            useritem={itemuser}
            curr={curr}
            setid={setitemuser}
            setuser={setselectedUser}
            msglist={msglist}
          />
        </div>

        {/* Chat / Blank View Container */}
        <div className={`flex-1 flex flex-row transition-all duration-300 ease-in-out
                        ${selectedUser ? 'max-sm:translate-x-0' : 'max-sm:translate-x-full max-sm:hidden'}`}>
          {selectedUser ? (
            <div className="flex flex-row flex-1">
              <Chatbox
                responsive={responsive}
                setselectedUser={setselectedUser}
                useritem={itemuser}
                curr={curr}
                msglist={msglist}
                setmsglist={setmsglist}
              />
              <Rightsider
                responsive={responsive}
                useritem={itemuser}
                msglist={msglist}
              />
            </div>
          ) : (
            <div className="max-sm:hidden w-full h-full">
              <Blankchat />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
