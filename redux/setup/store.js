import { configureStore } from "@reduxjs/toolkit"
import logger from "redux-logger"
import { rootReducers } from "./rootReducers.js"
import { reduxBatch } from '@manaflair/redux-batch'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const persistConfig = {
    key: 'root',
    storage
}
const persistedReducer = persistReducer(persistConfig, rootReducers)
export default function storeGenerator() {
    const store = configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(logger),
        devTools: process.env.NODE_ENV !== 'production',
        enhancers: [reduxBatch],
    })
    const persistor = persistStore(store)
    return { store, persistor }
}