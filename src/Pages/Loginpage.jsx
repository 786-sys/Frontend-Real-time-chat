import React, { useState } from "react";
import Sign from "../components/Sign.jsx";
import Login from "../components/Login.jsx";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

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
      if (response.ok) {
        const resp = await response.json();
        alert(
          "you logged in succesfuly " +
            resp.user.email +
            " " +
            resp.user.description
        );
        navigate("/Homepage");
        // setregisteruser(resp.user);
      } else {
        alert("login failed" + response.statusText);
      }
    } catch (err) {
      console.log("error" + err);
    }
  };
  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 md:justify-evenly px-4 md:px-0 backdrop-blur-2xl">
      <img
        className="w-[min(30vw,300px)] md:w-[min(30vw,500px)] rounded-[50px] md:rounded-[100px] relative md:right-[150px]"
        src={logo}
        alt="Real Chat Logo"
      />
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
