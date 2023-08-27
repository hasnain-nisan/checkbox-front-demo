import React, { useState } from 'react'
import { RxCaretDown, RxCaretUp } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import {BiRightArrowAlt} from 'react-icons/bi'
import { setCategorySlug } from '../redux/reducres/FilterSlice';


const CategoryAttr = () => {

    const dispatch = useDispatch()
    const categories = useSelector((state) => state.filter.searchAttributes?.categories)
    const category_slug = useSelector((state) => state.filter.category_slug)
    const [accordionOpenCategory, setAccordionOpenCategory] = useState(false);
    const toggleCategoryAccordion = () => {
        setAccordionOpenCategory(!accordionOpenCategory);
    };

    const setSlug = (slug) => {
        dispatch(setCategorySlug(slug))
    }

    // console.log(categories);

    return (
        <div>
            {
                categories?.length > 0 ? (
                    <>
                        <div className='flex items-center justify-between cursor-pointer' onClick={toggleCategoryAccordion}>
                            <h3 className="text-md font-bold mb-2">
                                Categories
                            </h3>
                            <RxCaretUp className={`${accordionOpenCategory ? 'block' : 'hidden'}`}/>
                            <RxCaretDown className={`${accordionOpenCategory ? 'hidden' : 'block'}`}/>
                        </div>
                        <div 
                            className={`searchAttr ${accordionOpenCategory ? 'block' : 'hidden'}`}
                        >
                            {categories?.map((category, index) => (
                                <div key={index} className="flex items-center mb-2" onClick={() => setSlug(category.slug)}>
                                {/* <input
                                    type="checkbox"
                                    id={`category-${index}`}
                                    // checked={category_ids.includes(category.id)}
                                    // onChange={() => handleCategoryChange(category.id)}
                                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                /> */}

                                    <label htmlFor={`category-${index}`} className={`flex gap-2 items-center cursor-pointer ${index == 0 ? "ml-2 " : "pl-2 ml-5 flex gap-2 items-center cursor-pointer"} ${category_slug == category.slug ? "text-blue-700" : ""}`}>
                                        <BiRightArrowAlt/> {category.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </>
                ): null
            }
        </div>
    )
}

export default CategoryAttr