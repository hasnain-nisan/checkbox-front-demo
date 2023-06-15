
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import {RxCaretUp, RxCaretDown} from 'react-icons/rx'


function App() {

  const [showResults, setShowResults] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState(null);
  const [searchResult, setSearchResult] = useState(null)

  const [category_slug, set_category_slug] = useState(null);
  const [category_ids, set_category_ids] = useState([]);
  const [accordionOpenCategory, setAccordionOpenCategory] = useState(false);

  const [brand_ids, set_brand_ids] = useState([]);
  const [accordionOpenBrand, setAccordionOpenBrand] = useState(false);

  const [color_codes, set_color_codes] = useState([]);
  const [accordionOpenColors, setAccordionOpenColors] = useState(false);

  const [selected_attribute_values, set_selected_attribute_values] = useState({})
  const [accordionOpenAttrs, setAccordionOpenAttrs] = useState({});

  const handleCategoryChange = (id) => {
    if (category_ids.includes(id)) {
      set_category_ids(category_ids.filter((item) => item !== id));
    } else {
      set_category_ids([...category_ids, id]);
    }
  };

  const handleBrandChange = (id) => {
    if (brand_ids.includes(id)) {
      set_brand_ids(brand_ids.filter((item) => item !== id));
    } else {
      set_brand_ids([...brand_ids, id]);
    }
  };

  const handleColorChange = (code) => {
    if (color_codes.includes(code)) {
      set_color_codes(color_codes.filter((item) => item !== code));
    } else {
      set_color_codes([...color_codes, code]);
    }
  };

  const handleAttrChange = (id, value) => {
    set_selected_attribute_values((prevState) => {
      const updatedState = { ...prevState };

      if (!updatedState.hasOwnProperty(id)) {
        updatedState[id] = [value]; // Create a new property with the id and assign an array with the value
      } else {
        const valueArray = updatedState[id];

        if (valueArray.includes(value)) {
          // Value exists, remove it
          updatedState[id] = valueArray.filter((item) => item !== value);
        } else {
          // Value does not exist, add it
          updatedState[id] = [...valueArray, value];
        }
      }

      return updatedState;
    })
  }

  const isCheckboxChecked = (id, value) => {
    return (
      selected_attribute_values.hasOwnProperty(id) &&
      selected_attribute_values[id].includes(value)
    );
  };

  const toggleResults = () => {
    setShowResults(!showResults);
  };

  const toggleCategoryAccordion = () => {
    setAccordionOpenCategory(!accordionOpenCategory);
  };

  const toggleBrandAccordion = () => {
    setAccordionOpenBrand(!accordionOpenBrand);
  };

  const toggleColorAccordion = () => {
    setAccordionOpenColors(!accordionOpenColors);
  };

  const toggleAttrsAccordion = (id) => {
    setAccordionOpenAttrs((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // Toggle the value of the specific property
    }));
  };

  



  const getSearchSuggestions = async (e) => {
    try {
      const response = await axios.get('http://phpstack-924353-3259330.cloudwaysapps.com/api/v2/get-search-suggestions', {
        headers: {
          "checkbox-api-v2-key": "83324867-6668-4c04-bf36-91714ea8b3e3"
        },
        params: {
          "search": e.target.value  
        }
      });
      setSearchSuggestions(response.data.data)
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  }

  const getSearchProducts = async () => {
    try {
      const response = await axios.get('http://phpstack-924353-3259330.cloudwaysapps.com/api/v2/search', {
        headers: {
          "checkbox-api-v2-key": "83324867-6668-4c04-bf36-91714ea8b3e3"
        },
        params: {
          "category_slug" : category_slug,
          "category_ids" : category_ids,
          "brand_ids" : brand_ids,
          "color_codes" : color_codes,
          "selected_attribute_values" : selected_attribute_values
        }
      });

      setShowResults(false)
      setSearchResult(response.data.data)
      
      // Initialize accordionOpenAttrs with properties based on the response
      const initialOpenAttrs = response.data.data.search_attributes.attributes.reduce(
        (acc, attribut) => {
          acc[attribut.id] = accordionOpenAttrs.hasOwnProperty(attribut.id)
            ? accordionOpenAttrs[attribut.id]
            : false;
          return acc;
        },
        {}
      );

      setAccordionOpenAttrs(initialOpenAttrs);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  }

  useEffect(() => {
    getSearchProducts()
    console.log(selected_attribute_values)
  }, [category_slug, category_ids, brand_ids, color_codes, selected_attribute_values])

  return (
    <>
      <div className="mx-auto p-4">
        <div className="relative">
            <input
              type="text"
              placeholder="Search"
              id="searchBox"
              onClick={toggleResults}
              onChange={(e) => getSearchSuggestions(e)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {showResults && (
              <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg">
                {/* <!-- Search results here --> */}
                <div>
                  <label htmlFor="">Keyword</label>
                  <ul className="py-2 bg-gray-200">
                    {
                      searchSuggestions?.keywords.length > 0 ? (
                        searchSuggestions?.keywords.map((keyword, index) => (
                          <li key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">{keyword}</li>
                        ))
                      ) : (
                        <p className='px-5'>No keyword found</p>
                      )
                    }
                  </ul>
                </div>
                <div>
                  <label htmlFor="">Category</label>
                  <ul className="py-2 bg-gray-200">
                    {
                      searchSuggestions?.categories.length > 0 ? (
                        searchSuggestions?.categories.map((category, index) => (
                          <li key={index} data-slug={category.slug} className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={(e) => set_category_slug(e.target.dataset.slug)}
                          >
                            {category.name}
                          </li>
                        ))
                      ) : (
                        <p className='px-5'>No keyword found</p>
                      )
                    }
                  </ul>
                </div>
                <div>
                  <label htmlFor="">Collection</label>
                  <ul className="py-2 bg-gray-200">
                    {
                      searchSuggestions?.collections.length > 0 ? (
                        searchSuggestions?.collections.map((collection, index) => (
                          <li key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">{collection.name}</li>
                        ))
                      ) : (
                        <p className='px-5'>No keyword found</p>
                      )
                    }
                  </ul>
                </div>
              </div>
            )}
        </div> 
        <div className="flex">
          {/* Filter Section */}
          <div className="w-1/4 bg-gray-200 p-4">
            <h2 className="text-lg font-bold mb-4">Filters</h2>
            {/* Add your filter attributes here */}
            
            {/* Category Filter */}
            <div>
              <div className='flex items-center justify-between cursor-pointer' onClick={toggleCategoryAccordion}>
                <h3 className="text-md font-bold mb-2">
                  Categories
                </h3>
                <RxCaretUp className={`${accordionOpenCategory ? 'block' : 'hidden'}`}/>
                <RxCaretDown className={`${accordionOpenCategory ? 'hidden' : 'block'}`}/>
              </div>
              <div 
                className={`${accordionOpenCategory ? 'block' : 'hidden'}`}
              >
                {searchResult?.search_attributes?.categories.map((category, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`category-${index}`}
                      checked={category_ids.includes(category.id)}
                      onChange={() => handleCategoryChange(category.id)}
                      className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    />
                    <label htmlFor={`category-${index}`} className="ml-2">
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div>
              <div className='flex items-center justify-between cursor-pointer' onClick={toggleBrandAccordion}>
                <h3 className="text-md font-bold mb-2">
                  Brands
                </h3>
                <RxCaretUp className={`${accordionOpenBrand ? 'block' : 'hidden'}`}/>
                <RxCaretDown className={`${accordionOpenBrand ? 'hidden' : 'block'}`}/>
              </div>
              <div 
                className={`${accordionOpenBrand ? 'block' : 'hidden'}`}
              >
                {searchResult?.search_attributes?.brands.map((brand, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`brand-${index}`}
                      checked={brand_ids.includes(brand.id)}
                      onChange={() => handleBrandChange(brand.id)}
                      className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    />
                    <label htmlFor={`brand-${index}`} className="ml-2">
                      {brand.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Colors Filter */}
            <div>
              <div className='flex items-center justify-between cursor-pointer' onClick={toggleColorAccordion}>
                <h3 className="text-md font-bold mb-2">
                  Colors
                </h3>
                <RxCaretUp className={`${accordionOpenColors ? 'block' : 'hidden'}`}/>
                <RxCaretDown className={`${accordionOpenColors ? 'hidden' : 'block'}`}/>
              </div>
              <div 
                className={`${accordionOpenColors ? 'block' : 'hidden'}`}
              >
                {searchResult?.search_attributes?.colors.map((color, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`color-${index}`}
                      checked={color_codes.includes(color.code)}
                      onChange={() => handleColorChange(color.code)}
                      className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    />
                    <label htmlFor={`color-${index}`} className="ml-2">
                      {color.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Attributes Filter */}
            <div>
              {searchResult?.search_attributes?.attributes.map((attr, index) => (
                <div key={index}>
                  <div className='flex items-center justify-between cursor-pointer' 
                    onClick={() => toggleAttrsAccordion(attr.id)}
                  >
                    <h3 className="text-md font-bold mb-2">
                      {attr.name}
                    </h3>
                    <RxCaretUp className={`${accordionOpenAttrs[attr.id] === true ? 'block' : 'hidden'}`}/>
                    <RxCaretDown className={`${accordionOpenAttrs[attr.id] === true ? 'hidden' : 'block'}`}/>
                  </div>
                  <div 
                    className={`${accordionOpenAttrs[attr.id] === true ? 'block' : 'hidden'}`}
                  >
                    {attr.attribute_values.map((item, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          id={`color-${index}`}
                          checked={isCheckboxChecked(attr.id, item.value)}
                          onChange={() => handleAttrChange(attr.id, item.value)}
                          className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                        />
                        <label htmlFor={`color-${index}`} className="ml-2">
                          {item.value}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          

          {/* Product Section */}
          <div className="w-3/4 bg-white p-4">
            <h2 className="text-lg font-bold mb-4">Products</h2>
            {/* Add your product list here */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {searchResult?.products.data.map((product) => (
                <div key={product.id} className="bg-white p-4 shadow rounded-md">
                  <div className="aspect-w-3 aspect-h-2">
                    <img
                      src={product.thumbnail_image}
                      alt={product.name}
                      className="object-cover rounded-md"
                    />
                  </div>
                  <h3 className="text-lg font-bold mt-2 mb-1">{product.name}</h3>
                  <p className="text-gray-600">${product.price.calculable_price}</p>
                  {/* Add more product details here */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
