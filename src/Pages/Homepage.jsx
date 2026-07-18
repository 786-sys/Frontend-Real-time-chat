import React, { use, useEffect } from "react";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Rightsider from "../components/Rightsider";
import Chatbox from "../components/Chatbox";
import Blankchat from "../components/Blankchat";
import socket from "../Socket/socket.js";
import Swal from "sweetalert2";
const Homepage = ({
  responsive,
  array,
  setarray,
  itemuser,
  setitemuser,
  curr,
  setcurr
}) => {
  const [selectedUser, setselectedUser] = useState(false);
  const [isonline, setisonline] = useState([]);
  const [msglist, setmsglist] = useState([]);
  const [isread, setisread] = useState(false);
  const [data, setdata] = useState([]);
  
   
  const Display = async () => {
    console.log("Display function called");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/DisplayList`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      console.log(response);
      if (response.ok) {
        const resp = await response.json();
        console.log(resp.data);
        console.log(resp.message);
        console.log(resp.data.length);
        setarray(resp.data);
      }
    } catch (err) {
      console.log("fetching the list problem " + err);
    }
  };
  useEffect(() => {
    Display();
  }, []);
   const GetUserProfile = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/getUserProfile`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        const resp = await response.json();
        console.log(
          "user profile at app.jsx " +
            resp.user.fullname +
            " " +
            resp.user.description+" "+resp.user._id
        );
        setcurr(resp.user);
      }
      console.log(response.statusText);
    } catch (err) {
      console.log("getting user profile problem  " + err);
    }
  };
  useEffect(() => {
    GetUserProfile();
  },[]);

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
                    ${selectedUser ? "max-sm:-translate-x-full max-sm:hidden" : "max-sm:translate-x-0 max-sm:w-full"}`}
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
            data={data}
            setdata={setdata}
          />
        </div>

        {/* Chat / Blank View Container */}
        <div
          className={`flex-1 flex flex-row transition-all duration-300 ease-in-out
                        ${selectedUser ? "max-sm:translate-x-0" : "max-sm:translate-x-full max-sm:hidden"}`}
        >
          {selectedUser ? (
            <div className="flex flex-row flex-1">
              <Chatbox
                responsive={responsive}
                setselectedUser={setselectedUser}
                useritem={itemuser}
                curr={curr}
                msglist={msglist}
                setmsglist={setmsglist}
                data={data}
                setdata={setdata}
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
