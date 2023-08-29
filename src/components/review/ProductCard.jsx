import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setIsModalOpen } from '../../redux/reducres/ReviewSlice';


const ProductCard = ({product}) => {

    const dispatch = useDispatch();
    const imageFallBack = "https://miro.medium.com/v2/resize:fit:1150/1*AC9frN1qFnn-I2JCycN8fw.png"
    const [imgError, setImgError] = useState(false)

    const handleImageError = () => {
        setImgError(true)
    }

    const handleIsModalOpen = () => {
        dispatch(setIsModalOpen(true))
    }

    console.log(product);

    return (
        <div className='flex gap-3 items-center cursor-pointer group hover:bg-gray-100 hover:rounded-md'
            onClick={handleIsModalOpen}
        >
            <div className='flex gap-5 items-center w-3/4'>
                <img 
                    src={imgError ? imageFallBack : product?.thumbnail_img} 
                    alt="" 
                    srcSet="" 
                    className='h-20 rounded-md'
                    onError={() => handleImageError()}
                />
                <div className='flex flex-col text-sm'>
                    <span>Name: {product?.name}</span>
                    <span>Variation: {product?.variation_text}</span>
                    <span>Seller: {product?.seller_name}</span>
                </div>
            </div>
            <div className='w-1/4 flex justify-end'>
                <button className=' text-sm bg-red-400 px-2 py-2 rounded-md group-hover:text-white group-hover:bg-red-500'>
                    Review
                </button>
            </div>
        </div>
    )
}

export default ProductCard