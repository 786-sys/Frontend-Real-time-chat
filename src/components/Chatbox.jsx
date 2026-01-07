import React, { use, useEffect, useState } from "react";
import socket from "../Socket/socket.js";
import dotenv from "dotenv";
dotenv.config();
const Chatbox = ({ useritem, curr, msglist, setmsglist}) => {
  const [msg, setmsg] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isonline, setisonline] = useState([]);
  const [url, seturl] = useState("");
  const [istype, setistype] = useState(false);
  const [isTypingUser, setIsTypingUser] = useState(null);

  /* ================= CONNECT & JOIN ================= */
  useEffect(() => {
    console.log(curr);
    socket.connect();
    socket.emit("join", curr._id);

    // receiver side
    socket.on("receive_message", (data) => {
      setmsglist((prev) => [...prev, data]);
    });

    // sender confirmation (optional but good)
    socket.on("message_sent_confirmation", (data) => {
      setmsglist((prev) => [...prev, data]);
    });

    // 🔹 online users list
    socket.on("online-users", (users) => {
      setisonline(users);
    });
    socket.on("user_typing", ({ senderId }) => {
      setIsTypingUser(senderId);
    });

    socket.on("user_stop_typing", ({ senderId }) => {
      setIsTypingUser(null);
    });

    return () => {
      socket.off("receive_message");
      socket.off("message_sent_confirmation");
      socket.off("online-users");
      socket.off("user_typing");
      socket.off("user_stop_typing");
    };
  }, [curr._id]);
  /* ================= FETCH MESSAGES ================= */
  useEffect(() => {
    if (!curr?._id || !useritem?._id) return;

    const loadMessages = async () => {
      try {
        const response = await fetch(
          `${process.env.backend_url}/api/v1/message/display/${curr._id}/${useritem._id}`,
          { method: "GET", credentials: "include" }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setmsglist(data.messages);
          console.log(data.messages);
        } else {
          console.log("Failed to fetch messages");
        }
      } catch (err) {
        console.log("Error coming" + err);
      }
    };

    loadMessages();
  }, [curr?._id, useritem?._id]);

  const handleSend = async () => {
    let imageUrl = null;

    if (image) {
      const formData = new FormData();
      formData.append("image", image);

      try {
        const response = await fetch(
          `${process.env.backend_url}/api/v1/message/imageupload`,
          {
            method: "POST",
            body: formData,
            credentials: "include",
          }
        );
        if (response.ok) {
          const resp = await response.json();
          imageUrl = resp.imageUrl;
          seturl(imageUrl);
          console.log("Image uploaded successfully: " + imageUrl);
        } else {
          console.log("Profile update failed " + response.statusText);
        }
      } catch (err) {
        console.log("fetching user profile problem  " + err);
      }
    }

    const time = new Date().toLocaleTimeString();

    socket.emit("send_message", {
      senderId: curr._id,
      receiverId: useritem._id,
      content: msg ? msg : imageUrl,
      type: imageUrl ? "image" : msg ? "text" : "image",
      time,
    });
    setmsg("");
    setImage(null);
    setPreview(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };
  console.log(msglist);

  const ONCHNAGE = (e) => {
    console.log("typing");
    setmsg(e.target.value);
    if (!istype) {
      setistype(true);
      socket.emit("typing", {
        senderId: curr._id,
        receiverId: useritem._id,
      });
    }

    setTimeout(() => {
      setistype(false);
      socket.emit("stop_typing", {
        senderId: curr._id,
        receiverId: useritem._id,
      });
    }, 10000);
  };1 
  return (
    <div className="h-full relative backdrop-blur-lg w-[100%] ">
      {/* Header */}
      <div className="flex justify-between items-center gap-3 py-3 mx-4 border-b border-stone-500 ">
        <div className="flex items-center gap-3">
          <img
            src={useritem.avatar}
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          <p className="text-white">{useritem.fullname}</p>
          <p className="text-green-200">
            {isonline.includes(useritem._id) ? <b>Online</b> : <b>Offline</b>}
          </p>
        </div>
      </div>

      {/* Chat content */}
      <div className="flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6">
        {msglist ? (
          msglist.map((item, index) => {
            const isMe = item.senderId === curr._id;
            return (
              <div
                key={index}
                className={`flex items-end gap-2 ${
                  isMe ? "justify-end" : "justify-start"
                }   `}
              >
                {/* TEXT MESSAGE */}
                {console.log(
                  "message item type " + item.type + " content " + item.content
                )}
                {item.content && (!item.type || item.type === "text") && (
                  <p className="p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white rounded-br-none">
                    {item.content}
                  </p>
                )}

                {/* IMAGE MESSAGE */}
                {item.type === "image" && item.content && (
                  <img
                    src={item.content}
                    alt="sent"
                    className="max-w-[200px] rounded-lg mb-8 bg-violet-500/30 p-1"
                  />
                )}

                <div className="text-center text-xs">
                  <img
                    className="w-7 rounded-full"
                    src={isMe ? curr.avatar : useritem.avatar}
                    alt=""
                  />
                  <p className="text-gray-500">{item.time}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-center mt-10">
            No messages yet. Start the conversation!
          </p>
        )}
        {isTypingUser === useritem._id && (
          <div className="text-xs text-green-400 italic text-[40px] h-[50px] ">
            typing...
          </div>
        )}
      </div>
      {/* Input bar */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3">
        <div className="flex-1 flex items-center bg-gray-100/12 px-3 rounded-full">
          <input
            className="flex-1 text-sm p-3 border-none rounded-lg outline-none text-black placeholder-gray-400"
            placeholder="Send the Message"
            type="text"
            value={msg}
            onChange={(e) => {
              ONCHNAGE(e);
            }}
          />

          <label htmlFor="image">
            <input
              id="image"
              accept="image/png, image/jpeg"
              type="file"
              hidden
              onChange={handleFileChange}
            />
            <img
              className="w-5 mr-2 cursor-pointer"
              src="data:image/svg+xml,%3csvg%20width='27'%20height='27'%20viewBox='0%200%2027%2027'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M1%2010.375V4.125C1%202.39911%202.39911%201%204.125%201H13.5M1.04208%2023.3891C1.28727%2024.8703%202.57422%2026%204.125%2026H22.875C24.6009%2026%2026%2024.6009%2026%2022.875V16.922M1.04208%2023.3891C1.01441%2023.2219%201%2023.0502%201%2022.875V18.1875M1.04208%2023.3891L7.01191%2017.4192C8.07445%2016.4895%209.62842%2016.3877%2010.8031%2017.1709L11.5988%2017.7012C12.7309%2018.4561%2014.2217%2018.3914%2015.2844%2017.5413L19.422%2014.2311C20.4767%2013.3873%2021.9458%2013.3211%2023.0669%2014.0444C23.1911%2014.1245%2023.3017%2014.2237%2023.4063%2014.3283L26%2016.922M26%2016.922V4.125C26%202.39911%2024.6009%201%2022.875%201H21.3125M11.9375%208.8125C11.9375%2010.5384%2010.5384%2011.9375%208.8125%2011.9375C7.08661%2011.9375%205.6875%2010.5384%205.6875%208.8125C5.6875%207.08661%207.08661%205.6875%208.8125%205.6875C10.5384%205.6875%2011.9375%207.08661%2011.9375%208.8125Z'%20stroke='white'%20stroke-opacity='0.35'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e"
              alt=""
            />
          </label>
        </div>

        <img
          src="data:image/svg+xml,%3csvg%20width='46'%20height='46'%20viewBox='0%200%2046%2046'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='23'%20cy='23'%20r='23'%20fill='url(%23paint0_linear_8506_1288)'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M18.3739%2027.7131C19.222%2029.2715%2021.9243%2034.2198%2021.9243%2034.2198C21.9243%2034.2198%2031.9224%2014.8584%2032.0811%2014.541L32.0938%2014.4839L18.3739%2027.7131ZM11.7676%2023.4282C11.7676%2023.4282%2016.4003%2026.2093%2017.6997%2026.9812L31.4463%2013.9062C29.8822%2014.6642%2011.7676%2023.4282%2011.7676%2023.4282Z'%20fill='white'/%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_8506_1288'%20x1='23'%20y1='0'%20x2='23'%20y2='46'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23C263FE'/%3e%3cstop%20offset='1'%20stop-color='%237D36FE'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e"
          alt="send"
          onClick={handleSend}
        />
      </div>
    </div>
  );
};

export default Chatbox;
