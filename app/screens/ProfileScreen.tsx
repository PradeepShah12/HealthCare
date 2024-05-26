import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { AppStackScreenProps, navigate } from "app/navigators"
import { AutoImage, Button, Screen, Spacer, Text } from "app/components"
import { ImageStyle } from "react-native-fast-image"
import { useAppSelector } from "app/store"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface ProfileScreenProps extends AppStackScreenProps<"Profile"> { }

export const ProfileScreen: FC<ProfileScreenProps> = observer(function ProfileScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const { user } = useAppSelector(state => state.user)
  // Pull ivon navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="fixed">
      <View style={$header}>
        <AutoImage style={$avatar} source={{ uri: 'https://www.bootdey.com/img/Content/avatar/avatar6.png' }} />
        <View style={$info}>
          <Text preset={'h2bold'} style={$name}>{user.Email}</Text>
          <Text preset={'h3Inactive'} style={$username}>{user.Username}</Text>
          <Text preset={'h3Inactive'} style={$username}>{user.Email}</Text>

          <Spacer size="small" />
          <Button text="Edit Profile" preset="filled" onPress={() => navigate("EditProfile")} />
        </View>
      </View>
      <View style={$stats}>
        <View style={$stat}>
          <Text preset={'h2bold'} style={$statLabel}>Weight</Text>
          <Text preset={'h2bold'} style={$statValue}>{user.Weight}</Text>
        </View>
        <View style={$stat}>
          <Text preset={'h2bold'} style={$statLabel}>Height</Text>
          <Text preset={'h2bold'} style={$statValue}>{user.Height}</Text>
        </View>
        <View style={$stat}>
          <Text preset={'h2bold'} style={$statLabel}>Diet Type</Text>
          <Text preset={'h2bold'} style={$statValue}>{user.DietType}</Text>
        </View>
      </View>

    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}



const $container: ViewStyle = {
  backgroundColor: 'red',
}
const $header: ViewStyle = {
  // marginTop:50,
  flexDirection: 'row',
  // alignItems: 'center',
  padding: 20,
}
const $avatar: ImageStyle = {
  width: 100,
  height: 100,
  borderRadius: 25,
}
const $info: ViewStyle = {
  marginLeft: 20,
}
const $name: ViewStyle = {
  // fontSize: 24,
  // fontWeight: 'bold',
}
const $username: ViewStyle = {
  // color: '#999',
  // fontSize: 18,
}
const $stats: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 20,
}
const $stat: ViewStyle = {
  flex: 1,
  alignItems: 'center',
}
const $statLabel: ViewStyle = {
  color: '#999',
  fontSize: 14,
}
const $statValue: ViewStyle = {
  fontSize: 18,
}
const $bio: ViewStyle = {
  padding: 20,
  // fontSize: 16,
  color: '#333',
}
