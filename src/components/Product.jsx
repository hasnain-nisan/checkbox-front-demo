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