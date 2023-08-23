import React from 'react'
import FilterAttribute from '../components/FilterAttribute'
import Product from '../components/Product'

const Filter = () => {
  return (
    <div className="mx-auto p-4 flex gap-3 items-center w-full">
      <div className="w-1/4 bg-gray-200 p-4">
        <FilterAttribute/>
      </div>
      <div className="w-3/4 bg-white p-4">
        <Product/>
      </div>
    </div>
  )
}

export default Filter