import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setIsDeleteModalOpen, setIsEditModalOpen, setIsModalOpen, setSelectedProductForReview, setSelectedReview } from '../../redux/reducres/ReviewSlice';
import { Dropdown, Rate, Space } from 'antd';
import { BiMenuAltLeft } from 'react-icons/bi';
import { FaCaretDown } from 'react-icons/fa';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';


const ProductCard = ({product}) => {

    const dispatch = useDispatch();
    const review_type = useSelector(state => state.review.review_type)
    const imageFallBack = "https://miro.medium.com/v2/resize:fit:1150/1*AC9frN1qFnn-I2JCycN8fw.png"
    const [imgError, setImgError] = useState(false)
    const images = (review_type === 'reviewed' && product?.review) ? (JSON.parse(product?.review?.images)) : []

    const handleImageError = () => {
        setImgError(true)
    }

    const items = [
        {
            "key": 1,
            "label": "Edit",
            "icon": <AiOutlineEdit/>,
            "onClick": function(){
                dispatch(setSelectedReview(product?.review))
                dispatch(setIsEditModalOpen(true))
            },
        },
        {
            "key": 2,
            "label": "Delete",
            "icon": <MdDelete/>,
            "onClick": function(){
                dispatch(setSelectedReview(product?.review))
                dispatch(setIsDeleteModalOpen(true))
            },
        }
    ];

    const handleIsModalOpen = (product) => {
        if(review_type == 'to_review'){
            dispatch(setSelectedProductForReview(product))
            dispatch(setIsModalOpen(true))
        }
    }

    return (
        <div className={`flex p-5 gap-3 cursor-pointer group hover:bg-gray-100 hover:rounded-md ${review_type === 'reviewed' ? 'flex-col' : 'items-center'}`}
            onClick={() => handleIsModalOpen(product)}
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
            {
                review_type === "to_review" ? (
                    <div className='w-1/4 flex justify-end'>
                        <button className=' text-sm bg-red-400 px-2 py-2 rounded-md group-hover:text-white group-hover:bg-red-500'>
                            Review
                        </button>
                    </div>
                ) : null
            }
            {
                review_type === 'reviewed' ? (
                    <div className='border-dotted border-2 p-3 group-hover:bg-gray-300 rounded-md flex flex-col gap-3'>
                        <div className='flex items-center justify-between'>
                            <span className='text-sm font-semibold'>Review</span>
                            <Dropdown
                                menu={{
                                    items,
                                }}
                                on
                            >
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space className='p-1 bg-white rounded-md cursor-pointer'>
                                        <BiMenuAltLeft/>
                                    </Space>
                                </a>
                            </Dropdown>
                        </div>
                        <div className='flex gap-2 items-center'>
                            {
                                images.map((image, index) => {
                                    return <img key={index} src={image} className='h-full rounded-md w-[100px]'/>
                                })
                            }
                        </div>
                        <div>
                            <Rate disabled value={product?.review?.rating}></Rate>
                        </div>
                        <div>
                            <p className='font-light text-sm'>{product?.review?.comment}</p>
                        </div>
                    </div>
                ) : null
            }
        </div>
    )
}

export default ProductCard