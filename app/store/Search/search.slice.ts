import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit"
import { SearchRes } from "../../services/api/Search/searc.api"

interface IInitialState {
  searchQuery: string
  scope:string
  limitSpace:string

  data: SearchRes[]
}

const initialState: IInitialState = {
  searchQuery: "",
  data: [],
  scope:'all',
  limitSpace:''

 
}

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (
      state: Draft<IInitialState>,
      action: PayloadAction<Pick<IInitialState, "searchQuery">>,
    ) => {
      state.searchQuery = action.payload?.searchQuery
    },
    setScope: (
      state: Draft<IInitialState>,
      action: PayloadAction<Pick<IInitialState, "scope">>,
    ) => {
      state.scope = action.payload?.scope
    },

    setLimitSpace: (
      state: Draft<IInitialState>,
      action: PayloadAction<Pick<IInitialState, "limitSpace">>,
    ) => {
      state.limitSpace = action.payload?.limitSpace
    },
    setSearchResult: (
      state: Draft<IInitialState>,
      action: PayloadAction<Pick<IInitialState, "data">>,
    ) => {
      state.data = action.payload?.data
    },
  },
})

export const {
  setSearchQuery,
  setScope,
  setLimitSpace,
  setSearchResult
} = searchSlice.actions

export default searchSlice.reducer
