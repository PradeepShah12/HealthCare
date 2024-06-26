import AsyncStorage from "@react-native-async-storage/async-storage"

import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"
import SearchReducer from "./Search/search.slice"
import GeneralReducer from "./GeneralActions/general.slice"

import AuthReducer from "./Auth/auth.slice"
import ErrorReducer from "./Error/error.slice"
import UserReducer from "./User/user.slice"

const reducers = combineReducers({
  search: SearchReducer,
  auth:AuthReducer,
  error:ErrorReducer,
  user:UserReducer,
  general:GeneralReducer
})

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["theme", "auth","repos","user"],
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
    return middlewares
  },
})

const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: { users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export { store, persistor }
