import React from 'react'
import SortBy from './SortBy'

const Product = () => {
  return (
    <div>
      <div className='flex items-center justify-between'>
        <h1>Category products</h1>
        <SortBy/>
      </div>
    </div>
  )
}

export default Product