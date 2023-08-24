import { createSlice } from '@reduxjs/toolkit'




export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    category_slug: null,
    priceRange: null,
    sortBy: null,
    searchAttributes: null,
    searchResult: null
  },
  reducers: {
    setCategorySlug: (state, action) => {
      state.category_slug = action.payload
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload
    },
    setSearchAttributes: (state, action) => {
      state.searchAttributes = action.payload
      console.log(state.searchAttributes);
    },
    setSearchResult: (state, action) => {
      state.searchResult = action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { 
  setCategorySlug, 
  setPriceRange,
  setSortBy, 
  setSearchAttributes, 
  setSearchResult 
} = filterSlice.actions

export default filterSlice.reducer