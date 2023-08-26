import React, { useEffect } from 'react'
import SortBy from './SortBy'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import { setProducts } from '../redux/reducres/FilterSlice';

const Product = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const category_slug = useSelector(state => state.filter.category_slug)
    const collection_slug = useSelector(state => state.filter.collection_slug)
    const brand_ids = useSelector((state) => state.filter.brand_ids)
    const color_codes = useSelector((state) => state.filter.color_codes)
    const selected_attribute_values = useSelector((state) => state.filter.selected_attribute_values)
    const products = useSelector((state) => state.filter.products?.data)
    const getSearchProducts = async () => {
      try {

          const response = await axios.get('search', {
            params: {
              "category_slug" : category_slug,
              // "category_ids" : category_ids,
              "collection_slug": collection_slug,
              "brand_ids" : brand_ids,
              "color_codes" : color_codes,
              "selected_attribute_values" : selected_attribute_values
            }
          });

          console.log(generateFilterURL({
            "category_slug" : category_slug,
            // "category_ids" : category_ids,
            "collection_slug": collection_slug,
            "brand_ids" : brand_ids,
            "color_codes" : color_codes,
            "selected_attribute_values" : selected_attribute_values
          }), 'filterurl');
          navigate('/filter?' + response.request['responseURL'].split('search?')[1])
          dispatch(setProducts(response.data.data))
          console.log(response.data.data);


          // setShowResults(false)
          // setSearchResult(response.data.data)
        
          // Initialize accordionOpenAttrs with properties based on the response
          // const initialOpenAttrs = response.data.data.search_attributes.attributes.reduce(
          //   (acc, attribut) => {
          //     acc[attribut.id] = accordionOpenAttrs.hasOwnProperty(attribut.id)
          //       ? accordionOpenAttrs[attribut.id]
          //       : false;
          //     return acc;
          //   },
          //   {}
          // );

          // setAccordionOpenAttrs(initialOpenAttrs);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    }

    function generateFilterURL(data) {
        // const baseUrl = 'http://127.0.0.1:5173/filter';
        const queryParams = [];

        for (const [key, value] of Object.entries(data)) {
            if (value !== null) {
                if (Array.isArray(value)) {
                    value.forEach((item, index) => {
                        if (item !== null) {
                            queryParams.push(`${key}[${index}]=${encodeURIComponent(item)}`);
                        }
                    });
                } else if (typeof value === 'object') {
                    for (const [nestedKey, nestedValue] of Object.entries(value)) {
                        if (nestedValue !== null) {
                            queryParams.push(`${key}[${nestedKey}][0]=${encodeURIComponent(nestedValue[0])}`);
                        }
                    }
                } else {
                    queryParams.push(`${key}=${encodeURIComponent(value)}`);
                }
            }
        }

        if (queryParams.length > 0) {
            return queryParams.join('&');
        } else {
            return null;
        }
    }

  const data = {
      "category_slug": null,
      "collection_slug": "demo-collection",
      "brand_ids": [1, null, 3],
      "color_codes": ["#FF0000", null, "#0000FF"],
      "selected_attribute_values": {
          1: ["M", "L"],
          3: null
      }
  };

  const filterURL = generateFilterURL(data);
  console.log(filterURL);


    useEffect(() => {
      getSearchProducts();
    }, [category_slug, collection_slug, brand_ids, color_codes, selected_attribute_values])

    return (
      <div>
        <div className='flex items-center justify-between'>
          <h1 className='text-lg'>Products</h1>
          <SortBy/>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products?.map((product, index) => <ProductCard product={product} key={index}/> )}
        </div>
      </div>
    )
}

export default Product