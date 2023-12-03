import axios from "axios";
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './product.css';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';


const Product = () => {
  const [id, setId] = useState(null);
  const [product, setProduct] = useState(null);
  const [swiperData, setSwiperData] = useState([])

  const getProduct = async () => {
    try {
      const res = await axios.get('products/' + id);
      setProduct(res.data.data);
      let photos = res.data.data.photos;
      photos.map((photo) => {
        photo.type = "photo"
      })
      let video = res.data.data.video;
      video.type = 'video';
      photos.push(res.data.data.video);
      setSwiperData(photos)
    } catch (error) {
      console.log(error)
    }
  }

  const dowloadPhotos = async () => {
    try {
      const response = await axios.get("products/download/" + id);

      if (response.status == 200) {
        let paths = response.data.paths;
        let product_id = response.data.product_id;
        paths.forEach((element) => {
          axios
            .get("get-photo", {
              params: {
                product_id,
                url: element,
              },
            })
            .then((res) => downloadImage(res.data));
        });
      } else {
        console.error("Error fetching image paths:", "ass");
      }
    } catch (error) {
      console.error("Error fetching image paths:", "error.message");
    }
  };

  async function downloadImage(data) {
    let base64 = data.base64;
    let mimeType = data.mimeType;
    let filename = data.fileName;

    const response = await fetch("data:" + mimeType + ";base64," + base64);

    const blobImage = await response.blob();

    const href = URL.createObjectURL(blobImage);

    const anchorElement = document.createElement("a");
    anchorElement.href = href;
    anchorElement.download = filename;

    document.body.appendChild(anchorElement);
    anchorElement.click();

    document.body.removeChild(anchorElement);
    window.URL.revokeObjectURL(href);
  }

  const loginToFacebook = async () => {
    window.FB.getLoginStatus(function (response) {
      if (response.status === "connected") {
        // setShowPostFbModal(true);
        // queryClient.invalidateQueries(["product-details", productId]);
        // getPages();
        console.log('logged in');
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
          placeholder="Enter product id"
          className="border-2 transition duration-500 placeholder-blue-400 focus:placeholder-transparent border-blue-400 w-4/12 py-2 text-center text-blue-400 bg-transparent rounded-md focus:outline-none "
          type="number"
          onChange={(e) => setId(e.target.value)}
        />
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={() => getProduct()}
        >
          Get product
        </button>
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={() => dowloadPhotos()}
        >
          Download Photos
        </button>
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={() => loginToFacebook()}
        >
          Post on Facebook
        </button>
      </section>

      {swiperData.length > 0 && (
        <Swiper
          pagination={{
            // type: 'progressbar',
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper mt-10"
        >
          {swiperData.map((data, index) => (
            <SwiperSlide key={index}>
              {data.type === 'photo' ? (
                <img src={data.path} alt={`Photo ${index}`} style={{
                  width: "500px",
                  height: "300px"
                }}/>
              ) : (
                <iframe width="500" height="300" src={data.iframe_url} frameBorder="0" allowfullscreen></iframe>
                // <video controls>
                //   <source src={data.url} type="video/mp4" />
                //   Your browser does not support the video tag.
                // </video>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Product;
