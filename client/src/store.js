import { configureStore } from '@reduxjs/toolkit';
import colorsReducer from './features/colors'
import serverReducer from './features/serverPort'

export default configureStore({
  reducer: {
    colors: colorsReducer,
    server: serverReducer
  },
})