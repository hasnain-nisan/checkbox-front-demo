import React, { useState } from 'react'
import { RxCaretDown, RxCaretUp } from 'react-icons/rx'

const FilterAttribute = () => {

    const [accordionOpenCategory, setAccordionOpenCategory] = useState(false);
    const toggleCategoryAccordion = () => {
        setAccordionOpenCategory(!accordionOpenCategory);
    };

  return (
    <div>
        <h2 className="text-lg font-bold mb-4">Filters</h2>

        <div>
              <div className='flex items-center justify-between cursor-pointer' onClick={toggleCategoryAccordion}>
                <h3 className="text-md font-bold mb-2">
                  Categories
                </h3>
                <RxCaretUp className={`${accordionOpenCategory ? 'block' : 'hidden'}`}/>
                <RxCaretDown className={`${accordionOpenCategory ? 'hidden' : 'block'}`}/>
              </div>
        </div>
    </div>
  )
}

export default FilterAttribute