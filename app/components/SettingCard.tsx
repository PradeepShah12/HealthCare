import * as React from "react"
import { PressableProps, StyleProp, TouchableOpacity, ViewStyle } from "react-native"
import { $globalViewStyles, colors, spacing } from "../theme"
import { Text } from "./Text"
import { DynamicIcon } from "./DynamicIcon"
import { Spacer } from "./Spacer"
import { calculateRelativeWidth } from "../utils/calculateRelativeDimensions"
import { Button } from "./Button"

export interface SettingCardProps extends PressableProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  title: string
  iconName:string
  noBorder?:boolean
  iconFamily?:"AntDesign" | "Entypo" | "EvilIcons" | "Feather" | "FontAwesome" | "FontAwesome5" | "FontAwesome5Pro" | "Fontisto" | "Foundation" | "Ionicons" | "MaterialCommunityIcons" | "MaterialIcons" | "Octicons" | "SimpleLineIcons" | "Zocial"
}

/**
 * Describe your component here
 */
export const SettingCard = (props: SettingCardProps) =>{
  const { style,title,iconName,iconFamily,noBorder} = props
  const $styles = style

  return (
      <Button {...props} style={[$globalViewStyles.rowCenter,$cardWrapper,$styles,$globalViewStyles.center]}>
        <DynamicIcon iconName={iconName} iconFamily={iconFamily} iconSize={20} />
        <Spacer size="medium" orientation="width"/>
        <Text text={title} preset="body2"/>
             </Button>
  )
}



const $noBorder:ViewStyle={
  borderRadius:0,
}

const $cardWrapper:ViewStyle={
  backgroundColor:colors.palette.neutral100,
  paddingHorizontal:spacing.small,
  paddingVertical:spacing.extraMedium,
  minWidth:calculateRelativeWidth(170),
  borderRadius:spacing.small,
  alignItems:'center',
alignContent:'center',
  // justifyContent:'space-between'
}