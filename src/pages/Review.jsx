import { useEffect, useState } from "react";
import axios from "axios";
import OrderCard from "../components/review/OrderCard";
import { useSelector } from "react-redux";
import AddReviewModal from "../components/review/AddReviewModal";

const Review = () => {

    const review_type = useSelector(state => state.review.review_type)
    const [data, setData] = useState(null)

    const getReviewData = () => {
        if(review_type == 'to_review'){
            axios.get('reseller/review/to-review')
            .then(response => {
                // Handle the response data here
                console.log('Response:', response.data);
                setData(response.data.data)
            })
            .catch(error => {
                // Handle errors here
                console.error('Error:', error);
            });
        } else {
            console.log(review_type);
        }
    }


    useEffect(() => {
      getReviewData()
    }, [review_type])

    return (
        <div className="container mx-auto">
            <div className="flex w-full rounded-md">
                <div className={`w-1/2 py-5 text-center cursor-pointer hover:bg-gray-300 rounded-md ${review_type == 'to_review' ? 'bg-gray-300' : null}`}>
                    <span className="text-lg font-bold">
                        To review
                    </span>
                </div>
                <div className={`w-1/2 py-5 text-center cursor-pointer hover:bg-gray-300 rounded-md ${review_type != 'to_review' ? 'bg-gray-300' : null}`}>
                    <span className="text-lg font-bold">
                        Reviewed
                    </span>
                </div>
            </div>
            <div className="my-5 flex flex-col gap-3">
                {data?.data.map((order, index) => <OrderCard key={index} order={order}/>)}
            </div>
            <AddReviewModal/>
        </div>
    )
}

export default Review