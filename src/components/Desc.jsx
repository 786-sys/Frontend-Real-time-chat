import React, { useState } from 'react'
import dotenv from "dotenv";
dotenv.config();
const Desc = ({description,register,isdesc,setisdesc}) => {
    const [isbio,setisbio]=useState(true)
    const checkbio=()=>{
        if(description.description.trim()===""){
           setisbio(false)
            return;
        }
        register();
    }
  return (
   
    <div>
      <div className='flex justify-end items-center cursor-pointer mb-4' onClick={()=>{setisdesc(false)}}> 
        <img className='w-[20px]' src="https://www.vhv.rs/dpng/d/244-2446391_black-previous-button-png-transparent-image-arrow-png.png" alt="Arrow prevoius" />
      </div>
        {
        !isbio? "BIo is compulsory" :""
        }

     <input
        className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
        type="text"
        onChange={(e) => {
         description.setdescription(e.target.value);
         setisbio(true)
        }}
        required
        placeholder="Make your Bio.."
        value={description.description}
      />
      <button onClick={()=>{checkbio()}} className="py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer">
        Create Accoutnt 
      </button>
    </div>
  )
}

export default Desc
