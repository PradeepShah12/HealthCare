import * as React from "react"
import { PressableProps, StyleProp, TouchableOpacity, ViewStyle } from "react-native"
import { colors,  } from "../theme"

export interface IconBackgroundProps extends PressableProps{
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  children:React.ReactNode
}

/**
 * Describe your component here
 */
export const IconBackground = (props: IconBackgroundProps) =>{
  const { style, children,} = props
  const $styles = [$container, style]

  return (
    <TouchableOpacity style={[$styles,$iconBackground]} {...props}>
      {children}
    </TouchableOpacity>
  )
}

const $container: ViewStyle = {
  justifyContent: "center",
}

const $iconBackground:ViewStyle={
  backgroundColor:colors.palette.neutral100,
  borderRadius:40,
  padding:10,
  borderWidth:0.5,
  borderColor:colors.palette.primary200
}
