import React, { useState } from "react";
import Sign from "../components/Sign";
import Login from "../components/login";
import { useNavigate } from "react-router-dom";
const Loginpage = () => {
  const [signtrue, setsigntrue] = useState(true);
  const navigate = useNavigate();
  const [fullname, setfullname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [description, setdescription] = useState("");
  const Register = async () => {
    try {
      const response = await fetch(
        `${process.env.backend_url}/api/v1/user/register`,
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
        `${process.env.backend_url}/api/v1/user/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        }
      );
      console.log(response);
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
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
      <img
        className="w-[min(30vw,600px)] rounded-[100px] relative right-[150px]"
        src="./src/assets/logo.png"
        alt=""
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
          setsigntrue={setsigntrue}
          email={{ email, setemail }}
          password={{ password, setpassword }}
        />
      )}
    </div>
  );
};
export default Loginpage;
