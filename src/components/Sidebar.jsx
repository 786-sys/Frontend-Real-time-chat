import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import socket from "../Socket/socket.js";
import { Navigate, useNavigate } from "react-router-dom";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
const Sidebar = ({
  list,
  isonline,
  setisonline,
  useritem,
  curr,
  setid,
  user,
  setuser,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredList, setFilteredList] = useState(false);
  const [searchperson, setSearchperson] = useState("");
  const [highlight,setHighlight]=useState(null);
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

  const LOGOUT = async () => {
    const isConfirmed = confirm("Are you sure you want to continue?");

    if (isConfirmed) {
      try {
        const response = await fetch(
          `${process.env.backend_url}/api/v1/user/logout`,
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

  const filteredUsers = list.filter((item) =>
    item.fullname.toLowerCase().includes(searchperson.toLowerCase())
  );
  return (
    <div className="p-5 w-[30%] h-full flex flex-col">
      {/* Header */}
      <div className="py-5 px-3">
        <div>
          <div className="flex flex-row text-white justify-between">
            <div className="flex flex-row gap-2">
              <img
                src={logo}
                alt="logo"
                className="h-[35px]"

              />
            </div>
            <img
              src="./src/assets/dots.jpg"

              onMouseOver={() => {
                setIsOpen(!isOpen);
              }}
              alt="menu"
              className="h-[20px] rounded-[30px] cursor-pointer"
            />
            {isOpen && (
              <div className="absolute right-[950px] top-12 bg-black text-white border border-gray-600 rounded-lg shadow-lg w-40">
                <div
                  onClick={() => {
                    navigate("/profile");
                  }}
                  className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                >
                  {" "}
                  Edit Profile{" "}
                </div>
                <div
                  onClick={() => {
                    LOGOUT();
                  }}
                  className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                >
                  {" "}
                  Logout{" "}
                </div>{" "}
              </div>
            )}
          </div>
        </div>
        <div>
          <input
            value={searchperson}
            className="bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8] flex-1"
            type="text"
            placeholder="Search"
            onChange={(e) => {
              changing(e);
            }}
          />
        </div>
      </div>

      {/* Scrollable list */}
      <div
        className="text-white p-5 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-violet-600 scrollbar-track-gray-800 mt-4 space-y-2"
      >
        {list.length !== 0 && !filteredList ? (
          <div>
            <label htmlFor="item">
              {list.map((item, index) => {
                return (
                  <div
                    onClick={() => {
                      highlight===item._id?`${setHighlight(null)}}`:setHighlight(item._id);
                      setuser(!user);  
                      setid(item);
                    }}
                    id="item"
                    key={index} 
                    className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm false hover:bg-gray-700 ${highlight===item._id?'bg-gray-700':''}`} 
                  >
                    <img
                      className="w-[35px] aspect-[1/1] rounded-full"
                      src={item?.avatar || "/src/assets/logo.jpg"}
                      alt=""
                    />

                    <div>
                      <h3 className="flex item-center justify-start gap-2">
                        {item.fullname}
                        <div>
                          {isonline.includes(item._id) ? (
                            <span className="text-green-400 text-ls">●</span>
                          ) : (
                            <span className="text-gray-400 text-ls">●</span>
                          )}
                        </div>
                      </h3>
                      <span className="text-neutral-400 text-xs">
                        {isonline.includes(item._id) ? "Online" : "Offline"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </label>
          </div>
        ) : (
          " "
        )}
        {list.length !== 0 && filteredList ? (
          <div>
            <label htmlFor="item">
              {filteredUsers.map((item, index) => {
                // if (searchperson === item.name) {
                return (
                  <div
                    onClick={() => {

                      setuser(true);
                      setid(item);
                    }}
                    id="item"
                    key={index}
                    className="relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm false hover:bg-gray-700"
                  >
                    <img
                      className="w-[35px] aspect-[1/1] rounded-full"
                      src={item?.avatar || "/src/assets/logo.jpg"}
                      alt=""
                    />
                    <div>
                      <h3>{item.fullname}</h3>
                      <span className="text-neutral-400 text-xs">
                        {isonline ? "Online" : "Offline"}
                      </span>
                    </div>
                  </div>
                );
                // }
              })}
            </label>
          </div>
        ) : (
          " "
        )}
      </div>
    </div>
  );
};

export default Sidebar;
