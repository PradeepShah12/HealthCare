import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { colors, typography } from "../theme"
import { Text } from "./Text"
import { DynamicIcon } from "./DynamicIcon"

export interface EmptyContentProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  iconFamily?:string
  title:string
  iconName:string
  desc:string

}

/**
 * Describe your component here
 */
export const EmptyContent = (props: EmptyContentProps) =>{
  const { style,iconName,iconFamily,title,desc } = props
  const $styles = [$container, style]

  return (
    <View style={[$styles,$fullScreenContianer]}>
    {/* <Background /> */}
    <View style={$centeredContianer}>
      <DynamicIcon
           iconFamily="FontAwesome"
           iconName={iconName}
        iconSize={100}
        iconColor={colors.palette.secondary100}
      />
      <Text preset="body1" text={title}/>
      <Text preset="body2" text={desc} />
    </View>
  </View>
  )
}

const $container: ViewStyle = {
  justifyContent: "center",
}


const $centeredContianer:ViewStyle=  {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
}
const $fullScreenContianer:ViewStyle= {
  flex: 1,
}