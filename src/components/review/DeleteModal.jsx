import { Modal } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsDeleteModalOpen, setSelectedReview } from '../../redux/reducres/ReviewSlice';
import axios from 'axios';

const DeleteModal = () => {

    const dispatch = useDispatch();
    const isDeleteModalOpen = useSelector(state => state.review.isDeleteModalOpen)
    const seletectedReview = useSelector(state => state.review.selectedReview)

    const deleteReview = async () => {
        try {
            const response = await axios.post(`reseller/review/delete/${seletectedReview?.id}`);
            handleIsDeleteModalOpen();
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleIsDeleteModalOpen = () => {
        dispatch(setSelectedReview(null))
        dispatch(setIsDeleteModalOpen(false))
    }

    return (
        <Modal
            title="Delete review"
            centered
            open={isDeleteModalOpen}
            onOk={deleteReview}
            onCancel={handleIsDeleteModalOpen}
        >
            <div className='flex flex-col gap-3 p-5'>
                Are you sure to remove this review???
            </div>
        </Modal>
    )
}

export default DeleteModal