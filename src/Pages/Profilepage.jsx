import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg"

const Profilepage = () => {
  const [Name, setName] = useState("");
  const [textarea, settextarea] = useState("");
  const [Url, setUrl] = useState(logo);
  let [file, setfile] = useState(null);
  const navigate = useNavigate();
  // const [registeruser,setregisteruser]=useState(null);
  // useEffect(() => {
  //   setName(user?.fullname || "unknown");
  //   settextarea(user?.description || "No description added");
  //   setUrl(user?.avatar || "");
  // },[]);
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
        // setregisteruser(resp.user);
        setName(resp.user.fullname || "unknown");
        settextarea(resp.user.description || "No description added");
        setUrl(resp.user.avatar || "/src/assets/logo.jpg");
      }
      console.log(response.statusText);
    } catch (err) {
      console.log("getting user profile problem  " + err);
    }
  };
  // const editprofile = () => {
  //   setedit(!edit);
  //   alert("Profile updated");
  //   setuser({ fullname: Name, description: textarea });
  //   navigate("/Homepage");
  // };
  const urlToFile = async (url, filename, mimeType) => {
    const res = await fetch(url);
    const blob = await res.blob();
    return new File([blob], filename, { type: mimeType });
  };
  const changeformat = async () => {
    const existingfile = await urlToFile(Url, "avatar.jpg", "image/jpeg");
    return existingfile;
  };
  const UpdateProfile = async () => {
    if (file === null) {
      file = await changeformat();
    }
    // setfile(existingfile);
    const formData = new FormData();
    formData.append("description", textarea);
    formData.append("avatar", file);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/UpdateProfile`,
        {
          method: "PUT",
          body: formData,
          credentials: "include",
        }
      );
      if (response.ok) {
        const resp = await response.json();
        setUrl(resp.user.avatar);
        settextarea(resp.user.description);
        setName(Name);
        alert("Avatar updated successfully");
        navigate("/Homepage");
      } else {
        console.log("Profile update failed " + response.statusText);
      }
    } catch (err) {
      console.log("fetching user profile problem  " + err);
    }
  };
  useEffect(() => {
    GetUserProfile();
  }, []);
  return (
    <div
      className={`flex flex-row justify-center items-center h-screen w-full 
                        backdrop-blur-xl bg-black/30
                        border-2 border-gray-600 rounded-2xl
                        overflow-hidden`}
    >
      <div className="w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg">
        <div className="flex flex-col gap-5 p-10 flex-1">
          <h1 className="text-lg ">Profile Details</h1>
          <span>
            <img className="w-[20px]" onClick={()=>{navigate("/Homepage")}} src="https://www.vhv.rs/dpng/d/244-2446391_black-previous-button-png-transparent-image-arrow-png.png" alt="" />
          </span>
          <label
            className="flex items-center gap-3 cursor-pointer"
            htmlFor="avatar"
          >
            <input
              hidden=" "
              id="avatar"
              accept=".jpg , .png , .jpeg"
              type="file"
              onChange={(e) => {
                setfile(e.target.files[0]);
              }}
            />
            {console.log("this is my just bedore kjdjkj  " + Url || "not have")}
            <img ca
              src={Url}
              className="max-w-[110px] max-sm:max-h-[100px] max-sm:max-w-[100px]  rounded-lg object-cover shadow"
              alt=""
            />
            Upload user Profile
          </label>
          <input
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 bg-[#1453]"
            placeholder="Your name"
            required
            value={Name}
          />

          <textarea
            className="p-2 bg-[#1453] border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            value={textarea}
            onChange={(e) => {
              settextarea(e.target.value);
            }}
            placeholder="Enter Description"
          ></textarea>
          <button
            onClick={UpdateProfile}
            className="bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer"
          >
            Edit profile
          </button>
        </div>

        <img
          className="max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10"
          src="data:image/svg+xml,%3csvg%20width='300'%20height='300'%20viewBox='0%200%20300%20300'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M174.433%20277.078L166.301%20290.817C159.053%20303.061%20140.948%20303.061%20133.7%20290.817L125.568%20277.078C119.261%20266.422%20116.108%20261.096%20111.042%20258.148C105.977%20255.202%2099.5992%20255.092%2086.844%20254.873C68.0136%20254.548%2056.2036%20253.394%2046.2989%20249.292C27.9217%20241.679%2013.3211%20227.08%205.70902%20208.702C-4.47037e-07%20194.92%200%20177.446%200%20142.501V127.5C0%2078.3988%20-8.94073e-07%2053.848%2011.052%2035.8128C17.2363%2025.721%2025.721%2017.2363%2035.8128%2011.052C53.8479%20-8.94073e-07%2078.3988%200%20127.5%200H172.501C221.602%200%20246.152%20-8.94073e-07%20264.188%2011.052C274.281%2017.2363%20282.765%2025.721%20288.949%2035.8128C300.001%2053.848%20300.001%2078.3988%20300.001%20127.5V142.501C300.001%20177.446%20300.001%20194.92%20294.292%20208.702C286.68%20227.08%20272.08%20241.679%20253.702%20249.292C243.797%20253.394%20231.988%20254.548%20213.157%20254.873C200.401%20255.092%20194.024%20255.202%20188.959%20258.148C183.893%20261.094%20180.739%20266.422%20174.433%20277.078Z'%20fill='%23936EFF'/%3e%3cpath%20d='M225.004%20135.002C225.004%20143.287%20218.288%20150.002%20210.004%20150.002C201.719%20150.002%20195.004%20143.287%20195.004%20135.002C195.004%20126.717%20201.719%20120.002%20210.004%20120.002C218.288%20120.002%20225.004%20126.717%20225.004%20135.002Z'%20fill='white'/%3e%3cpath%20d='M164.996%20135.002C164.996%20143.287%20158.281%20150.002%20149.996%20150.002C141.712%20150.002%20134.996%20143.287%20134.996%20135.002C134.996%20126.717%20141.712%20120.002%20149.996%20120.002C158.281%20120.002%20164.996%20126.717%20164.996%20135.002Z'%20fill='white'/%3e%3cpath%20d='M105%20135.002C105%20143.287%2098.2843%20150.002%2090.0001%20150.002C81.7158%20150.002%2075%20143.287%2075%20135.002C75%20126.717%2081.7158%20120.002%2090.0001%20120.002C98.2843%20120.002%20105%20126.717%20105%20135.002Z'%20fill='white'/%3e%3c/svg%3e"
          alt=""
        />
      </div>
    </div>
  );
};

export default Profilepage;
