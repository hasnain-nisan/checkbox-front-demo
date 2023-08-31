import { Button, Input, Modal, Rate,  } from 'antd'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsModalOpen } from '../../redux/reducres/ReviewSlice';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const AddReviewModal = () => {

    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const [fileList, setFileList] = useState([]);
    const [rating, setRating] = useState(0);
    const [text, setText] = useState('');

    const isModalOpen = useSelector(state => state.review.isModalOpen)
    const selectedProductForReview = useSelector(state => state.review.selectedProductForReview)

    const handleIsModalOpen = () => {
        setFileList([])
        setRating(0)
        setText('')
        dispatch(setIsModalOpen(false))
    }

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = e => {
        const files = Array.from(e.target.files);
        const newFileList = files.map(file => ({
            uid: uuidv4(),
            name: file.name,
            status: 'done', // Set status to 'done' to skip Antd's upload process
            url: URL.createObjectURL(file), 
            file: file// Generate a preview URL for the image
        }));
        setFileList([...fileList, ...newFileList]);
    };

    const removeFile = (id) => {
        let arr = fileList.filter(image => image.uid !== id)
        setFileList(arr)
    }

    const handleRatingChange = value => {
        setRating(value);
    };

    const handleTextChange = e => {
        setText(e.target.value);
    };

    const submitReview = async () => {
        let data = {
            images: fileList,
            rating: rating,
            review: text,
            product_id: selectedProductForReview.id,
            order_details_id: selectedProductForReview.order_details_id
        }

        try {
            const response = await axios.post('reseller/review/add', data);
            setFileList([])
            setRating(0)
            setText('')
            dispatch(setIsModalOpen(false))

        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <Modal
            title="Add review"
            centered
            open={isModalOpen}
            onOk={submitReview}
            onCancel={handleIsModalOpen}
        >
            <div className='flex flex-col gap-3 p-5'>
                <div className='flex flex-col justify-center items-center p-5 border-dotted border-2'>
                    <div className='flex gap-2'>
                        {fileList.map(file => (
                            <div className='relative cursor-pointer' key={file.uid} onClick={(e)=>removeFile(file.uid)}>
                                <img src={file.url} alt={file.name} className='h-full rounded-md w-[100px]'/>
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300">
                                    <div className='bg-white rounded-full'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='mt-2'>
                        <input 
                            type="file" 
                            className='hidden' 
                            ref={fileInputRef}
                            multiple
                            onChange={handleFileChange}
                        />
                        <Button className='flex items-center gap-2' onClick={handleButtonClick}>
                            <AiOutlineCloudUpload/>
                            Upload image
                        </Button>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <span className='font-semibold'>Rating</span>
                    <Rate onChange={handleRatingChange} value={rating} />
                </div>
                <div className='flex flex-col gap-3'>
                    <span className='font-semibold'>Review</span>
                    <Input.TextArea rows={4} value={text} onChange={handleTextChange} />
                </div>
            </div>
        </Modal>
    )
}

export default AddReviewModal