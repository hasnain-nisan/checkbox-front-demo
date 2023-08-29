import { createSlice } from '@reduxjs/toolkit'


export const reviewSlice = createSlice({
  name: 'review',
  initialState: {
    review_type: "to_review",
    isModalOpen: false,
  },
  reducers: {
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const {
  setIsModalOpen
} = reviewSlice.actions

export default reviewSlice.reducer