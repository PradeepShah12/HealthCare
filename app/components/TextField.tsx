import React, { ComponentType } from "react"
import { Platform, StyleProp, TextInputProps, TextStyle, View, ViewStyle } from "react-native"
import { translate } from "../i18n"
import { Device, colors, spacing, typography } from "../theme"
import { Text, TextProps } from "./Text"
import { TextInput } from "react-native-paper"
import { calculateRelativeHeight } from "../utils/calculateRelativeDimensions"

export interface TextFieldAccessoryProps {
  style: StyleProp<any>
  status: TextFieldProps["status"]
  multiline: boolean
  editable: boolean
}

export interface TextFieldProps extends Omit<TextInputProps, "ref"> {
  /**
   * A style modifier for different input states.
   */
  status?: "error" | "disabled"
  /**
   * The label text to display if not using `labelTx`.
   */
  label?: TextProps["text"]
  /**
   * Label text which is looked up via i18n.
   */
  labelTx?: TextProps["tx"]
  /**
   * Optional label options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  labelTxOptions?: TextProps["txOptions"]
  /**
   * Pass any additional props directly to the label Text component.
   */
  LabelTextProps?: TextProps
  /**
   * The helper text to display if not using `helperTx`.
   */
  helper?: TextProps["text"]
  /**
   * Helper text which is looked up via i18n.
   */
  helperTx?: TextProps["tx"]
  /**
   * Optional helper options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  helperTxOptions?: TextProps["txOptions"]
  /**
   * Pass any additional props directly to the helper Text component.
   */
  HelperTextProps?: TextProps
  /**
   * The placeholder text to display if not using `placeholderTx`.
   */
  placeholder?: TextProps["text"]
  /**
   * Placeholder text which is looked up via i18n.
   */
  placeholderTx?: TextProps["tx"]
  /**
   * Optional placeholder options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  placeholderTxOptions?: TextProps["txOptions"]
  /**
   * Optional input style override.
   */
  style?: StyleProp<TextStyle>
  /**
   * Style overrides for the container
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * Style overrides for the input wrapper
   */
  inputWrapperStyle?: StyleProp<ViewStyle>
  /**
   * An optional component to render on the right side of the input.
   * Example: `RightAccessory={(props) => <Icon icon="ladybug" containerStyle={props.style} color={props.editable ? colors.textDim : colors.text} />}`
   * Note: It is a good idea to memoize this.
   */
  RightAccessory?: ComponentType<TextFieldAccessoryProps>
  /**
   * An optional component to render on the left side of the input.
   * Example: `LeftAccessory={(props) => <Icon icon="ladybug" containerStyle={props.style} color={props.editable ? colors.textDim : colors.text} />}`
   * Note: It is a good idea to memoize this.
   */
  LeftAccessory?: ComponentType<TextFieldAccessoryProps>
}

/**
 * A component that allows for the entering and editing of text.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-TextField.md)
 */
export const TextField = (props: TextFieldProps) => {
  const {
    labelTx,
    label,
    labelTxOptions,
    helper,
    helperTx,
    placeholderTx,
    placeholder,
    placeholderTxOptions,
    status,
    RightAccessory,
    LeftAccessory,
    LabelTextProps,
    containerStyle: $containerStyle,
    inputWrapperStyle: $inputWrapperStyleOverride,
    style: $inputStyleOverride,
    ...TextInputProps
  } = props

  const disabled = TextInputProps.editable === false || status === "disabled"

  const secureTextEntry = TextInputProps.secureTextEntry

  const placeholderContent = placeholderTx
    ? translate(placeholderTx, placeholderTxOptions)
    : placeholder

  const $inputStyles = [
    $inputStyle,
    disabled && { color: colors.inactiveText },
    TextInputProps.multiline && { height: "auto" },
    Platform.OS === "ios" && Device.height > 700
      ? { height: calculateRelativeHeight(50) }
      : { height: calculateRelativeHeight(60) },
    $inputStyleOverride,
  ]

  const $inputWrapperStyles = [
    $inputWrapperStyle,
    status === "error" && { backgroundColor: colors.inputBackground },
    TextInputProps.multiline && { minHeight: 112 },
    LeftAccessory && { paddingStart: 0 },
    RightAccessory && { paddingEnd: 0 },
    $inputWrapperStyleOverride,
  ]

  const $textInputContainerStyle = [
    disabled && { backgroundColor: colors.textFieldBackground },
    $containerStyle,
  ]

  return (
    <View style={$textInputContainerStyle}>
      <View style={$inputWrapperStyles}>
        {!!LeftAccessory && (
          <LeftAccessory
            style={$leftAccessoryStyle}
            status={status}
            editable={!disabled}
            multiline={TextInputProps.multiline}
          />
        )}
        <TextInput
          mode="flat"
          label={
            <Text
              preset="body2"
              text={label}
              tx={labelTx}
              txOptions={labelTxOptions}
              style={{
                color: status === "error" ? colors.error : colors.inactiveText,
              }}
              {...LabelTextProps}
            />
          }
          theme={{
            colors: {
              surfaceVariant: colors.transparent,
              error: colors.error,
            },
          }}
          value={TextInputProps.value}
          onChangeText={TextInputProps.onChangeText}
          onBlur={TextInputProps.onBlur}
          underlineColor={colors.inputBorder}
          activeUnderlineColor="#000000"
          textColor={status === "error" ? colors.error : colors.text}
          style={$inputStyles}
          underlineStyle={$underlineStyle}
          placeholder={placeholderContent}
          selectionColor={colors.cta01}
          disabled={disabled}
          keyboardType={TextInputProps.keyboardType}
          secureTextEntry={secureTextEntry}
          textContentType={TextInputProps.textContentType}
          onFocus={TextInputProps.onFocus}
          multiline={TextInputProps.multiline}
          numberOfLines={TextInputProps.numberOfLines}
          returnKeyType={TextInputProps.returnKeyType}
          scrollEnabled={TextInputProps.scrollEnabled}
          blurOnSubmit={TextInputProps.blurOnSubmit}
          maxLength={TextInputProps.maxLength}
        />

        {!!RightAccessory && (
          <RightAccessory
            style={$rightAccessoryStyle}
            status={status}
            editable={!disabled}
            multiline={TextInputProps.multiline}
          />
        )}
      </View>
      {!!(status === "error") && (
        <Text preset="formError" text={helper} tx={helperTx} style={$helperStyle} />
      )}
    </View>
  )
}

const $underlineStyle: ViewStyle = {
  height: 0,
}

const $helperStyle: TextStyle = {
  marginTop: spacing.tiny,
}

const $inputStyle: TextStyle = {
  flex: 1,
  alignSelf: "stretch",
  fontFamily: typography.primary.normal.fontFamily,
  color: colors.text,
  fontSize: 13,
  // https://github.com/facebook/react-native/issues/21720#issuecomment-532642093
  marginVertical: 0,
}

const $rightAccessoryStyle: ViewStyle = {
  marginEnd: spacing.extraSmall,
  height: 40,
  justifyContent: "center",
  alignItems: "center",
}
const $leftAccessoryStyle: ViewStyle = {
  marginStart: spacing.extraSmall,
  height: 40,
  justifyContent: "center",
  alignItems: "center",
}

const $inputWrapperStyle: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: colors.palette.neutral100,
  borderWidth: 0.2,
  // overflow: "hidden",
  borderRadius: 5,
  // minHeight:50

}
