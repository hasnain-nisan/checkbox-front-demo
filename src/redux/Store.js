import { configureStore } from '@reduxjs/toolkit'
import filterReducers from './reducres/FilterSlice'
import reviewReducres from './reducres/ReviewSlice'

export default configureStore({
  reducer: {
    filter: filterReducers,
    review: reviewReducres
  }
})