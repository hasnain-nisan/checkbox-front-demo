import React, { useEffect } from 'react'
import SortBy from './SortBy'
import axios from 'axios';
import { useSelector } from 'react-redux';

const Product = () => {

    const category_slug = useSelector(state => state.filter.category_slug)
    const getSearchProducts = async () => {
      try {
          const response = await axios.get('search', {
            params: {
              "category_slug" : category_slug,
              // "category_ids" : category_ids,
              // "brand_ids" : brand_ids,
              // "color_codes" : color_codes,
              // "selected_attribute_values" : selected_attribute_values
            }
          });

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
    }, [category_slug])

    return (
      <div>
        <div className='flex items-center justify-between'>
          <h1>Products</h1>
          <SortBy/>
        </div>
      </div>
    )
}

export default Product