import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import LottieView from 'lottie-react-native';
import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from "axios"

import { View, ViewStyle, ScrollView } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, Spacer, Text, TextField } from "app/components"
import { calculateRelativeHeight, calculateRelativeWidth } from "app/utils/calculateRelativeDimensions";
import { Device, colors, spacing } from "app/theme";
import { PieChart } from "react-native-gifted-charts";
import { Alert } from "react-native";
import { useAppSelector } from "app/store";
// import { useStores } from "app/models"

interface SwimmingTrackerScreenProps extends AppStackScreenProps<"SwimmingTracker"> { }
interface SwimmingData {
  id: string;
  duration: number; // in minutes
  timestamp: string;
}

export const SwimmingTrackerScreen: FC<SwimmingTrackerScreenProps> = observer(function SwimmingTrackerScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const [swimmingHistory, setSwimmingHistory] = useState<SwimmingData[]>([
    { id: 'sunday', duration: 40, timestamp: new Date().toDateString() },
    { id: 'monday', duration: 20, timestamp: new Date().toDateString() }]);

  const [currentSwimmingDuration, setCurrentSwimmingDuration] = useState<number>(0);
  const [newSwimmingDuration, setNewSwimmingDuration] = useState<number>(0);
  const { UserID } = useAppSelector(state => state.user.user)

  useEffect(() => {
    fetchSwimmingHistory();
  }, []);

  const fetchSwimmingHistory = async () => {
    const Stime= new Date("2024-05-01")
const Etime= new Date("2024-05-31")

    try {
      const response = await axios.post("https://348e-115-64-55-67.ngrok-free.app/api/user/activity/swimming/getswimming", {
        UserID: UserID, // Replace with actual user ID
        SDate:Stime.toISOString(),
        EDate:Etime.toISOString()// Replace with actual end date
      });
      const data = response.data;
      const output = data.map((item, index) => ({
        id: (index + 1).toString(),
        duration: item.Duration ,  // converting seconds to minutes
        timestamp: item.Timestamp
      }));
      
      setSwimmingHistory(output);
      console.log(data,'adding duration')
      const totalDuration = data?.reduce((total: number, entry: SwimmingData) => total + entry.Duration, 0);
      console.log(totalDuration,'total duration')

      setCurrentSwimmingDuration(totalDuration);

    } catch (error) {
      Alert.alert("Error", "Failed to fetch swimming history.");
    }
  };

  const addSwimmingHistory = async () => {
    const newEntry: SwimmingData = {
      id: Math.random().toString(),
      duration: newSwimmingDuration,
      timestamp: new Date().toISOString(),
    };
console.log(UserID,'user id')
    try {
      const response = await axios.post("https://348e-115-64-55-67.ngrok-free.app/api/user/activity/swimming/insertswimming", {
        UserID:UserID, // Replace with actual user ID
        Duration: newSwimmingDuration,
      });
      const data = response.data;
      if (data.status==true) {
        setSwimmingHistory(prevState => [...prevState, newEntry]);
        setCurrentSwimmingDuration(prevState => prevState + newSwimmingDuration);
        setNewSwimmingDuration(0);
        Alert.alert("Success", "Successfully added");

      } else {
        Alert.alert("Error", "Failed to add swimming record.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to add swimming record.");
    }
  };

  const chartData = swimmingHistory?.map(entry => ({ value: entry.duration }));

  return (
    <Screen style={$root} preset="fixed">
      <ScrollView contentContainerStyle={$scrollViewContent}>
        <View style={$header}>
          <Text preset="h1" style={$title}>Swimming Tracker</Text>
        </View>
        <View style={$stats}>
          <View style={$stat}>
            <Text preset="h2bold" style={$statLabel}>Current Swimming Duration</Text>
            <Text preset="h1" style={$statValue}>{currentSwimmingDuration} mins</Text>
          </View>
        </View>
        <View style={$inputContainer}>
          <TextField
            inputWrapperStyle={$input}
            placeholder="Enter Swimming Duration (mins)"
            keyboardType="numeric"
            // value={newSwimmingDuration.toString()}
            onChangeText={text => setNewSwimmingDuration(parseInt(text))}
          />
        </View>
        <Button text="Add Swimming Record" onPress={addSwimmingHistory} style={$addButton} />
        <View style={$chartContainer}>
          <Text preset="h2bold" style={$chartTitle}>Historical Data</Text>
          <View style={$chartPlaceholder}>
            <PieChart data={chartData} />
          </View>
        </View>
        <LottieView source={require("../../assets/swimming.json")} style={{ height: calculateRelativeHeight(200) }} autoPlay loop />

      </ScrollView>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  padding: 20,
}

const $scrollViewContent: ViewStyle = {
  flexGrow: 1,
  justifyContent: 'center',
}

const $header: ViewStyle = {
  alignItems: 'center',
}

const $title: ViewStyle = {
  fontSize: 24,
}

const $stats: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  marginBottom: 20,
}

const $stat: ViewStyle = {
  alignItems: 'center',
}

const $statLabel: ViewStyle = {
  color: '#999',
  fontSize: 18,
  marginBottom: 10,
}

const $statValue: ViewStyle = {
  fontSize: 36,
}

const $chartContainer: ViewStyle = {
  alignItems: 'center',
  marginBottom: 20,
}

const $chartTitle: ViewStyle = {
  fontSize: 18,
  marginBottom: 10,
}

const $chartPlaceholder: ViewStyle = {
  width: '100%',
  backgroundColor: colors.palette.neutral200,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 30,
}

const $buttonsContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
}

const $inputContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: spacing.medium,
  marginBottom: spacing.medium,
  justifyContent: 'space-between',
  alignSelf: 'center'
}

const $input: ViewStyle = {
  borderWidth: 1,
  borderColor: colors.palette.primary100,
  borderRadius: 8,
  marginRight: 8,
  minWidth: calculateRelativeWidth(200),
}

const $addButton: ViewStyle = {
  maxWidth: calculateRelativeWidth(150),
  alignSelf: 'center'
}
