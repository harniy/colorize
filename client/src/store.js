import { configureStore } from '@reduxjs/toolkit';
import colorsReducer from './features/colors'

export default configureStore({
  reducer: {
    colors: colorsReducer
  },
})