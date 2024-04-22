import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit"

interface IInitialState {
  isAuthenticated?: boolean
  token?: string

  fcmToken?: string

}

const initialState: IInitialState = {
  isAuthenticated: false,
  token: "",

  
  fcmToken: "",

}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setFcmToken: (state: Draft<IInitialState>, action: PayloadAction<IInitialState>) => {
      state.fcmToken = action?.payload?.fcmToken
    },
    userLogin: (state: Draft<IInitialState>, action: PayloadAction<IInitialState>) => {
      state.isAuthenticated = action.payload?.isAuthenticated || state.isAuthenticated
      state.token = action.payload?.token || state.token

    },
    updateToken: (state: Draft<IInitialState>, action: PayloadAction<IInitialState>) => {
      state.token = action.payload?.token
    },
    userLogout: (state: Draft<IInitialState>) => {
      state.isAuthenticated = initialState.isAuthenticated
      state.token = initialState.token
      state.fcmToken=initialState.fcmToken
    },
  },
})

export const { userLogin, updateToken, userLogout, setFcmToken } = authSlice.actions

export default authSlice.reducer
