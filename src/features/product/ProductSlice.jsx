import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: {
        image:"",
    }
}

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setImage: (state, actions) => {
            state.value.image = actions.payload
        }
    }
})

export const { setImage } = productSlice.actions

export default productSlice.reducer
