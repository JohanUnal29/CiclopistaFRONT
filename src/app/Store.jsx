import { configureStore } from '@reduxjs/toolkit'

import wompiReducer from "../../src/features/wompi/WompiSlice.jsx"
import productReducer from "../../src/features/product/ProductSlice.jsx"
import modalReducer from "../../src/features/modal/ModalSlice.jsx"

export const store = configureStore({
    reducer: {
        wompi: wompiReducer,
        product: productReducer,
        modal: modalReducer
    },
})