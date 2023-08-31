import { useEffect, useState } from "react";
import axios from "axios";
import OrderCard from "../components/review/OrderCard";
import { useDispatch, useSelector } from "react-redux";
import AddReviewModal from "../components/review/AddReviewModal";
import { setReviewType } from "../redux/reducres/ReviewSlice";
import DeleteModal from "../components/review/DeleteModal";
import EditReviewModal from "../components/review/EditReviewModal";

const Review = () => {

    const dispatch = useDispatch();
    const review_type = useSelector(state => state.review.review_type)
    const isModalOpen = useSelector(state => state.review.isModalOpen)
    const isDeleteModalOpen = useSelector(state => state.review.isDeleteModalOpen)
    const isEditModalOpen = useSelector(state => state.review.isEditModalOpen)
    const [data, setData] = useState(null)

    const getReviewData = () => {
        if(review_type == 'to_review'){
            axios.get('reseller/review/to-review')
            .then(response => {
                // Handle the response data here
                setData(response.data.data)
            })
            .catch(error => {
                // Handle errors here
                console.error('Error:', error);
            });
        } else {
            axios.get('reseller/review/reviewed')
            .then(response => {
                // Handle the response data here
                setData(response.data.data)
            })
            .catch(error => {
                // Handle errors here
                console.error('Error:', error);
            });
        }
    }

    const handleReviewState = (value) => {
        dispatch(setReviewType(value))
    }


    useEffect(() => {
      getReviewData()
    }, [review_type, isModalOpen, isDeleteModalOpen, isEditModalOpen])

    return (
        <div className="container mx-auto">
            <div className="flex w-full rounded-md">
                <div className={`w-1/2 py-5 text-center cursor-pointer hover:bg-gray-300 rounded-md ${review_type == 'to_review' ? 'bg-gray-300' : null}`}
                    onClick={() => handleReviewState("to_review")}
                >
                    <span className="text-lg font-bold">
                        To review
                    </span>
                </div>
                <div className={`w-1/2 py-5 text-center cursor-pointer hover:bg-gray-300 rounded-md ${review_type == 'reviewed' ? 'bg-gray-300' : null}`}
                    onClick={() => handleReviewState("reviewed")}
                >
                    <span className="text-lg font-bold">
                        Reviewed
                    </span>
                </div>
            </div>
            <div className="my-5 flex flex-col gap-3">
                {data?.data.map((order, index) => <OrderCard key={index} order={order}/>)}
            </div>
            <AddReviewModal/>
            <DeleteModal/>
            <EditReviewModal/>
        </div>
    )
}

export default Review