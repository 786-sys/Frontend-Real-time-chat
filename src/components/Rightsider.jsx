import React, { use } from 'react'


const Rightsider = ({useritem, msglist}) => {
  return (
    <div className='w-full md:w-[40%] bg-[#8185B2]/10 text-white hidden lg:flex flex-col relative overflow-y-scroll'>
      <div className='pt-8 md:pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto'>
          <img src={useritem?.avatar || '/src/assets/logo.jpg'} className='max-w-[80px] md:max-w-[110px] rounded-lg object-cover shadow' alt="" />
          <h1 className='px-6 md:px-10 text-lg md:text-xl font-medium mx-auto flex items-center gap-2'>{useritem?.fullname}</h1>
          <p className='px-6 md:px-10 mx-auto text-xs md:text-sm'>{useritem?.description}</p>
      </div>
      <hr className='border-[#ffffff50] my-4'/>
      <div className='px-3 md:px-5 text-xs md:text-sm'>
    <p className='font-medium'>Media</p>
    <div className='flex flex-row flex-wrap gap-2 mt-3'>
     {msglist.map((item,index)=>{
        if(item.type==='image'){
          return(<img key={index} src={item.content} alt="media" className='w-12 md:w-16 h-12 md:h-16 object-cover rounded-lg m-1 hover:opacity-80 cursor-pointer'/>)
        }
      })}  
    </div>
      </div>
      <button  className='absolute bottom-3 md:bottom-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-400 to-violet-600 text-white border-none text-xs md:text-sm font-light py-2 px-12 md:px-20 rounded-full cursor-pointer hover:opacity-90 transition'>
        Logout
      </button>
    </div>
  )
}

export default Rightsider
