import React, { useEffect } from 'react'
import FilterAttribute from '../components/FilterAttribute'
import Product from '../components/Product'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Search from '../components/Search'
import { useDispatch } from 'react-redux'
import { setSearchAttributes } from '../redux/reducres/FilterSlice'
import Categories from '../components/Categories'

const Filter = () => {

  const dispatch = useDispatch();
  const category_slug = useSelector(state => state.filter.category_slug)

  const getSearchAttributes = async () => {
    try {
      const response = await axios.get('search-attributes', {
        params: {
          "category_slug" : category_slug,
          // "category_ids" : category_ids,
          // "brand_ids" : brand_ids,
          // "color_codes" : color_codes,
          // "selected_attribute_values" : selected_attribute_values
        }
      });

      console.log(response.data.data);
      dispatch(setSearchAttributes(response.data.data))

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
    getSearchAttributes();
  }, [category_slug])

  return (
    <div className="mx-auto p-4 flex flex-col gap-3 items-center w-full">
      <div className='flex gap-3 w-full'>
        <Categories/>
        <Search/>
      </div>
      <div className='w-full flex gap-5 mt-5'>
        <div className="w-1/4">
          <FilterAttribute/>
        </div>
        <div className="w-3/4 bg-white">
          <Product/>
        </div>
      </div>
    </div>
  )
}

export default Filter