import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reduxStore/state.js"
import storage from 'redux-persist/lib/storage';
import { Provider } from "react-redux";
import { persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from 'redux-persist';
  import { PersistGate } from 'redux-persist/integration/react';

  const persistConfig = {
    key: 'drive',
    version: 1,
    storage,
    
  }

  const persistedReducer = persistReducer(persistConfig, authReducer);
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });



ReactDOM.createRoot(document.getElementById('root')).render(

    <Provider store={store}>
    <PersistGate loading={null} persistor={persistStore(store)}>
      <App />
    </PersistGate>
  </Provider>
  
)
