import React from 'react';
import { AiOutlineHome } from 'react-icons/ai';

export default function Sidebar() {
  return (
    <nav className=' pt-20 w-36 bg-green-50 h-screen'>
      <ul className='space-y-1 p-1'>
        <li className='text-black p-2 bg-green-100 rounded-lg'>
          <p className=' flex items-center text-lg uppercase font-semibold'>
            <AiOutlineHome />
            <span>Dashboard</span>
          </p>
        </li>
        <li className='text-black p-2 bg-green-100 rounded-lg'>
          <p className=' flex items-center text-lg uppercase font-semibold'>
            <AiOutlineHome />
            <span>Dashboard</span>
          </p>
        </li>
        <li className='text-black p-2 bg-green-100 rounded-lg'>
          <p className=' flex items-center text-lg uppercase font-semibold'>
            <AiOutlineHome />
            <span>Dashboard</span>
          </p>
        </li>
        
      </ul>
    </nav>
  )
}
