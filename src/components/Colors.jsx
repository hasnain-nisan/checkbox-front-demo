import React, { useState } from 'react'
import { RxCaretDown, RxCaretUp } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { setColorCodes } from '../redux/reducres/FilterSlice';

const Colors = () => {

    const dispatch = useDispatch();
    const colors = useSelector((state) => state.filter.searchAttributes?.colors)
    const color_codes = useSelector((state) => state.filter.color_codes)
    const [accordionOpenColors, setAccordionOpenColors] = useState(false);
    const toggleColorAccordion = () => {
        setAccordionOpenColors(!accordionOpenColors);
    };

    const handleColorChange = (code) => {
        if (color_codes.includes(code)) {
            dispatch(setColorCodes(color_codes.filter((item) => item !== code)));
        } else {
            dispatch(setColorCodes([...color_codes, code]));
        }
    };

    return (
        <div className='mt-5'>
            <div className='flex items-center justify-between cursor-pointer' onClick={toggleColorAccordion}>
                <h3 className="text-md font-bold mb-2">
                    Colors
                </h3>
                <RxCaretUp className={`${accordionOpenColors ? 'block' : 'hidden'}`}/>
                <RxCaretDown className={`${accordionOpenColors ? 'hidden' : 'block'}`}/>
            </div>
            <div 
                className={`searchAttr ${accordionOpenColors ? 'block' : 'hidden'}`}
            >
                {colors?.map((color, index) => (
                    <div key={index} className={`flex items-center mb-2 cursor-pointer ${color_codes.includes(color.code) ? "text-blue-500" : null}`} onClick={() => handleColorChange(color.code)}>
                        <input
                            type="checkbox"
                            id={`color-${index}`}
                            checked={color_codes.includes(color.code)}
                            className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                        />
                        <label htmlFor={`color-${index}`} className="ml-2">
                            {color.name}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Colors