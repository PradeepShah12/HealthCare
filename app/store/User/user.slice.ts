import { createSlice, DeepPartial, Draft, PayloadAction } from "@reduxjs/toolkit"
import { User } from "../../services/api/Auth/types"

interface IInitialState {
  user?: DeepPartial<User>
  unreadMessage:number
  unreadNotification:number


}

const initialState: IInitialState = {
  user: {
    id: 0,
    guid: '',
    email: '',
    username: '',
    display_name: '',
    firstname: '',
    lastname: '',
    bio: '',
    followers: 0,
    following: 0,
    friends: 0,
    spaces: 0,
    url: '',
    image: '',
    contentcontainer_id:0,
  },
  unreadMessage:0,
  unreadNotification:0

}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: Draft<IInitialState>, action: PayloadAction<Pick<IInitialState,"user">>) => {
      state.user = action.payload?.user
    },
    removeUser: (state: Draft<IInitialState>) => {
      state.user = initialState.user
    },
    setUnreadMessage:(state: Draft<IInitialState>, action: PayloadAction<IInitialState>)=>{
      state.unreadMessage= action.payload?.unreadMessage
      state.unreadNotification= action.payload?.unreadNotification
    }
  },
})

export const { setUser, removeUser,setUnreadMessage } = userSlice.actions

export default userSlice.reducer
