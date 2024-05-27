import React, { FC, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { Animated, TouchableOpacity, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { AddRemoveButton, Screen, Spacer, Text } from "app/components"
import { StyleSheet } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import ConfettiCannon from "react-native-confetti-cannon";

import * as Notifications from "expo-notifications";
import { DynamicIcon } from "app/components/DynamicIcon"
import { $globalViewStyles, colors, spacing } from "app/theme"
import { calculateRelativeHeight, calculateRelativeWidth } from "app/utils/calculateRelativeDimensions"
import { LinearGradient } from "expo-linear-gradient"
import { $globalTextStyles } from "app/theme/styles"

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"


const amounts = [250, 500, 1000, 1500];

// Async Storage
const storeData = async (value, key = "@amount") => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};

const getData = async (key, setValue) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      setValue(Number(value));
    }
  } catch (e) {
    // error reading value
    console.log(e);
  }
};

const renderConfetti = () => {
  return <ConfettiCannon count={200} origin={{ x: 0, y: 0 }} fadeOut={true} />;
};

// Notifications








interface WaterReminderScreenProps extends AppStackScreenProps<"WaterReminder"> {}

export const WaterReminderScreen: FC<WaterReminderScreenProps> = observer(function WaterReminderScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const [fillingPercentage, setFillingPercentage] = useState(0);
  const [waterGoal, setWaterGoal] = useState(3000);
  const [reminderTime, setReminderTime] = useState(0);

  const [waterDrank, setWaterDrank] = useState(0);
  const [isGoalAchieved, setIsGoalAchieved] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Progress Bar Animation
  const barHeight = useRef(new Animated.Value(0)).current;
  const progressPercent = barHeight.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", `100%`],
  });


