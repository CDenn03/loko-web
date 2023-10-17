import React from 'react';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';



export default function Dashboard() {
  return (
    <>
      <div className='flex'>
        <Topbar />
        <Sidebar />
        <div className=' w-full '>
          <div className=' pt-20 bg-yellow-50 w-full '>
            <p className=' p-4 '>Dashboard</p>
          </div>
          <div className=''>
            <div className=' flex p-3 justify-between '>
              <Card />
              <Card />
              <Card />
              <Card />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
