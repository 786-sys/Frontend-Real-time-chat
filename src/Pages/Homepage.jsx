import React, { useEffect } from "react";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Rightsider from "../components/Rightsider";
import Chatbox from "../components/Chatbox";
import Blankchat from "../components/Blankchat";
import socket from "../Socket/socket.js";

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
    <div className={`border w-full h-screen sm:py-[15%] sm:py-[15%]`}>
      <div
        className={`flex flex-row absolute inset-[10%] 
                  backdrop-blur-xl bg-black/30
                  border-2 border-gray-600 rounded-2xl
                  overflow-hidden`}
      >
        <div
          className={`${
            responsive && !selectedUser && "w-[100%]"
          } ${responsive && selectedUser && "hidden"} md:w-[30%] max-sm:w-[100%]`}
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
        {selectedUser ? (
          <div
            className={`flex flex-row flex-1 ${
              responsive && selectedUser && "visible"
            }`}
          >
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
          <>
            {/* {!selectedUser && !responsive && (
              <div className={`w-full h-full`}>
                <Blankchat setuser={setselectedUser} />
              </div>
            )} */}
              <div className={`w-full h-full ${responsive && "hidden"}`}>
                <Blankchat className={`sm:hidden`} setuser={setselectedUser} />
              </div>
       
          </>
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
{
  /* <Sidebar
              responsive={responsive}
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
                responsive={responsive}
                  useritem={itemuser}
                  curr={curr}
                  msglist={msglist}
                  setmsglist={setmsglist}
                />
                <Rightsider responsive={responsive} useritem={itemuser} msglist={msglist} />
              </div>
            ) : (
              <Blankchat responsive={responsive} setuser={setselectedUser} />
            )} */
}
