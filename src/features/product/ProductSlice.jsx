import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: {
        image:null,
    }
}

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setImage: (state, actions) => {
            state.value.image = actions.file
        }
    }
})

export const { setImage } = productSlice.actions

export default productSlice.reducer
