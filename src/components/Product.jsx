import React, { useEffect } from 'react'
import SortBy from './SortBy'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import { setProducts } from '../redux/reducres/FilterSlice';
import { debounce } from 'lodash';

const Product = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const category_slug = useSelector(state => state.filter.category_slug)
    const collection_slug = useSelector(state => state.filter.collection_slug)
    const keyword = useSelector(state => state.filter.keyword)
    const sortBy =  useSelector(state => state.filter.sortBy)
    const priceRange =  useSelector(state => state.filter.priceRange)
    const brand_ids = useSelector((state) => state.filter.brand_ids)
    const color_codes = useSelector((state) => state.filter.color_codes)
    const selected_attribute_values = useSelector((state) => state.filter.selected_attribute_values)
    const products = useSelector((state) => state.filter.products?.data)
    
    const getSearchProducts = async () => {
      try {
          let paramms = {
              "category_slug" : category_slug,
              "collection_slug": collection_slug,
              "keyword": keyword,
              "sort_by": sortBy,
              "min_price": priceRange ? priceRange[0] : null,
              "max_price": priceRange ? priceRange[1] : null,
              "brand_ids" : brand_ids,
              "color_codes" : color_codes,
              "selected_attribute_values" : selected_attribute_values
          }

          let uri = generateFilterURL(paramms)
          navigate('/filter?' + uri)

          const response = await axios.get('search', {
            params: paramms
          });

          dispatch(setProducts(response.data.data))


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
                    const queryParamsNested = [];
                    console.log(value);
                    for (const [nestedKey, nestedValue] of Object.entries(value)) {
                        if(nestedValue.length > 0){
                          nestedValue.forEach((value, index) => {
                            queryParamsNested.push(`${key}[${nestedKey}][${index}]=${encodeURIComponent(value)}`);
                          })
                        }
                    }
                    if (queryParamsNested.length > 0) {
                        queryParams.push(queryParamsNested.join('&'));
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


    useEffect(() => {
      getSearchProducts()
    }, [category_slug, collection_slug, keyword, sortBy, priceRange, brand_ids, color_codes, selected_attribute_values])

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