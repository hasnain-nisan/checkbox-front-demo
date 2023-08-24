import React, { useState } from 'react'
import { RxCaretDown, RxCaretUp } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { setBrandIds } from '../redux/reducres/FilterSlice';

const Brands = () => {

    const dispatch = useDispatch()
    const brands = useSelector((state) => state.filter.searchAttributes?.brands)
    const brand_ids = useSelector((state) => state.filter.brand_ids)
    const [accordionOpenBrand, setAccordionOpenBrand] = useState(false);
    const toggleBrandAccordion = () => {
        setAccordionOpenBrand(!accordionOpenBrand);
    };

    const handleBrandChange = (id) => {
        if (brand_ids.includes(id)) {
            dispatch(setBrandIds(brand_ids.filter((item) => item !== id)));
        } else {
            dispatch(setBrandIds([...brand_ids, id]));
        }
    };

    return (
        <div className='mt-5'>
            <div className='flex items-center justify-between cursor-pointer' onClick={toggleBrandAccordion}>
                <h3 className="text-md font-bold mb-2">
                    Brands
                </h3>
                <RxCaretUp className={`${accordionOpenBrand ? 'block' : 'hidden'}`}/>
                <RxCaretDown className={`${accordionOpenBrand ? 'hidden' : 'block'}`}/>
            </div>
            <div 
                className={`searchAttr ${accordionOpenBrand ? 'block' : 'hidden'}`}
            >
            {brands?.map((brand, index) => (
                <div key={index} className="flex items-center mb-2">
                    <input
                        type="checkbox"
                        id={`brand-${index}`}
                        checked={brand_ids.includes(brand.id)}
                        onChange={() => handleBrandChange(brand.id)}
                        className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    />
                    <label htmlFor={`brand-${index}`} className="ml-2">
                        {brand.name}
                    </label>
                </div>
            ))}
            </div>
        </div>
    )
}

export default Brands