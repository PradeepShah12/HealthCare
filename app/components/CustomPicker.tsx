import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { Picker } from "@react-native-picker/picker"
import { colors } from "../theme"

export interface CustomPickerProps {
  items: PickerOptionProps[]
  pickerRef: React.LegacyRef<Picker<string>>
  setValue: (itemValue: string, itemIndex: number) => void
  selectedValue: string
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  type?: string
}

export interface PickerOptionProps {
  label: string
  value: string
}

/**
 * Describe your component here
 */
export const CustomPicker = (props: CustomPickerProps) => {
  const { style, items, setValue, selectedValue, pickerRef, type } = props
  const $styles = [$container, style]

  return (
    <View style={$styles}>
      <Picker
        ref={pickerRef}
        selectedValue={selectedValue}
        onValueChange={setValue}
        style={$pickerContainer}
        itemStyle={$itemStyle}
        dropdownIconColor={colors.black}
        mode="dialog"
      >
        <Picker.Item
          label={`${"Select"} ${type || ""}`}
          value={null}
          key={new Date().toISOString()}
          style={{ color: colors.black }}
          enabled={false}
        />
        {items &&
          items.map((p, i) => {
            return (
              <Picker.Item
                label={p.label}
                value={p.value}
                key={i}
                style={{ color: colors.black }}
              />
            )
          })}
      </Picker>
    </View>
  )
}

const $container: ViewStyle = {}
const $itemStyle: ViewStyle | TextStyle = {
  // paddingVertical: 30,
  fontSize: 12,
  lineHeight: 24,
  // margin: 0,
}

const $pickerContainer: ViewStyle = {
  height: 60,
  justifyContent: "center",
  paddingHorizontal: 30,
  // borderWidth: 1,
}
