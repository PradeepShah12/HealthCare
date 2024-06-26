import i18n from "i18n-js"
import React from "react"

import { StyleProp, Text as RNText, TextProps as RNTextProps, TextStyle } from "react-native"
import { isRTL, translate, TxKeyPath } from "../i18n"
import { colors, typography } from "../theme"

type Sizes = keyof typeof $sizeStyles
type Weights = keyof typeof typography.primary
type Presets = keyof typeof $presets

export interface TextProps extends RNTextProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: TxKeyPath
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: i18n.TranslateOptions
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<TextStyle>
  /**
   * One of the different types of text presets.
   */
  preset?: Presets
  /**
   * Text weight modifier.
   */
  weight?: Weights
  /**
   * Text size modifier.
   */
  size?: Sizes
  /**
   * Children components.
   */
  children?: React.ReactNode
}

/**
 * For your text displaying needs.
 * This component is a HOC over the built-in React Native one.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-Text.md)
 */
export function Text(props: TextProps) {
  const { weight, size, tx, txOptions, text, children, style: $styleOverride, ...rest } = props

  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children



  const preset: Presets = $presets[props.preset] ? props.preset : "default"
  const $styles = [
    $rtlStyle,
    $presets[preset],
    $fontWeightStyles[weight],
    $sizeStyles[size],
    $styleOverride,
  ]
return (
    <RNText {...rest} style={$styles}>
      {content}
    </RNText>
  )
}

const $sizeStyles = {
  h1: { fontSize: 28, lineHeight: 36 } as TextStyle,
  h2: { fontSize: 22, lineHeight: 28 } as TextStyle,
  h3: { fontSize: 18, lineHeight: 24 } as TextStyle,
  h4: { fontSize: 16, lineHeight: 22 } as TextStyle,
  body1: { fontSize: 16, lineHeight: 22 } as TextStyle,
  body2: { fontSize: 14, lineHeight: 20 } as TextStyle,
  body3: { fontSize: 12, lineHeight: 18 } as TextStyle,
  body3SmallGAP: { fontSize: 12, lineHeight: 18 } as TextStyle,
  body4: { fontSize: 14, lineHeight: 20 } as TextStyle,
};


const $headingWeightStyles = Object.entries(typography.heading).reduce(
  (acc, [weight, {fontWeight}]) => {
    return { ...acc, [weight]: { fontWeight } }
  },
  {},
) as Record<Weights, TextStyle>

const $fontWeightStyles = Object.entries(typography.primary).reduce((acc, [weight, {fontWeight}]) => {
  return { ...acc, [weight]: { fontWeight } }
}, {}) as Record<Weights, TextStyle>

const $baseStyle: StyleProp<TextStyle> = [
  $sizeStyles.body1,
  $fontWeightStyles.normal,
  { color: colors.text },
]

const $presets = {
  default: $baseStyle,

  inactive: [$baseStyle, { color: colors.inactiveText }],

  bold: [$baseStyle, $fontWeightStyles.bold] as StyleProp<TextStyle>,

  h1: [$baseStyle, $sizeStyles.h1, $headingWeightStyles.bold] as StyleProp<TextStyle>,
h1bold: [$baseStyle, $sizeStyles.h1, $headingWeightStyles.bold] as StyleProp<TextStyle>,
  h2: [$baseStyle, $sizeStyles.h2, $headingWeightStyles.medium] as StyleProp<TextStyle>,
  h2bold: [$baseStyle, $sizeStyles.h2, $headingWeightStyles.bold] as StyleProp<TextStyle>,

  h3: [$baseStyle, $sizeStyles.h3, $headingWeightStyles.normal] as StyleProp<TextStyle>,
  h3bold: [$baseStyle, $sizeStyles.h3, $headingWeightStyles.bold] as StyleProp<TextStyle>,
  h3Inactive: [
    $baseStyle,
    $sizeStyles.h3,
    $fontWeightStyles.normal,
    { color: colors.inactiveText },
  ] as StyleProp<TextStyle>,

  h4: [$baseStyle, $sizeStyles.h4, $headingWeightStyles.normal] as StyleProp<TextStyle>,
  h4bold: [$baseStyle, $sizeStyles.h4, $headingWeightStyles.bold] as StyleProp<TextStyle>,

  body1: [$baseStyle, $sizeStyles.body1, $fontWeightStyles.normal] as StyleProp<TextStyle>,
  body1bold: [$baseStyle, $sizeStyles.body1, $fontWeightStyles.bold] as StyleProp<TextStyle>,

  body1Inactive: [
    $baseStyle,
    $sizeStyles.body1,
    $fontWeightStyles.normal,
    { color: colors.inactiveText },
  ] as StyleProp<TextStyle>,

  body2: [$baseStyle, $sizeStyles.body2, $fontWeightStyles.normal] as StyleProp<TextStyle>,
  body2bold: [$baseStyle, $sizeStyles.body2, $fontWeightStyles.bold] as StyleProp<TextStyle>,
  body2Inactive: [
    $baseStyle,
    $sizeStyles.body2,
    $fontWeightStyles.normal,
    { color: colors.inactiveText },
  ] as StyleProp<TextStyle>,

  body3: [$baseStyle, $sizeStyles.body3, $fontWeightStyles.normal] as StyleProp<TextStyle>,
  body3bold: [$baseStyle, $sizeStyles.body3, $fontWeightStyles.bold] as StyleProp<TextStyle>,

  body3Inactive: [
    $baseStyle,
    $sizeStyles.body3,
    $fontWeightStyles.normal,
    { color: colors.inactiveText },
  ] as StyleProp<TextStyle>,
  body3SmallHeight: [
    $baseStyle,
    $sizeStyles.body3SmallGAP,
    $fontWeightStyles.normal,
  ] as StyleProp<TextStyle>,

  body4: [$baseStyle, $sizeStyles.body4, $fontWeightStyles.normal] as StyleProp<TextStyle>,
  body4Inactive: [
    $baseStyle,
    $sizeStyles.body4,
    $fontWeightStyles.normal,
    { color: colors.inactiveText },
  ] as StyleProp<TextStyle>,
  body4bold: [$baseStyle, $sizeStyles.body4, $fontWeightStyles.bold] as StyleProp<TextStyle>,

  // subheading: [$baseStyle, $sizeStyles.h2, $headingWeightStyles.medium] as StyleProp<TextStyle>,

  // formLabel: [$baseStyle, $fontWeightStyles.normal] as StyleProp<TextStyle>,

  formError: [
    $baseStyle,
    $sizeStyles.body2,
    $fontWeightStyles.normal,
    { color: colors.error },
  ] as StyleProp<TextStyle>,
}

const $rtlStyle: TextStyle = isRTL ? { writingDirection: "rtl" } : {}
