import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    value: {
        transactionId:"",
        namePay:"", 
        emailPay:""
    }
}

export const wompiSlice = createSlice({
    name: "wompi",
    initialState,
    reducers: {
        setTransactionId: (state, actions) => {
            state.value.transactionId = actions.payload
        },
        setNamePay2: (state, actions) => {
            state.value.namePay = actions.payload
        },
        setEmailPay2: (state, actions) => {
            state.value.emailPay = actions.payload
        }
    }
})

export const { setTransactionId, setNamePay2, setEmailPay2 } = wompiSlice.actions

export default wompiSlice.reducer