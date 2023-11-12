import axios from "axios";
import { useState } from "react";


const Product = () => {
  const [id, setId] = useState(null);
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

  return (
    <div>
      <section className="flex justify-center mt-10">
        <input placeholder="Enter product id"
          className="border-2 transition duration-500 placeholder-blue-400 focus:placeholder-transparent border-blue-400 w-4/12 py-2 text-center text-blue-400 bg-transparent rounded-md focus:outline-none "
          type="number"
          onChange={(e) => setId(e.target.value)}
        />
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={() => dowloadPhotos()}
        >
          Download Photos
        </button>
      </section>
    </div>
  );
};

export default Product;
