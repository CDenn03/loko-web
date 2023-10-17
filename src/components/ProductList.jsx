import React from 'react'

export default function ProductList() {
  return (
    <div className='w-full bg-green-400'>
      <span className=' p-12'>Products List</span>
      <table className=' w-full'>
        <thead className=' bg-green-200'>
          <tr>
            <th>
              Product Name
            </th>
            <th>
              Quantity
            </th>
            <th>
              Price
            </th>
            <th>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              Test
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  )
}
