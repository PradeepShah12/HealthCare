import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { colors, spacing } from "../theme"
import { Text } from "./Text"
import { calculateRelativeWidth } from "../utils/calculateRelativeDimensions"
import { IconBackground } from "./IconBackground"
import { AutoImage } from "./AutoImage"
import { Spacer } from "./Spacer"
import { User } from "../services/api/Auth/types"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { truncateString } from "../utils/textUtils"
import { DynamicIcon } from "./DynamicIcon"
import { goBack } from "../navigators"



export interface MessageHeaderProps  {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  line?: StyleProp<ViewStyle>
  user:User
}

/**
 * Describe your component here
 */
export const MessageHeader = (props: MessageHeaderProps) => {
  const $topInsetstyle = useSafeAreaInsetsStyle(['top'])
  const { style, line,user ,roomName} = props
  const $styles = [$container, style,$topInsetstyle]
  const $lineStyle = [$line, line]
  return (
    <View style={$styles}>
        <IconBackground onPress={() => goBack()}>
          <DynamicIcon iconName="chevron-back" iconFamily="Ionicons" />
        </IconBackground>
        <Spacer size="small" orientation="width" />

      <IconBackground >
        <AutoImage maxWidth={spacing.extraLarge+spacing.extraSmall} source={{uri:user?.image}} style={{borderRadius:spacing.extraLarge+spacing.extraSmall}}/>
      </IconBackground>
      <Spacer size="medium" orientation="width"/>
      <Text style={$text} text={truncateString(roomName||'Group',30)} preset="h3bold" />
      <View style={{ width: spacing.tiny }} />
      <View style={$lineStyle} />
     
    </View>
  )
}

const $container: ViewStyle = {
  justifyContent: "flex-start",
  flexDirection: "row",
  alignItems: "center",
  paddingBottom: spacing.tiny,
  paddingHorizontal: calculateRelativeWidth(10),

  backgroundColor:colors.palette.primary400,
}

const $line: ViewStyle = {
  width: calculateRelativeWidth(2200),
  borderBottomColor: colors.palette.primary100,
  borderBottomWidth:0.5,
  alignSelf:'center',

}

const $text: TextStyle = {
  color: colors.palette.primary100,
}

