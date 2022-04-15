import { configureStore } from "@reduxjs/toolkit"
import logger from "redux-logger"
import { rootReducers } from "./rootReducers.js"
import { reduxBatch } from '@manaflair/redux-batch'
export const store = configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
    enhancers: [reduxBatch],
})