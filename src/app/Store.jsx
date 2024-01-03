import { configureStore } from '@reduxjs/toolkit'

import wompiReducer from "../../src/features/wompi/WompiSlice.jsx"

export const store = configureStore({
    reducer: {
        counter: wompiReducer
    },
})