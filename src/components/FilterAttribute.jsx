import { Button } from 'antd';
import React, { useState } from 'react'
import { RxCaretDown, RxCaretUp } from 'react-icons/rx'
import {MdOutlineCancel} from 'react-icons/md'
import CategoryAttr from './CategoryAttr';
import PriceRange from './PriceRange';

const FilterAttribute = () => {

  return (
    <div>
        <Button className='flex items-center justify-center gap-3 w-full p-5'>
          <MdOutlineCancel/>
          Reset all filter
        </Button>

        <div className='mt-10'>
              <CategoryAttr/>
              <PriceRange/>
        </div>
    </div>
  )
}

export default FilterAttribute