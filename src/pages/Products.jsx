import React from 'react';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import ProductList from '../components/ProductList';


export default function Products() {
  return (
    <>
      <div className='flex'>
        <Topbar />
        <Sidebar />
        <div className=' w-full '>
          <div className=' pt-20 bg-yellow-50 w-full '>
            <p className=' p-4 '>Products</p>
          </div>
          <div className=''>
            <div className=' flex p-3 justify-between '>
              <ProductList />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
