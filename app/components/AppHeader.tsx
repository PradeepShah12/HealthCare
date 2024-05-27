import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import {  colors, spacing } from "../theme"
import { Text } from "./Text"
import { calculateRelativeHeight, calculateRelativeWidth } from "../utils/calculateRelativeDimensions"


import { IconBackground } from "./IconBackground"
import { DynamicIcon } from "./DynamicIcon"
import { NativeStackHeaderProps } from "@react-navigation/native-stack"
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs"
import { goBack } from "app/navigators"
import { Spacer } from "./Spacer"
import { useRoute } from "@react-navigation/native"

export interface AppHeaderProps extends NativeStackHeaderProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  line?: StyleProp<ViewStyle>

}
export interface AppHeaderBottomTabProps extends BottomTabHeaderProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  line?: StyleProp<ViewStyle>
  noBack?:boolean

}

/**
 * Describe your component here
 */
export const AppHeader = (props: AppHeaderProps|AppHeaderBottomTabProps) => {
  const { style, line,navigation, } = props
  const route= useRoute()
  const $styles = [$container, style]
  const $lineStyle = [$line, line]
  return (
    <View style={$styles}>
      <View style={{width:'32%'}}>

      {route.name!=="LoggedIn"&&<IconBackground onPress={()=>goBack()} style={{height:calculateRelativeHeight(30) , width:calculateRelativeHeight(30),borderWidth:1,borderRadius:calculateRelativeHeight(30),alignItems:'center',justifyContent:'center'}} >
<DynamicIcon iconName="chevron-left" iconFamily="FontAwesome"  />
</IconBackground>}
</View><View>

<Spacer size="small" orientation="width"/>
      <Text style={$text} tx="common.healthCare" preset="h1bold" />
      <View style={{ width: spacing.tiny }} />
      {/* <View style={$lineStyle} /> */}
      </View>

      <View style={$headerIcon}>
     
<IconBackground onPress={()=>navigation.navigate("Profile")}>
<DynamicIcon iconName="user-circle" iconSize={calculateRelativeHeight(30)} iconFamily="FontAwesome"  />
</IconBackground>
      </View>
    </View>
  )
}

const $container: ViewStyle = {
  justifyContent: "space-between",
  flexDirection: "row",
  alignItems: "center",
  minWidth:'100%',
  // borderWidth:1,
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
  // flex:1,
  flexDirection:'row',
  justifyContent:'space-evenly',
  width:"33%"
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