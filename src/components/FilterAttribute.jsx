import { Button } from 'antd';
import React, { useEffect, useState } from 'react'
import { RxCaretDown, RxCaretUp } from 'react-icons/rx'
import {MdOutlineCancel} from 'react-icons/md'
import CategoryAttr from './CategoryAttr';
import PriceRange from './PriceRange';
import Brands from './Brands';
import Colors from './Colors';
import VariationAttributes from './VariationAttributes';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { resetAll, setSearchAttributes } from '../redux/reducres/FilterSlice';

const FilterAttribute = () => {

    const dispatch = useDispatch();
    const category_slug = useSelector(state => state.filter.category_slug)
    const collection_slug = useSelector(state => state.filter.collection_slug)
    const keyword = useSelector(state => state.filter.keyword)

    const getSearchAttributes = async () => {
      try {
        const response = await axios.get('search-attributes', {
          params: {
            "category_slug" : category_slug,
            "collection_slug" : collection_slug,
            'keyword': keyword
          }
        });
        dispatch(setSearchAttributes(response.data.data))
        
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

    const reset = () => {
      dispatch(resetAll())
    }

    useEffect(() => {
      getSearchAttributes();
    }, [category_slug, collection_slug, keyword])

  return (
    <div>
        <Button className='flex items-center justify-center gap-3 w-full p-5' onClick={() => reset()}>
          <MdOutlineCancel/>
          Reset all filter
        </Button>

        <div className='mt-10'>
              <CategoryAttr/>
              <PriceRange/>
              <Brands/>
              <Colors/>
              <VariationAttributes/>
        </div>
    </div>
  )
}

export default FilterAttribute