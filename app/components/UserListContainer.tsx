import * as React from "react"
import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native"
import { $globalViewStyles, spacing, } from "../theme"
import { Text } from "./Text"
import { AutoImage } from "./AutoImage"
import { Spacer } from "./Spacer"
import { placeHolder } from "../utils/constants"
import { ImageStyle } from "react-native-fast-image"
import { User } from "../services/api/Auth/types"
import { navigate } from "../navigators"
import { useAppSelector } from "../store"

export interface UserListContainerProps {
  /**
   * An optional style override useful for padding & margin.
   */
  data:User
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const UserListContainer = (props: UserListContainerProps) =>{
  const { style ,data} = props
  const $styles = [$container, style]
  const user= useAppSelector(state=>state.user.user)
console.log(data,'user data')
  return(
    <TouchableOpacity 
    onPress={() => user.id === data?.id ? navigate('Menu', { screen: 'MyProfile', initial: false }) : navigate('Menu', { screen: 'OtherProfile', initial: false, params: { data: data } })}
    style={[$globalViewStyles.rowCenter,$globalViewStyles.justifyStart]}>
            <Spacer size={"small"} orientation="width" />

      <AutoImage source={{uri:data?.image}} maxWidth={48} maxHeight={48} style={$imageStyle}/>
      <Spacer size={"medium"} orientation="width" />
      <Text preset="body2bold" text={`${data.firstname} ${data.lastname}`}/>
    </TouchableOpacity>
  )
}

const $container: ViewStyle = {
  justifyContent: "center",
}



const $imageStyle:ImageStyle={
  borderRadius:spacing.huge
}