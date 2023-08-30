import React, { useState } from 'react'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {MdOutlineUpdate} from 'react-icons/md'
import {BiCaretDown, BiCaretUp} from 'react-icons/bi'
import ProductCard from './ProductCard'

const OrderCard = ({order}) => {

  const [isOpen, setIsOpen] = useState(false);
  const date = new Date(order?.created_at).toLocaleString();
  
  return (
    <div className='shadow-md'>
      <div 
        className={`flex justify-between items-center cursor-pointer group hover:bg-gray-200 hover:rounded-md ${isOpen ? "border-b-2 bg-gray-200 rounded-md" : null}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-col items-start px-4 py-4">
            <div className={`flex items-center gap-5 font-semibold group-hover:text-red-500 ${isOpen ? 'text-red-500' : null}`}>
                <AiOutlineShoppingCart fontSize={20}/>
                <div className='flex gap-2'>
                  <span>{order?.code}</span>
                </div>
            </div>
            <div className='flex items-center gap-5 text-sm font-extralight ml-1'>
                <MdOutlineUpdate fontSize={15}/>
                <div className='flex gap-2'>
                  <span>Date:</span>
                  <span>{date}</span>
                </div>
            </div>
        </div>
        <div className='px-4'>
          {isOpen ? <BiCaretUp/> : <BiCaretDown/>}
        </div>
      </div>
      {
        isOpen ? (
          <div className='p-4 flex flex-col gap-3'>
            {order?.products?.map((product, index) => <ProductCard key={index} product={product}/>)}
          </div>
        ) : null
      }
    </div>
  )
}

export default OrderCard