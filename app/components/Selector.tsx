import React, { useRef } from "react"
import {
  Platform,
  Pressable,
  PressableProps,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet"

import { colors, spacing } from "../theme"
import { Text, TextProps } from "./Text"
import Icon from 'react-native-vector-icons/FontAwesome';
import { calculateRelativeHeight } from "../utils/calculateRelativeDimensions"
import { CustomPicker, PickerOptionProps } from "./CustomPicker"
import { Button } from "./Button"

export interface SelectorAccessoryProps {
  style: StyleProp<any>
  status: SelectorProps["status"]
  multiline: boolean
  editable: boolean
}

export interface SelectorProps extends Omit<PressableProps, "ref"> {
  /**
   * A style modifier for different input states.
   */
  onSelect:(e:string)=>void

  value: string
  active: boolean
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
  items:PickerOptionProps[]
}

/**
 * A component that allows for the entering and editing of text.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-Selector.md)
 */
export const Selector = (props: SelectorProps) => {
  const {
    labelTx,
    label,
    active,
    status,
    value,
    items,
    onSelect,
    containerStyle: $containerStyle,
    inputWrapperStyle: $inputWrapperStyleOverride,
  } = props

  const $inputWrapperStyles = [
    $inputWrapperStyle,
    status === "error" && { backgroundColor: colors.textFieldError },

    $inputWrapperStyleOverride,
  ]

  const $textInputContainerStyle = [$containerStyle]
  const [selectedService, setSelectedService] = React.useState<string | null>(null)
  const servicesActionSheet = useRef<ActionSheetRef>(null)
  const [serviceSelector, setServicesSelector] = React.useState(false)
  const pickerRef = React.useRef()

  return (<>
    <Pressable style={$textInputContainerStyle} onPress={()=>servicesActionSheet?.current?.show()}>
      <View style={$inputWrapperStyles}>
        <View style={$valueWrapper}>
          <Text text={value || label} preset={value ? "body2" : "body2Inactive"} tx={labelTx} />

        {
          // @ts-ignore

        <Icon
            name="chevron-right"
            color={colors.palette.black}
            style={{ transform: [{ rotate: active ? "90deg" : "0deg" }] }}
          />}
        </View>
      </View>
    </Pressable>
    <ActionSheet ref={servicesActionSheet}>
        <View style={{ height: calculateRelativeHeight(300), padding: spacing.medium }}>
          <Text
            text={label||labelTx}
            preset="body1bold"
            style={$actionSheetTitle}
          />
          <CustomPicker
            items={items || []}
            
            pickerRef={pickerRef}
            setValue={(e) => {
              setSelectedService(e)
              setServicesSelector(!serviceSelector)
              onSelect(e)
            }}
            type={"Option"}
            selectedValue={selectedService}
          />
          <Button
            tx="common.confirm"
            style={{ marginTop: spacing.huge + spacing.large }}
            preset="filled"
            onPress={() => {servicesActionSheet.current?.hide();
            // PressableProps.onPress(e);
            }
            }
          />
        </View>
      </ActionSheet>
    </>
  )
}

const $inputWrapperStyle: ViewStyle = {
  flexDirection: "column",
  backgroundColor: colors.textFieldBackground,
  borderBottomWidth: 0.2,
  height: Platform.OS === "ios" ? calculateRelativeHeight(50) : calculateRelativeHeight(60),
  justifyContent: "center",
  paddingHorizontal: spacing.medium,
}

const $valueWrapper: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
}

export const $actionSheetTitle: TextStyle = { textAlign: "center", marginBottom: spacing.huge }
