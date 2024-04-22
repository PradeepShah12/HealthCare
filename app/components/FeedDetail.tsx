import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { colors, typography } from "../theme"
import { Text } from "./Text"

export interface FeedDetailProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const FeedDetail = (props: FeedDetailProps) =>{
  const { style } = props
  const $styles = [$container, style]

  return (
    <View style={$styles}>
      <Text style={$text}>Hello</Text>
    </View>
  )
}

const $container: ViewStyle = {
  justifyContent: "center",
}

const $text: TextStyle = {
  fontFamily: typography.primary.normal.fontFamily,
  fontSize: 14,
  color: colors.text,
}