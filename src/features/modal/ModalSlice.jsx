import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: {
        show: false,
        show2: false,
    }
}

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setShow: (state, actions) => {
            state.value.show = actions.payload
        },
        setShow2: (state, actions) => {
            state.value.show = actions.payload
        }
    }
})

export const { setShow, setShow2 } = modalSlice.actions

export default modalSlice.reducer
