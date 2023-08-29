import { Button, Input, Modal, Rate, Upload } from 'antd'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsModalOpen } from '../../redux/reducres/ReviewSlice';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { v4 as uuidv4 } from 'uuid';

const AddReviewModal = () => {

    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const [fileList, setFileList] = useState([]);
    const [rating, setRating] = useState(0);
    const [text, setText] = useState('');

    const isModalOpen = useSelector(state => state.review.isModalOpen)

    const handleIsModalOpen = () => {
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
            url: URL.createObjectURL(file), // Generate a preview URL for the image
        }));
        setFileList([...fileList, ...newFileList]);
        console.log(fileList);
    };

    const removeFile = (id) => {
        let arr = fileList.filter(image => image.uid !== id)
        setFileList(arr)
        console.log(fileList, arr);
    }

    const handleRatingChange = value => {
        setRating(value);
        console.log(value);
    };

    const handleTextChange = e => {
        setText(e.target.value);
    };

    return (
        <Modal
            title="Add review"
            centered
            open={isModalOpen}
            onOk={handleIsModalOpen}
            onCancel={handleIsModalOpen}
        >
            <div className='flex gap-2'>
                {fileList.map(file => (
                    <div className='relative cursor-pointer' key={file.uid} onClick={(e)=>removeFile(file.uid)}>
                        <img src={file.url} alt={file.name} className='h-full rounded-md' style={{ width: '100px', height: 'auto' }} />
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
            <div className='flex mt-2 w-full'>
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
            <Rate onChange={handleRatingChange} value={rating} />
            <Input.TextArea rows={4} value={text} onChange={handleTextChange} />
        </Modal>
    )
}

export default AddReviewModal