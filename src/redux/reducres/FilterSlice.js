import { createSlice } from '@reduxjs/toolkit'




export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    category_slug: null,
    collection_slug: null,
    keyword: null,
    priceRange: null,
    sortBy: null,
    brand_ids: [],
    color_codes: [],
    selected_attribute_values: {},
    searchAttributes: null,
    products: null,
    searchResult: null
  },
  reducers: {
    setCategorySlug: (state, action) => {
      state.collection_slug = null
      state.keyword = null
      state.priceRange = null
      state.sortBy = null
      state.brand_ids = []
      state.color_codes = []
      state.selected_attribute_values = {}

      state.category_slug = action.payload
    },
    setCollectionSlug: (state, action) => {
      state.category_slug = null
      state.keyword = null
      state.priceRange = null
      state.sortBy = null
      state.brand_ids = []
      state.color_codes = []
      state.selected_attribute_values = {}

      state.collection_slug = action.payload
    },
    setKeyword: (state, action) => {
      state.category_slug = null
      state.collection_slug = null
      state.priceRange = null
      state.sortBy = null
      state.brand_ids = []
      state.color_codes = []
      state.selected_attribute_values = {}

      state.keyword = action.payload
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload
    },
    setBrandIds: (state, action) => {
      state.brand_ids = action.payload
    },
    setColorCodes: (state, action) => {
      state.color_codes = action.payload
    },
    set_selected_attribute_values: (state, action) => {
      state.selected_attribute_values = action.payload
    },
    setSearchAttributes: (state, action) => {
      state.searchAttributes = action.payload
    },
    setProducts: (state, action) => {
      state.products = action.payload
    },
    setSearchResult: (state, action) => {
      state.searchResult = action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { 
  setCategorySlug, 
  setCollectionSlug,
  setKeyword,
  setPriceRange,
  setSortBy, 
  setBrandIds,
  setColorCodes,
  set_selected_attribute_values,
  setSearchAttributes, 
  setProducts,
  setSearchResult 
} = filterSlice.actions

export default filterSlice.reducer