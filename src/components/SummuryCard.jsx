import { round } from 'lodash';
import React, { useEffect, useState } from 'react'

const SummuryCard = ({card, index}) => {
    const [isArray, setIsArray] = useState(false);
    useEffect(() => {
        if ("title" in card && "value" in card) {
            setIsArray(false)
        } else {
            setIsArray(true)
        }
    }, [card])
    return (
        <div className="flex items-center p-8 bg-white shadow rounded-lg" style={{background: "hsla(0,0%,50%,.09)"}}>
            {
                !isArray ? (
                    <div className='flex w-full justify-between items-center'>
                        <span className="block text-gray-500">{card.title}</span>
                        <span className="block text-xl font-bold bg-red-600 p-2 text-white">{round(card.value)}</span>
                    </div>
                ) : (
                    <div className='flex flex-col w-full gap-5'>
                        {
                            card?.map((item, index) => {
                                return (<div className='flex w-full justify-between items-center' key={index+"sub"}>
                                    <span className="block text-gray-500">{item.title}</span>
                                    <span className="block text-xl font-bold bg-red-600 p-2 text-white">{round(item.value)}</span>
                                </div>)
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}

export default SummuryCard