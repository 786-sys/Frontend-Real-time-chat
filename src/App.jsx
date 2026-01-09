import { useEffect, useState } from "react";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage.jsx";
import Profilepage from "./Pages/Profilepage.jsx";
import Loginpage from "./Pages/Loginpage.jsx";
import socket from "./Socket/socket.js";
function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Connected to socket:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);
  const [array, setarray] = useState([]);
  const [itemuser, setitemuser] = useState(null);
  const [curr, setcurr] = useState(null);
 
  const Display = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/DisplayList`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      console.log(response);
      if (response.ok) {
        const resp = await response.json();
        console.log(resp.data);
        setarray(resp.data);
        showNotification("Loaded ✅", "User list fetched");
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
            resp.user.description
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
  }, []);

  return (
    <>
      <div className="bg-[url('./src/assets/bgImage.svg')] bg-cover bg-center h-screen w-full">
        <Routes>
          <Route
            path="/Homepage"
            element={
              <Homepage
                array={array}
                itemuser={itemuser}
                setitemuser={setitemuser}
                curr={curr}
              />
            }
          />
          <Route path="/profile" element={<Profilepage />} />
          <Route path="/" element={<Loginpage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
