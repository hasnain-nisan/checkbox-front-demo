import { configureStore } from '@reduxjs/toolkit'
import filterReducers from './reducres/FilterSlice'

export default configureStore({
  reducer: {
    filter: filterReducers
  }
})