async function scheduleNotification() {
  await Notifications.requestPermissionsAsync().then((permission) => {
    console.log('permission requested,',permission)
    Notifications.scheduleNotificationAsync({
      content: {
        title: "💧 Water Reminder",
        subtitle: "Your body needs water!",
      },
      trigger: {
        repeats: true,
        seconds: reminderTime*60,
      },
    });
  });
}


  useEffect(() => {
    getData("@amount", setWaterDrank);
    getData("@goal", setWaterGoal);
  }, []);

  useEffect(() => {
    Animated.timing(barHeight, {
      duration: 1000,
      toValue: fillingPercentage / 3,
      useNativeDriver: false,
    }).start();
  }, [fillingPercentage]);

  // End of Progress Bar Animation

  useEffect(() => {
    storeData(waterGoal.toString(), "@goal");
  }, [waterGoal]);

  useEffect(() => {
    storeData(waterDrank.toString(), "@amount");
  }, [waterDrank]);

  useEffect(() => {
    // percentage = waterDrank * 100 / waterGoal
    let percentage = (waterDrank * 100) / waterGoal;
    let fillingP = (percentage * 300) / 100;
    setFillingPercentage(fillingP > 300 ? 300 : fillingP);
  }, [waterGoal, setFillingPercentage, waterDrank]);

  
  useEffect(() => {
    if (waterDrank >= waterGoal && isGoalAchieved === false) {
      setIsGoalAchieved(true);
    }
    if (waterDrank < waterGoal && isGoalAchieved === true) {
      setIsGoalAchieved(false);
    }

    if (showConfetti === false && isGoalAchieved === true) {
      setShowConfetti(true);
    } else {
      setShowConfetti(false);
    }
  }, [waterDrank, isGoalAchieved, waterGoal]);








  return (
    <Screen style={$root} preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={styles.container}>
      <View style={[styles.waterGoalContainer,$globalViewStyles.rowCenter,$globalViewStyles.justifyContentBetween]}>
  
  <Text style={styles.blueText} preset="h2">Set The Target</Text>

<Spacer size="medium" orientation="width"/>
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    <Text preset="h2" style={[styles.grayText]}>
      {waterGoal} mL{" "}
    </Text>
    {/* Add Goal */}
    <TouchableOpacity
      style={{ padding: 5 }}
      onPress={() => setWaterGoal(waterGoal + 250)}
    >
      <DynamicIcon iconName="add-circle" iconSize={26} iconFamily="Ionicons" iconColor="#2389da" />
    </TouchableOpacity>
    <TouchableOpacity
      style={{ padding: 5 }}
      onPress={() =>{
        if(waterGoal>0)
   {     setWaterGoal(waterGoal - 250)}}}
    >
      <DynamicIcon iconName="remove-circle" iconSize={26} iconFamily="Ionicons" iconColor="#2389da" />
    </TouchableOpacity>
  </View>
</View>

<View
        style={{
          // flexDirection: "row",
          // width: "90%",
          justifyContent: "space-around",
        }}
      >
        {/* Water You've Drunk Label */}
        <View style={$globalViewStyles.rowCenter}>
        <Text text="You've drunk" preset="h2" style={styles.grayText}/> 
<Spacer size="small" orientation="width"/>
          <Text  preset="h1" style={styles.blueText}>

            {waterDrank} mL
          </Text>
          <Spacer size="small" orientation="width"/>

        </View>

        {/* Progress Bar */}
        {/* <View style={styles.progressBarContainer}>
          <Animated.View
            style={{
              height: progressPercent,
              backgroundColor: "#5abcd8",
              borderRadius: 35,
            }}
          />
        </View> */}
      </View>
{showConfetti&&    <LinearGradient
style={{padding:spacing.small,borderRadius:spacing.small,maxWidth:calculateRelativeWidth(350),minHeight:calculateRelativeHeight(150),alignItems:'center',justifyContent:'center',alignSelf:'center'}}  // Background Linear Gradient
        colors={['#85FFBD', '#FFFB7D']}
        // start={[0.1,0]}
        // end={[0,1]}
       ><Text style={$globalTextStyles.center} text="Congratulations!! You've achieved it!!" preset="h2bold"/>
</LinearGradient>
}
   {showConfetti && renderConfetti()}
      {/* Water Goal */}
   

      {/* ProgressView */}


      {/* Add Water */}
      <View>
        <Text  preset="h2" text="Add water taken"/>
      <View style={styles.waterButtonsContainer}>

        {amounts.map((amount) => {
          return (
            <AddRemoveButton
              key={"add" + amount}
              amount={amount}
              value={waterDrank}
              setValue={setWaterDrank}
              operation="add"
            />
          );
        })}
      </View>

      <Text  preset="h2" text="Remove water taken"/>

      <View style={styles.waterButtonsContainer}>
        {amounts.map((amount) => {
          return (
            <AddRemoveButton
              key={"remove" + amount}
              amount={amount}
              value={waterDrank}
              setValue={setWaterDrank}
              operation="remove"
            />
          );
        })}
      </View>
      </View>
      <View style={[$globalViewStyles.rowCenter,$globalViewStyles.justifyContentBetween]}>
        <Text style={styles.blueText} preset="h2">Reminder Time</Text>
        {/* <Spacer size="small" orientation="width"/> */}

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text preset="h2" style={[styles.grayText]}>
            {reminderTime} Mins{" "}
          </Text>
          
          <TouchableOpacity
            style={{ padding: 5 }}
            onPress={() => setReminderTime(reminderTime + 10)}
          >
            <DynamicIcon iconName="add-circle" iconSize={26} iconFamily="Ionicons" iconColor="#2389da" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ padding: 5 }}
            onPress={() =>
          {    
            if(reminderTime)
       {       setReminderTime(reminderTime - 10)}
            }}
          >
            <DynamicIcon iconName="remove-circle" iconSize={26} iconFamily="Ionicons" iconColor="#2389da" />
          </TouchableOpacity>
        </View>
        
      </View>
      <View
        style={{
          paddingVertical: 20,
          flexDirection: "row",
          width: "90%",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={[
            styles.notificationButton,
            {
              backgroundColor: colors.palette.primary100,
            },
          ]}
          onPress={() => scheduleNotification()}
        >
          <Text style={styles.notificationText}>Schedule Notification</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.notificationButton,
            {
              backgroundColor: colors.palette.secondary100,
            },
          ]}
          onPress={() => Notifications.cancelAllScheduledNotificationsAsync()}
        >
          <Text style={styles.notificationText}>Cancel Notifications</Text>
        </TouchableOpacity>
      </View>






    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  progressBarContainer: {
    borderRadius: 40,
    borderWidth: 1,
    width: 40,
    height: calculateRelativeHeight(400),
    justifyContent: "flex-end",
  },
  waterButtonsContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    width: "90%",
    justifyContent: "space-between",
  },
  waterGoalContainer: {
    padding: 50,
    alignItems: "center",
  },
  blueText: {
    color: "black",
    fontWeight: "600",
  },
  grayText: { color: "#323033", fontWeight: "600" },
  notificationButton: {
    height: 50,
    borderRadius: 20,
    justifyContent: "center",
    padding: 7,
  },
  notificationText: { color: "white", fontWeight: "500", fontSize: 16 },
  container:{flex:1,justifyContent:"space-evenly"}
});