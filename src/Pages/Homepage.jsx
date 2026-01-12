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
  const [responsive, setresponsive] = useState(window.innerWidth < 768);

  useEffect(() => {
    socket.on("online-users", (users) => {
      setisonline(users);
    });
    return () => {
      socket.off("online-users");
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setresponsive(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="border w-full h-screen sm:py-[15%]">
      <div
        className={`flex flex-row absolute inset-[10%] 
        backdrop-blur-xl bg-black/30
        border-2 border-gray-600 rounded-2xl
        overflow-hidden`}
      >
        {responsive ? (
          <>
            {selectedUser ? (
              <div className="flex flex-row flex-1">
                <button onClick={() => setselectedUser(false)}>
                  ←
                </button>
                <Chatbox
                  useritem={itemuser}
                  curr={curr}
                  msglist={msglist}
                  setmsglist={setmsglist}
                />
              </div>
            ) : (
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
            )}
          </>
        ) : (
          <>
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

            {selectedUser ? (
              <div className="flex flex-row flex-1">
                <Chatbox
                  useritem={itemuser}
                  curr={curr}
                  msglist={msglist}
                  setmsglist={setmsglist}
                />
                <Rightsider useritem={itemuser} msglist={msglist} />
              </div>
            ) : (
              <Blankchat setuser={setselectedUser} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Homepage;
