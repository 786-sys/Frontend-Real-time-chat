import React, { use, useEffect, useState } from "react";
import logo from "../assets/logo.jpg";
import arrow from "../assets/arrow.png";
import socket from "../Socket/socket.js";
const Chatbox = ({
  responsive,
  setselectedUser,
  useritem,
  curr,
  msglist,
  setmsglist,
}) => {
  const [msg, setmsg] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isonline, setisonline] = useState([]);
  const [url, seturl] = useState("");
  const [istype, setistype] = useState(false);
  const [isTypingUser, setIsTypingUser] = useState(null);
  const [issending, setissending] = useState(false);
  const chatRef = React.useRef(null);

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
    socket.on("message_delivered", (data) => {
      setmsglist((prev) =>
        prev.map((msg) => (msg.id === data.id ? { ...msg, status: 'delivered' } : msg))
      );
    })
    

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
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/message/display/${curr._id}/${useritem._id}`,
          { method: "GET", credentials: "include" },
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

useEffect(()=>{
     
},[msglist])
  const handleSend = async () => {
    if (msg.trim() === "" && !image) return; // prevent sending empty messages without an image
    let imageUrl = null;
    setissending(true);
    if (image) {
      const formData = new FormData();
      if (image.type.startsWith("video/")) {
        formData.append("video", image);
      } else if (image.type.startsWith("audio/")) {
        formData.append("audio", image);
      } else {
        formData.append("image", image);
      }
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/message/imageupload`,
          {
            method: "POST",
            body: formData,
            credentials: "include",
          },
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
    let messageType = "text";

    if (!msg && image) {
      messageType = image.type.startsWith("video/")
        ? "video"
        : image.type.startsWith("audio/")
          ? "audio"
          : "image";
    }

    socket.emit("send_message", {
      senderId: curr._id,
      receiverId: useritem._id,
      content: msg ? msg : imageUrl,
      type: messageType,
      time,
    });
    setmsg("");
    setImage(null);
    setPreview(null);
    setissending(false);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (
      !file.type.startsWith("image/") &&
      !file.type.startsWith("video/") &&
      !file.type.startsWith("audio/")
    ) {
      alert("Please select an image, video, or audio file.");
      return;
    }
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
  };
  1;
  const enterkrwalo = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };
  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "instant", // or omit behavior
    });
  }, [curr, useritem, msglist]);
  return (
    <div className="flex flex-col h-full w-full bg-black/10 backdrop-blur-md relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setselectedUser(false)}
            className="p-2 -ml-2 hover:bg-white/10 rounded-full md:hidden transition-colors"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="relative">
            <img
              src={useritem.avatar || logo}
              alt={useritem.fullname}
              className="w-10 h-10 rounded-full object-cover border border-white/10"
            />
            {isonline.includes(useritem._id) && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#1a1a1a] rounded-full" />
            )}
          </div>

          <div className="flex flex-col">
            <p className="text-white font-semibold text-sm leading-tight">
              {useritem.fullname}
            </p>
            <p className="text-[10px] text-gray-400">
              {isonline.includes(useritem._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
      </div>

      {/* Chat content */}
      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar"
      >
        {msglist && msglist.length > 0 ? (
          msglist.map((item, index) => {
            const isMe = item.senderId === curr._id;
            return (
              <div
                key={item._id || index}
                className={`flex ${isMe ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
              >
                <div
                  className={`flex flex-col max-w-[75%] sm:max-w-[60%] ${isMe ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`px-4 py-2.5 rounded-2xl text-sm shadow-sm break-words
                      ${
                        isMe
                          ? "bg-violet-600 text-white rounded-tr-none"
                          : "bg-white/10 text-white rounded-tl-none border border-white/5"
                      }`}
                  >
                    {/* TEXT MESSAGE */}
                    {item.content && (!item.type || item.type === "text") && (
                      <p className="leading-relaxed">{item.content}</p>
                    )}
                   
                    {/* IMAGE MESSAGE */}
                    {item.type === "image" && item.content && (
                      <div className="relative group">
                        <img
                          src={item.content}
                          alt="sent"
                          className="max-w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                        />
                      </div>
                    )}

                    {/* VIDEO MESSAGE */}
                    {item.type === "video" && item.content && (
                      <video
                        src={item.content}
                        controls
                        className="max-w-full rounded-lg"
                      />
                    )}

                    {/* AUDIO MESSAGE */}
                    {item.type === "audio" && item.content && (
                      <audio
                        src={item.content}
                        controls
                        className="max-w-full scale-90 -mx-4"
                      />
                    )}
                    {/* //single tick */}
                    {
                      item.status === 'sent' && isMe && (
                        <span className="text-[10px] text-white-400 mt-1 px-1">
                          Sent
                        </span>
                      )
                    }
                    {/* //double tick */}
                    {
                      item.status === 'delivered' && isMe && (
                        <span className="text-[10px] text-white-400 mt-1 px-1">
                          Delivered
                        </span>
                      )
                    }
                  </div>

                  {/* Timestamp could go here if available */}
                  <span className="text-[10px] text-gray-500 mt-1 px-1">
                    {item.time ||
                      new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                          minute: "2-digit",
                      })}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center h-full opacity-40">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <p className="text-white text-sm">No messages yet</p>
          </div>
        )}
        
        {isTypingUser === useritem._id && (
          <div className="flex items-center gap-2 animate-pulse">
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce delay-75"></span>
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce delay-150"></span>
            </div>
            <span className="text-[10px] text-green-500 font-medium">
              typing...
            </span>
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="p-4 bg-black/30 border-t border-white/10 backdrop-blur-xl">
        {preview && (
          <div className="mb-3 relative inline-block group">
            <div className="absolute -top-2 -right-2 z-10">
              <button
                onClick={() => {
                  setImage(null);
                  setPreview(null);
                }}
                className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-lg transition-colors"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            {image?.type.startsWith("image/") ? (
              <img
                src={preview}
                className="h-20 w-20 object-cover rounded-xl border-2 border-violet-500"
                alt="preview"
              />
            ) : (
              <div className="h-20 w-32 flex items-center justify-center bg-white/5 rounded-xl border-2 border-violet-500">
                <span className="text-[10px] text-white">Media selected</span>
              </div>
            )}
          </div>
        )}
        {/* input flie */}
        <div className="flex items-center gap-2">
          <label className="p-2 hover:bg-white/10 rounded-full cursor-pointer transition-colors shrink-0">
            <input
              id="media"
              accept="image/*,video/*,audio/*"
              type="file"
              hidden
              onChange={handleFileChange}
            />
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              className="opacity-70 hover:opacity-100"
            >
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
            </svg>
          </label>
          {/* input text */}
          <div className="flex-1 relative">
            <input
              className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-2xl py-2.5 px-4 outline-none focus:ring-2 focus:ring-violet-500/50 transition-all placeholder-gray-500"
              placeholder="Type a message..."
              type="text"
              value={msg}
              onChange={ONCHNAGE}
              onKeyDown={enterkrwalo}
            />
          </div>
          {/* send button */}
          <button
            onClick={handleSend}
            disabled={(!msg.trim() && !image) || issending}
            className={`p-2.5 rounded-full transition-all duration-200 shrink-0
              ${
                (!msg.trim() && !image) || issending
                  ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                  : "bg-violet-600 text-white hover:bg-violet-500 shadow-lg shadow-violet-600/20 active:scale-95"
              }`}
          >
            {issending ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
