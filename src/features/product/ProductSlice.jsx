import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: {
        product:'',
    }
}

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProduct: (state, actions) => {
            state.value.product = actions.payload
        }
    }
})

export const { setProduct } = productSlice.actions

export default productSlice.reducer
