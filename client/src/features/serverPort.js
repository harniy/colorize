import { createSlice } from '@reduxjs/toolkit'

export const serverSlice = createSlice({
    name: 'server',
    initialState: {
        url: 'https://colorized.ml/api/'
    },
    reducers: {
        setServerPort(state) {
            if(state.server === false) {
                state.url = 'http://localhost:4000/'
            } else {
                state.url = 'https://colorized.ml/api/'
            }
        }
    }
})

export const { setServerPort } = serverSlice.actions

export default serverSlice.reducer