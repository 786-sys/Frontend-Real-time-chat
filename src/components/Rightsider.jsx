import React, { use } from 'react'
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

const Rightsider = ({useritem, msglist}) => {
  return (
    <div className='w-[40%] bg-[#8185B2]/10 text-white w-full relative overflow-y-scroll max-md:hidden'>
      <div className='pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto'>
          <img src={useritem?.avatar || '/src/assets/logo.jpg'} className='max-w-[110px] rounded-lg object-cover shadow' alt="" />
          <h1 className='px-10 text-xl font-medium mx-auto flex items-center gap-2'>{useritem?.fullname}</h1>
          <p className='px-10 mx-auto'>{useritem?.description}</p>
      </div>
      <hr className='border-[#ffffff50] my-4'/>
      <div className='px-5 text-xs'>
    <p>Media</p>
    <div className='flex flex-row flex-wrap gap-2 mt-2'>
     {msglist.map((item,index)=>{
        if(item.type==='image'){
          return(<img key={index} src={item.content} alt="media" className='w-16 h-16 object-cover rounded-lg m-1'/>)
        }
      })}  
    </div>
      </div>
      <button  className='absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-400 to-violet-600 text-white border-none text-sm font-light py-2 px-20 rounded-full cursor-pointer'>
        Logout
      </button>
    </div>
  )
}

export default Rightsider
