import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { AppStackScreenProps, navigate } from "app/navigators"
import { AutoImage, Button, Screen, Spacer, Text } from "app/components"
import { ImageStyle } from "react-native-fast-image"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface ProfileScreenProps extends AppStackScreenProps<"Profile"> {}

export const ProfileScreen: FC<ProfileScreenProps> = observer(function ProfileScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="fixed">
      <View style={$header}>
        <AutoImage style={$avatar} source={{ uri: 'https://www.bootdey.com/img/Content/avatar/avatar6.png' }} />
        <View style={$info}>
          <Text preset={'h2bold'} style={$name}>John Doe</Text>
          <Text preset={'h3Inactive'}  style={$username}>@johndoe</Text>
          <Text preset={'h3Inactive'}  style={$username}>johndoe@gmail.com</Text>

          <Spacer size="small"/>
          <Button text="Edit Profile" preset="filled" onPress={() => navigate("EditProfile")} />
        </View>
      </View>
      <View style={$stats}>
        <View style={$stat}>
          <Text preset={'h2bold'} style={$statLabel}>Weight</Text>
          <Text preset={'h2bold'} style={$statValue}>1,234</Text>
        </View>
        <View style={$stat}>
          <Text  preset={'h2bold'} style={$statLabel}>Height</Text>
          <Text preset={'h2bold'} style={$statValue}>123</Text>
        </View>
        <View style={$stat}>
          <Text preset={'h2bold'} style={$statLabel}>BMI</Text>
          <Text preset={'h2bold'} style={$statValue}>456</Text>
        </View>
      </View>
      <Text style={$bio}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </Text>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}



  const $container:ViewStyle= {
    backgroundColor: 'red',
  }
  const $header:ViewStyle= {
    // marginTop:50,
    flexDirection: 'row',
    // alignItems: 'center',
    padding: 20,
  }
  const $avatar:ImageStyle= {
    width: 100,
    height: 100,
    borderRadius: 25,
  }
  const $info:ViewStyle= {
    marginLeft: 20,
  }
  const $name:ViewStyle= {
    // fontSize: 24,
    // fontWeight: 'bold',
  }
  const $username:ViewStyle= {
    // color: '#999',
    // fontSize: 18,
  }
  const $stats:ViewStyle= {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  }
  const $stat:ViewStyle= {
    flex: 1,
    alignItems: 'center',
  }
  const $statLabel:ViewStyle= {
    color: '#999',
    fontSize: 14,
  }
  const $statValue:ViewStyle= {
    fontSize: 18,
  }
  const $bio:ViewStyle= {
    padding: 20,
    // fontSize: 16,
    color: '#333',
  }
