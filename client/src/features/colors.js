import { createSlice } from '@reduxjs/toolkit'

export const colorsSlice = createSlice({
    name: 'colors',
    initialState: {
        value: {}
    },
    reducers: {
        colorsFromDb(state, action) {
            state.value = {...action.payload}
        }
    }
})

export const { colorsFromDb } = colorsSlice.actions

export default colorsSlice.reducer