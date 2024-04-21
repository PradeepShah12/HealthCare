import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { colors, spacing } from "../theme"
import { Text } from "./Text"
import { calculateRelativeWidth } from "../utils/calculateRelativeDimensions"

export interface LogoTextHeaderProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  line?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const LogoTextHeader = (props: LogoTextHeaderProps) => {
  const { style, line } = props

  const $styles = [$container, style]
  const $lineStyle = [$line, line]

  return (
    <View style={$styles}>
      <Text style={$text} tx="common.healthCare" preset="h1bold" />
      <View style={{ width: spacing.tiny }} />
      <View style={$lineStyle} />
    </View>
  )
}

const $container: ViewStyle = {
  justifyContent: "center",
  flexDirection: "row",
  alignItems: "center",
  marginBottom: spacing.medium,
}

const $line: ViewStyle = {
  width: calculateRelativeWidth(200),
  borderBottomColor: colors.palette.primary100,
  borderBottomWidth:0.5,
  alignSelf:'center',
}

const $text: TextStyle = {
  color: colors.palette.primary100,
}
