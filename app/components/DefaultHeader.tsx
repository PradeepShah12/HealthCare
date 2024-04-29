import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import {  colors, spacing } from "../theme"
import { Text } from "./Text"
import { calculateRelativeHeight, calculateRelativeWidth } from "../utils/calculateRelativeDimensions"


import { IconBackground } from "./IconBackground"
import { DynamicIcon } from "./DynamicIcon"
import { NativeStackHeaderProps } from "@react-navigation/native-stack"
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs"
import { useAppSelector } from "../store"

export interface DefaultHeaderProps extends NativeStackHeaderProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  line?: StyleProp<ViewStyle>

}
export interface DefaultHeaderBottomTabProps extends BottomTabHeaderProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  line?: StyleProp<ViewStyle>

}

/**
 * Describe your component here
 */
export const DefaultHeader = (props: DefaultHeaderProps|DefaultHeaderBottomTabProps) => {
  const { style, line,navigation } = props
  const $styles = [$container, style]
  const $lineStyle = [$line, line]
  const {unreadMessage,unreadNotification}=useAppSelector(state=>state.user)

  return (
    <View style={$styles}>
      <Text style={$text} tx="common.healthCare" preset="h1bold" />
      <View style={{ width: spacing.tiny }} />
      <View style={$lineStyle} />
      <View style={$headerIcon}>
        <IconBackground onPress={()=>navigation.navigate("Search")}>
        <DynamicIcon iconFamily={"Feather"} iconName="search"   iconSize={calculateRelativeHeight(60)}    />
        </IconBackground>
      <IconBackground onPress={()=>navigation.navigate("Notification")}>
      <View style={$badgeStyle}>
  <Text text={unreadNotification?.toString()} style={$badgeTextStyle} preset="body3"/>
</View>
        <DynamicIcon iconFamily={"Entypo"} iconName="bell"       />
</IconBackground>
<IconBackground onPress={()=>navigation.navigate("Message")}>
<DynamicIcon iconFamily={"Feather"} iconName="message-circle"       />
{unreadMessage!==0&&<View style={$badgeStyle} >
  <Text text={unreadMessage?.toString()} style={$badgeTextStyle} preset="body3"/>
</View>}
</IconBackground>
      </View>
    </View>
  )
}

const $container: ViewStyle = {
  justifyContent: "space-evenly",
  flexDirection: "row",
  alignItems: "center",
  // paddingBottom: spacing.medium,
  paddingTop:spacing.huge,
  paddingBottom:spacing.small,

  paddingHorizontal: calculateRelativeWidth(16),

  backgroundColor:colors.palette.neutral100,
}

const $line: ViewStyle = {
  width: calculateRelativeWidth(100),
  borderBottomColor: colors.palette.primary100,
  borderBottomWidth:0.5,
  alignSelf:'center',
}

const $text: TextStyle = {
  color: colors.palette.primary100,
}

const $headerIcon:ViewStyle={
  // borderWidth:1,
  flex:1,
  flexDirection:'row',
  justifyContent:'space-evenly'
}

const $badgeStyle:ViewStyle={
  backgroundColor:colors.palette.secondary200,
  borderRadius:spacing.large,
  width:spacing.large,
  height:spacing.large,
  position:'absolute',
  bottom:30,
  right:0,
  alignItems:'center',
  padding:spacing.tiny,
  justifyContent:'center'
}

const $badgeTextStyle:TextStyle={
  color:colors.palette.neutral100,
  textAlignVertical:'center',
}