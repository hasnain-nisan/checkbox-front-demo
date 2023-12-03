import axios from 'axios';
import React, { useState } from 'react'

const Collection = () => {

    const getCollection = async (slug) => {
        const response = await axios.get("collection/details/" + slug, {
          params: {
            type: "facebook_post",
          },
        });
        console.log(response);
    }

    const loginToFacebook = async () => {
        window.FB.getLoginStatus(function (response) {
            if (response.status === "connected") {
            // setShowPostFbModal(true);
            // queryClient.invalidateQueries(["product-details", productId]);
            // getPages();
            console.log("logged in");
            } else {
            window.FB.login(
                function (response) {
                console.log(response);
                // if (response.status === "connected") {
                //   setShowPostFbModal(true);
                //   queryClient.invalidateQueries(["product-details", productId]);
                //   getPages();
                // }
                },
                {
                config_id: "234722492618784", // configuration ID goes here
                response_type: "code", // must be set to 'code' for SUAT
                }
            );
            }
        });
    };

    return (
        <div>
            <section className="flex justify-center mt-10 gap-2">
                <input
                    placeholder="Enter collection slug"
                    className="border-2 transition duration-500 placeholder-blue-400 focus:placeholder-transparent border-blue-400 w-4/12 py-2 text-center text-blue-400 bg-transparent rounded-md focus:outline-none "
                    type="text"
                    onChange={(e) => getCollection(e.target.value)}
                />
                <button
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    onClick={() => loginToFacebook()}
                >
                Post on Facebook
                </button>
            </section>
        </div>
    );
}

export default Collection