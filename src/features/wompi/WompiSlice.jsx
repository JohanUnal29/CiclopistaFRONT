import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    value: {
        transactionId:"",
        namePay:"", 
        emailPay:"",
        nameOrder:"",
        addressOrder:"",
        phoneOrder:"",
        regionOrder:"",
        cityOrder:"",
        status:"",
        referencia:"",
        numero:"",
        status_message:"",
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
        },
        setNameOrder: (state, actions) => {
            state.value.nameOrder = actions.payload
        },
        setAddressOrder: (state, actions) => {
            state.value.addressOrder = actions.payload
        },
        setPhoneOrder: (state, actions) => {
            state.value.phoneOrder = actions.payload
        },
        setRegionOrder: (state, actions) => {
            state.value.regionOrder = actions.payload
        },
        setCityOrder: (state, actions) => {
            state.value.cityOrder = actions.payload
        },
        setStatus2: (state, actions) => {
            state.value.status = actions.payload
        },
        setReferencia2: (state, actions) => {
            state.value.referencia = actions.payload
        },
        setNumero2: (state, actions) => {
            state.value.Numero = actions.payload
        },
        setStatus_message2: (state, actions) => {
            state.value.status_message = actions.payload
        }
    }
})

export const { setTransactionId, setNamePay2, setEmailPay2, setNameOrder, setAddressOrder, setPhoneOrder, setRegionOrder, setCityOrder, setStatus2, setReferencia2, setNumero2, setStatus_message2} = wompiSlice.actions

export default wompiSlice.reducer