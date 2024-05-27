import React, { FC } from "react"
import { View, ViewStyle } from "react-native"
import { MenuStackScreenProps } from "../navigators/MenuStack"
import { Button, Screen, SettingCard, Spacer, Text } from "../components"
import { $globalViewStyles, colors, spacing } from "../theme"
import { Divider } from "@rneui/base"
import { $globalTextStyles } from "../theme/styles"
import { useAppDispatch } from "../store"
import { userLogout } from "../store/Auth/auth.slice"
// import { useNavigation } from "@react-navigation/native"


// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Setting: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Setting" component={SettingScreen} />`
// Hint: Look for the 🔥!

interface SettingScreenProps extends MenuStackScreenProps<"Setting"> { }

export const SettingScreen: FC<SettingScreenProps> = (props) => {
const {navigation} = props
  // Pull in navigation via hook
  const dispatch = useAppDispatch()
  // const navigation = useNavigation()
  const handleLogout = () => {
    dispatch(userLogout())
  }
  return (
    <Screen style={$root} preset="auto" >
            <Spacer size="medium" />

      <Text text="Top Visits" preset="h3" />
      <Spacer size="extraSmall" />

      <View style={[$globalViewStyles.row, $globalViewStyles.scrollSpaceAround]}>
        <SettingCard title={"Home"} iconName={"home"}  onPress={()=>navigation.navigate("Dashboard")}/>
        <SettingCard title={"Profile"} iconName={"person"} onPress={()=>navigation.navigate('Profile')} />
      </View>


      <Spacer size="medium" />

      <Text text="Setting" preset="h3" />

      <Spacer size="extraSmall" />
      <SettingCard style={$topCard} title={"Edit Profile"} iconName={"edit"} iconFamily="AntDesign" onPress={()=>navigation.navigate('EditProfile')} />


      <Spacer size="medium" />




      <Text text="Resources" preset="h3" />



      {/* <SettingCard noBorder title={"Privacy Policy"} iconName={"document-lock-outline"} iconFamily="Ionicons" /> */}
      <Divider />

      <Spacer size="medium" />

      <Text text="Version 0.0.1" preset="h3Inactive" style={$globalTextStyles.center} />
      <Spacer size="medium" />
      <Button text="Logout" preset="filled" onPress={handleLogout} />

    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
}

const $logoutStyle: ViewStyle = {
  borderRadius: spacing.micro,
  borderWidth: 0,
  backgroundColor: colors.palette.neutral100,
  paddingVertical: spacing.medium,
}
const $bottomCard: ViewStyle = {
  // borderBottomEndRadius:0,
  borderTopEndRadius: 0,
  borderTopStartRadius: 0


}
const $topCard: ViewStyle = {
  // borderBottomEndRadius:0,
  borderBottomEndRadius: 0,
  borderBottomStartRadius: 0


}