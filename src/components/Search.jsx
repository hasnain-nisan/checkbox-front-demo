import axios from 'axios';
import { useState } from 'react'
import { setCategorySlug, setCollectionSlug, setKeyword } from '../redux/reducres/FilterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const Search = () => {

    const [showResults, setShowResults] = useState(false);
    const [searchSuggestions, setSearchSuggestions] = useState(null);

    const dispatch = useDispatch()
    const navigate = useNavigate();

    // const toggleResults = (val) => {
    //     setShowResults(val);
    // };

    const setSlug = (slug, type) => {
        if(type === 'category'){
            dispatch(setCategorySlug(slug))
        } else if (type === 'collection') {
            dispatch(setCollectionSlug(slug))
        } else {
            dispatch(setKeyword(slug))
        }
        navigate('/filter');
    }

    const getSearchSuggestions = async (e) => {
        try {
            if(e.target.value){
                const response = await axios.get('get-search-suggestions', {
                    params: {
                        "search": e.target.value  
                    }
                });
                setSearchSuggestions(response.data.data)
            } else {
                setSearchSuggestions(null)
            }
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    }

    return (
        <div className="relative w-full">
            <input
                type="text"
                placeholder="Search"
                id="searchBox"
                autoComplete="off"
                onFocus={() => setShowResults(true)}
                onBlur={() => setTimeout(() => {
                    setShowResults(false)
                }, 600)}
                onChange={(e) => getSearchSuggestions(e)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {showResults && (
                <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg p-3 max-h-[300px] overflow-y-scroll">
                {/* <!-- Search results here --> */}
                <div>
                    <label htmlFor="">Keyword</label>
                    <ul className="py-2 bg-gray-200">
                    {
                        searchSuggestions?.keywords.length > 0 ? (
                        searchSuggestions?.keywords.map((keyword, index) => (
                            <li key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => setSlug(keyword, 'keyword')}
                            >
                                {keyword}
                            </li>
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
                            <li key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => setSlug(category.slug, 'category')}
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
                            <li key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => setSlug(collection.slug, "collection")}
                            >
                                {collection.name}
                            </li>
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
    )
}

export default Search