import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import LottieView from 'lottie-react-native';

import { View, ViewStyle, ScrollView } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, Spacer, Text, TextField } from "app/components"
import { calculateRelativeHeight, calculateRelativeWidth } from "app/utils/calculateRelativeDimensions";
import { Device, colors, spacing } from "app/theme";
import { PieChart } from "react-native-gifted-charts";
// import { useStores } from "app/models"

interface SwimmingTrackerScreenProps extends AppStackScreenProps<"SwimmingTracker"> {}
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

  const addSwimmingHistory = () => {
    const newEntry: SwimmingData = {
      id: Math.random().toString(),
      duration: newSwimmingDuration,
      timestamp: new Date().toDateString(),
    };
    setSwimmingHistory(prevState => [...prevState, newEntry]);
    setCurrentSwimmingDuration(prevState => prevState + newSwimmingDuration);
    setNewSwimmingDuration(0);
  };

  const deleteSwimmingHistory = (id: string) => {
    const deletedSwimmingDuration = swimmingHistory.find(entry => entry.id === id)?.duration || 0;
    setSwimmingHistory(prevState => prevState.filter(entry => entry.id !== id));
    setCurrentSwimmingDuration(prevState => prevState - deletedSwimmingDuration);
  };

  const handleRefresh = () => {
    // Add logic to refresh data
  }

  const handleViewDetails = () => {
    // Add logic to navigate to details screen
  }

  const chartData = swimmingHistory.map(entry => ({ value: entry.duration }));

  return (
    <Screen style={$root} preset="fixed">
      <ScrollView contentContainerStyle={$scrollViewContent}>
        <View style={$header}>
          <Text preset="h1" style={$title}>Swimming Tracker</Text>
        </View>
        <View style={$stats}>
          <View style={$stat}>
            <Text preset="h2bold" style={$statLabel}>Current Swimming Duration</Text>
            <Text preset="h1" style={$statValue}>{swimmingHistory[swimmingHistory.length-1].duration} mins</Text>
          </View>
        </View>
        <View style={$inputContainer}>
          <TextField
            inputWrapperStyle={$input}
            placeholder="Enter Swimming Duration (mins)"
            keyboardType="numeric"
            value={newSwimmingDuration.toString()}
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
        <LottieView source={require("../../assets/swimming.json")}  style={{height:calculateRelativeHeight(200)}}  autoPlay loop />

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
  alignSelf:'center'
}