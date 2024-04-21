import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit"

interface IInitialState {
  openFeed: string

}

const initialState: IInitialState = {
    openFeed: "",
}

export const generalSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setOpenFeed: (
      state: Draft<IInitialState>,
      action: PayloadAction<Pick<IInitialState, "openFeed">>,
    ) => {
      state.openFeed = action.payload?.openFeed
    },

  },
})

export const {
    setOpenFeed
} = generalSlice.actions

export default generalSlice.reducer
