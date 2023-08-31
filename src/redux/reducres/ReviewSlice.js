import { createSlice } from '@reduxjs/toolkit'


export const reviewSlice = createSlice({
  name: 'review',
  initialState: {
    review_type: "to_review",
    isModalOpen: false,
    selectedProductForReview: null,
    selectedReview: null,
    isDeleteModalOpen: false,
  },
  reducers: {
    setReviewType: (state, action) => {
      state.review_type = action.payload
    },
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload
    },
    setSelectedProductForReview: (state, action) => {
      state.selectedProductForReview = action.payload
    },
    setSelectedReview: (state, action) => {
      state.selectedReview = action.payload
    },
    setIsDeleteModalOpen: (state, action) => {
      state.isDeleteModalOpen = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  setReviewType,
  setIsModalOpen,
  setSelectedProductForReview,
  setSelectedReview,
  setIsDeleteModalOpen
} = reviewSlice.actions

export default reviewSlice.reducer