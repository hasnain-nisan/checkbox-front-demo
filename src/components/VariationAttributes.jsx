import React, { useState } from 'react'
import { RxCaretDown, RxCaretUp } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { set_selected_attribute_values } from '../redux/reducres/FilterSlice';

const VariationAttributes = () => {

    const dispatch = useDispatch();
    const attributes = useSelector((state) => state.filter.searchAttributes?.attributes)
    const selected_attribute_values = useSelector((state) => state.filter.selected_attribute_values)
    const [accordionOpenAttrs, setAccordionOpenAttrs] = useState({});

    const toggleAttrsAccordion = (id) => {
        setAccordionOpenAttrs((prevState) => ({
        ...prevState,
        [id]: !prevState[id], // Toggle the value of the specific property
        }));
    };

    const handleAttrChange = (id, value) => {
        const updatedState = { ...selected_attribute_values};
        if (!updatedState.hasOwnProperty(id)) {
            updatedState[id] = [value]; // Create a new property with the id and assign an array with the value
        } else {
            const valueArray = updatedState[id];

            if (valueArray.includes(value)) {
                // Value exists, remove it
                updatedState[id] = valueArray.filter((item) => item !== value);
            } else {
                // Value does not exist, add it
                updatedState[id] = [...valueArray, value];
            }
        }
        dispatch(set_selected_attribute_values(updatedState))
    }

    const isCheckboxChecked = (id, value) => {
        return (
            selected_attribute_values.hasOwnProperty(id) &&
            selected_attribute_values[id].includes(value)
        );
    };

    return (
        <div>
            {attributes?.map((attr, index) => (
                <div key={index} className='mt-5'>
                    <div className='flex items-center justify-between cursor-pointer' 
                        onClick={() => toggleAttrsAccordion(attr.id)}
                    >
                        <h3 className="text-md font-bold mb-2">
                            {attr.name}
                        </h3>
                        <RxCaretUp className={`${accordionOpenAttrs[attr.id] === true ? 'block' : 'hidden'}`}/>
                        <RxCaretDown className={`${accordionOpenAttrs[attr.id] === true ? 'hidden' : 'block'}`}/>
                    </div>
                    <div 
                        className={`searchAttr ${accordionOpenAttrs[attr.id] === true ? 'block' : 'hidden'}`}
                    >
                        {attr.attribute_values.map((item, index) => (
                            <div key={index} className={`flex items-center mb-2 cursor-pointer ${isCheckboxChecked(attr.id, item.value) ? "text-blue-500" : null}`} onClick={() => handleAttrChange(attr.id, item.value)}>
                                <input
                                    type="checkbox"
                                    id={`color-${index}`}
                                    checked={isCheckboxChecked(attr.id, item.value)}
                                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                />
                                <label htmlFor={`color-${index}`} className="ml-2">
                                    {item.value}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default VariationAttributes