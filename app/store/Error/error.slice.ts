import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit"

interface IInitialState {
  isSnackBarVisible: boolean
  errorMessage: string
  type?: "error" | "success" | ""
}

const initialState: IInitialState = {
  isSnackBarVisible: false,
  errorMessage: "",
  type: "",
}

export const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (state: Draft<IInitialState>, action: PayloadAction<IInitialState>) => {
      state.isSnackBarVisible = action?.payload?.isSnackBarVisible
      state.errorMessage = action?.payload?.errorMessage
      state.type = "error"
    },
    setSuccess: (state: Draft<IInitialState>, action: PayloadAction<IInitialState>) => {
      state.isSnackBarVisible = action?.payload?.isSnackBarVisible
      state.errorMessage = action?.payload?.errorMessage
      state.type = "success"
    },
  },
})

export const { setError, setSuccess } = errorSlice.actions

export default errorSlice.reducer
