import React, { FC, useContext, useState } from "react"
import { observer } from "mobx-react-lite"
import { Alert, Image, TouchableOpacity, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"
import { useNavigation, useRoute } from "@react-navigation/native"
import axios from 'axios'

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"
import { FitnessItems } from '../Context';
import { DynamicIcon } from "app/components/DynamicIcon"
import { colors } from "app/theme"
import { $globalTextStyles } from "app/theme/styles"
import { useAppSelector } from "app/store"

interface FitScreenProps extends AppStackScreenProps<"Fit"> {}

export const FitScreen: FC<FitScreenProps> = observer(function FitScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const { UserID } = useAppSelector(state => state.user.user)

  const route = useRoute();
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const exercise = route.params.exercises;
  const current = exercise[index];
  const { completed, setCompleted, calories, setCalories, minutes, setMinutes, workout, setWorkout, } = useContext(FitnessItems);


  console.log(route.params.workoutType,'exercise')
  const insertWorkout = async () => {
    try {
      await axios.post(`https://c1b4-165-225-114-126.ngrok-free.app/api/user/activity/workout/insertWorkout`, {
        UserID: UserID,
        WorkoutType:route.params.workoutType,
        duration:120,
         // replace with actual user ID
      });
      alert("Workout added successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to add meals");
    }
  };


  
  return (
    <Screen>
      <Image style={{width: "100%", height: 400}} source={{uri: current?.image}} />

      <Text preset="h1" style={$globalTextStyles.center}>{current?.name} <DynamicIcon iconFamily="Octicons" iconName="question" iconSize={22} iconColor="#6d6868" /></Text>

      <Text preset="h1" style={$globalTextStyles.center} >x{current?.sets}</Text>

      {/* Done Button  */}
      {
        index + 1 >= exercise.length ? (
          <TouchableOpacity onPress={() => {
            navigation.navigate("WorkOut");
            insertWorkout()
            setCompleted([...completed, current?.name]);
            setWorkout(workout + 1);
            setMinutes(minutes + 2.5);
            setCalories(calories + 6.3);
            setTimeout(() => {
              setIndex(index + 1);
            }, 2000);
          }} style={{ backgroundColor: "#198f51", marginLeft: "auto", marginRight: "auto", marginTop: 50, borderRadius: 30, padding: 10, width: "90%", }}>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 20, textAlign: "center" }}><DynamicIcon iconFamily="Ionicons" iconName="checkmark-circle" iconSize={24} iconColor="white" /> DONE</Text>
          </TouchableOpacity>
        ) : (
            <TouchableOpacity onPress={() => {
              navigation.navigate("Rest");
              setCompleted([...completed, current?.name]);
              setWorkout(workout + 1);
              setMinutes(minutes + 2.5);
              setCalories(calories + 6.3);
              setTimeout(() => {
                setIndex(index + 1);
              }, 2000);
            }} style={{ backgroundColor: colors.palette.secondary700, marginLeft: "auto", marginRight: "auto", marginTop: 50, borderRadius: 30, padding: 10, width: "90%", }}>
              <Text style={{ color: "white", fontWeight: "bold", fontSize: 20, textAlign: "center" }}><DynamicIcon iconFamily="Ionicons" iconName="checkmark-circle" iconSizesize={24} iconColor="white" /> DONE</Text>
            </TouchableOpacity>
        )
      }

      {/* Previous Button  */}
      <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 25}}>
        <TouchableOpacity disabled={index === 0} onPress={() => {navigation.navigate("Rest"); setTimeout(() => {
          setIndex(index - 1)
        }, 2000)}} style={{  borderRadius: 30, padding: 10, width: "42%" }}>
          <Text style={{ color: "#6d6868", fontWeight: "bold", fontSize: 18, textAlign: "center" }}><DynamicIcon iconFamily="Ionicons" iconName="play-skip-back" iconSizesize={22} iconColor="#6d6868" /> PREV</Text>
        </TouchableOpacity>

       {/* Skip Button  */}
       {
        index + 1 >= exercise.length ? (
            <TouchableOpacity onPress={() => {
              navigation.navigate("WorkOut");
            }} style={{ borderRadius: 30, padding: 10, width: "42%" }}>
              <Text style={{ color: "#3f3d3d", fontWeight: "bold", fontSize: 18, textAlign: "center", }}><DynamicIcon iconFamily="Ionicons" iconName="play-skip-forward" iconSizesize={22} iconColor="#3f3d3d" /> SKIP</Text>
            </TouchableOpacity>
        ) : (
              <TouchableOpacity onPress={() => {
                navigation.navigate("Rest");

                setTimeout(() => {
                  setIndex(index + 1);
                }, 2000);
              }} style={{ borderRadius: 30, padding: 10, width: "42%" }}>
                <Text style={{ color: "#3f3d3d", fontWeight: "bold", fontSize: 18, textAlign: "center", }}><DynamicIcon iconFamily="Ionicons" iconName="play-skip-forward" iconSizesize={22} iconColor="#3f3d3d" /> SKIP</Text>
              </TouchableOpacity>
        )
       }
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
