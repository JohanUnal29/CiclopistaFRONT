import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: {
        show: false,
    }
}

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setShow: (state, actions) => {
            state.value.show = actions.payload
        }
    }
})

export const { setShow } = modalSlice.actions

export default modalSlice.reducer
