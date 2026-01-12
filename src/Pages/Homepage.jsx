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
  const [responsive, setresponsive] = useState(true);

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
    <div className={`border w-full h-screen sm:py-[15%] sm:py-[15%]`}>
      <div
        className={`flex flex-row absolute inset-[10%] 
                  backdrop-blur-xl bg-black/30
                  border-2 border-gray-600 rounded-2xl
                  overflow-hidden`}
      >
        
    <div className="w-full md:w-[30%]">
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

        {/* Chat + Right panel */}
        {selectedUser ? (
          <div className="flex flex-col md:flex-row flex-1">
            {/* Mobile Back Button */}
            <div className="flex items-center p-2 md:hidden">
              <button
                onClick={() => setselectedUser(false)}
                className="px-3 py-1 rounded bg-gray-700 text-white"
              >
                ← Back
              </button>
            </div>

            {/* Chatbox */}
            <div className="w-full">
              <Chatbox
                useritem={itemuser}
                curr={curr}
                msglist={msglist}
                setmsglist={setmsglist}
              />
            </div>

            {/* Rightsider (desktop only) */}
            <div className="hidden md:block md:w-[25%]">
              <Rightsider useritem={itemuser} msglist={msglist} />
            </div>
          </div>
        ) : (
          /* Blankchat (desktop only) */
          <div className="hidden md:flex flex-1">
            <Blankchat setuser={setselectedUser} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
{
  /* {
          responsive?<>
           {
            selectedUser?<>
             <div className="flex flex-row flex-1">
              <button>
                <img onClick={()=>{setselectedUser(false)}} className="w-[20px]" src="https://www.vhv.rs/dpng/d/244-2446391_black-previous-button-png-transparent-image-arrow-png.png" alt="" />
              </button>
            <Chatbox useritem={itemuser} curr={curr} msglist={msglist} setmsglist={setmsglist} />
          </div>  
            </>: */
}
