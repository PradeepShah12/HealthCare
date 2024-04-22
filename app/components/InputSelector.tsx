import React, { useState } from "react";
import { View, FlatList, Platform, ViewStyle, TouchableOpacity, TextStyle } from "react-native";
import { $globalViewStyles, colors, spacing } from "../theme";
import { TextField } from "./TextField";
import { calculateRelativeHeight } from "../utils/calculateRelativeDimensions";
import { Divider } from "react-native-paper";
import { Text } from "./Text";
import { DynamicIcon } from "./DynamicIcon";
import { Spacer } from "./Spacer";

export interface InputSelectorProps {
  options: string[];
  onSelect: (selectedOption: string) => void;
  value?: string
  label: string
  hint?: string
  addEnabled?: boolean
}

const InputSelector = (props: InputSelectorProps) => {
  const { options, onSelect, value, label, hint, addEnabled } = props;

  const [showDropdown, setShowDropdown] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
const [ newItem , setNewItem] = useState('')
  const filterOptions = (text: string) => {
    const filtered = options.filter(
      (option) =>
        option.toLowerCase().includes(text.toLowerCase()) ||
        text.trim() === ""
    );

    if (filtered.length < 1) {
      setNewItem(text)
      setFilteredOptions([text]);

      return false
    } else {
      
      setFilteredOptions(filtered);
      return true

    }
  };

  const handleSelect = (selectedOption: string) => {
    onSelect(selectedOption);

    setShowDropdown(false);
    setFilterText(selectedOption)
  };

  return (
    <View style={$container}>
      <TextField
    
        inputWrapperStyle={$inputWrapperStyle}
        placeholder="Type to filter"
        value={value}

        onChangeText={(text) => {
          setFilterText(text);
          filterOptions(text);
          setShowDropdown(true)
        }}
        label={label}

        RightAccessory={() =>
          // @ts-ignore
          <DynamicIcon
            style={$iconStyle}
            iconName="chevron-right"
            iconColor={colors.palette.black}
          />

        }


      />

      {filterText.length > 0 && showDropdown && (
        <View style={[$dropdownContainer, $globalViewStyles.shadow]}>
          <FlatList
            data={filteredOptions || []}
            contentContainerStyle={$scrollWrapper}
            keyExtractor={(item) => item}
            ListHeaderComponent={filterText.length < 3 && <Text text={hint || null} preset="formError" style={$hintStyle} />
            }
            ItemSeparatorComponent={() => {
              return <Divider style={$globalViewStyles.spacerDivider} />
            }}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSelect(item)} style={$optionRow}>
               {newItem===item&&addEnabled&&<DynamicIcon iconName={"add-circle"} />}
               {newItem===item&&addEnabled&&<Spacer size="small" orientation="width"/>}

                <Text text={item}/>
              </TouchableOpacity >
            )}
          />
        </View>
      )}
    </View>
  );
};

const $container: ViewStyle = {
  // position: "relative",
  // flex:1,

};

const $iconStyle: TextStyle = {

  marginRight: spacing.medium,

};
const $dropdownContainer: ViewStyle = {

  position: "relative",
  // top: Platform.OS === "ios" ? 50 : 60,
  left: 0,
  right: 0,
  minHeight: calculateRelativeHeight(150),
  maxHeight: calculateRelativeHeight(150),
  padding: spacing.medium,
  backgroundColor: colors.palette.neutral100,
  elevation: 10,
  borderBottomRightRadius: spacing.small,
  borderBottomLeftRadius: spacing.small,

  zIndex: 999
}
const $inputWrapperStyle: ViewStyle = {

  height: Platform.OS === "ios" ? calculateRelativeHeight(50) : calculateRelativeHeight(60),
  justifyContent: "center",
  // paddingHorizontal: spacing.medium,
}

const $scrollWrapper: ViewStyle = {
  // borderWidth:1,
  // backgroundColor:colors.activeButton,
  flex: 1,
}
const $hintStyle: ViewStyle = {
  marginBottom: spacing.extraSmall,
}
const $optionRow:ViewStyle={
  flexDirection:'row',
  alignItems:'center',
  alignContent:'center',
  // borderWidth:1
}

export default InputSelector;

