import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Image } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { DynamicIcon } from "app/components/DynamicIcon"
import { $globalTextStyles } from "app/theme/styles"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface RestScreenProps extends AppStackScreenProps<"Rest"> {}

export const RestScreen: FC<RestScreenProps> = observer(function RestScreen() {
  const navigation = useNavigation();
  let timer = 0;
  const [timeLeft, setTimeLeft] = useState(2);

  const startTime = () => {
    setTimeout(() => {
      if (timeLeft <= 0) {
        navigation.goBack();
        clearTimeout(timer);
      }
      setTimeLeft(timeLeft - 1)
    }, 1000)
  }

  useEffect(() => {
    startTime();

    //Cleanup Function
    return() => clearTimeout(timer);
  },)

  return (
    <Screen>
      <Image
        // resizeMode="contain"
        source={{
          uri: "https://img.freepik.com/free-photo/full-length-athlete-sipping-water-from-fitness-bottle-exhausted-after-workout_1098-18878.jpg?w=360&t=st=1689099570~exp=1689100170~hmac=a60d176d8a393f59b8b032dd294005ceedbd048a04c01e542bcffa815ecd4428",
        }}
        style={{ width: "100%", height: 420, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
      />

      <Text preset="h1" style={$globalTextStyles.center}>TAKE A BREAK!</Text>

      <Text preset="h1" style={$globalTextStyles.center}> {timeLeft}</Text>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
