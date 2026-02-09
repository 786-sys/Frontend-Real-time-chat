import React, { useState } from "react";
import Sign from "../components/Sign.jsx";
import Login from "../components/Login.jsx";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import toast from "react-hot-toast";
const Loginpage = () => {
  const [signtrue, setsigntrue] = useState(true);
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [fullname, setfullname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [description, setdescription] = useState("");
  const Register = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fullname, email, password, description }),
          credentials: "include",
        }
      );
      if (response.ok) {
        const resp = await response.json();
        alert(
          "you logged in succesfuly " +
            resp.user.email +
            " " +
            resp.user.description +
            resp.user.fullname
        );
        setsigntrue(false);
        // setregisteruser(resp.user);
      }
    } catch (err) {
      console.log("Register not hoing" + err);
    }
  };
  const Log = async () => {
    try {
      console.log(email + " hi " + password);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        }
      );
      console.log(response);
      setloading(false);
      const resp = await response.json();
      if (response.ok) {
        toast.success("you logged in succesfuly");
        navigate("/Homepage");
        // setregisteruser(resp.user);
      } else {
        toast.error("login failed with " + resp.message);
      }
    } catch (err) {
      console.log("error" + err);
    }
  };
  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl md:flex-row">
     <div className="flex">
         <img
        className="w-[min(50vw,600px)] rounded-[100px]"
        src={logo}
        alt="Real Chat Logo"
      />
     </div>
      {signtrue ? (
        <Sign
          register={Register}
          setsigntrue={setsigntrue}
          fullname={{ fullname, setfullname }}
          email={{ email, setemail }}
          password={{ password, setpassword }}
          description={{ description, setdescription }}
        />
      ) : (
        <Login
          Log={Log}
          loading={loading}
          setloading={setloading}
          setsigntrue={setsigntrue}
          email={{ email, setemail }}
          password={{ password, setpassword }}
        />
      )}
      
    </div>
  );
};
export default Loginpage;
