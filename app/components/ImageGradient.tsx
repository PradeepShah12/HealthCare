import * as React from "react"
import { Image, ImageStyle, StyleProp, View, ViewStyle } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { calculateRelativeHeight } from "../utils/calculateRelativeDimensions"


export interface ImageGradientProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  imageUri: string
  children: React.ReactNode
  imageStyle: ImageStyle[]
}

/**
 * Describe your component here
 */
export const ImageGradient = (props: ImageGradientProps) => {
  const { style, imageUri, children, imageStyle } = props
  const $styles = [$container, style,imageStyle]

  return (
    <View style={$styles}>
      <Image source={{ uri: imageUri }} style={imageStyle} />
      <LinearGradient
        colors={["rgba(13, 13, 13, 0)", "#0D0D0D"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        locations={[0, 0.6073]}
        style={$carousalCaptionContainer}
      >
        {children}
      </LinearGradient>
    </View>
  )
}

const $container: ViewStyle = {
  justifyContent: "center",
}

const $carousalCaptionContainer: ViewStyle = {
  flexDirection: "row",

  width: "100%",
  // height: calculateRelativeHeight(50),
  // top: calculateRelativeHeight(36),
  zIndex: 2,
  position: "absolute",
  // opacity: 0.4,
  bottom: 0,
  // backgroundColor: colors.black,
  // opacity: 0.5,
  justifyContent: "center",
  alignItems: "flex-end",
  
  // alignSelf: "center",

  padding: calculateRelativeHeight(2),
}
