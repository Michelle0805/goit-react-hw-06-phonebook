// store.js
import { combineReducers } from 'redux';
// import { devToolsEnhancer } from '@redux-devtools/extension';
// import { contactsReducer } from '../redux/reducers';
// import { filterReducer } from '../redux/reducers';
import { contactsSlice } from '../redux/contactsSlice';
import { filterSlice } from '../redux/filterSlice';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web


// Combine your reducers
const rootReducer = combineReducers({
  contacts: contactsSlice.reducer,
  filter: filterSlice.reducer,
});

// Create the persist config object
const persistConfig = {
  key: 'root', // The key property uniquely identifies the persisted state in the storage.
  storage, // The storage property specifies the underlying storage engine where the state will be persisted.
  // You can specify which parts of your state you want to persist here
  whitelist: ['contacts'], // In your case, you probably only want to persist contacts
};

// Wrap your rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: {
//     // contacts: contactsReducer,
//     // filter: filterReducer,
//     contacts: contactsSlice.reducer,
//     filter: filterSlice.reducer,
//   },
//   // The middleware and devTools enhancer are automatically included by default, so you don't need to specify them.
// });

// Create the store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Export the persisted store
export const persistor = persistStore(store);