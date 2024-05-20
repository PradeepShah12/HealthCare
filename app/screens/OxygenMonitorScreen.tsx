import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import LottieView from 'lottie-react-native';

import { View, ViewStyle, ScrollView } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, Spacer, Text, TextField } from "app/components"
import { calculateRelativeHeight, calculateRelativeWidth } from "app/utils/calculateRelativeDimensions";
import { colors, spacing } from "app/theme";
import { PieChart } from "react-native-gifted-charts";
// import { useStores } from "app/models"

interface OxygenMonitorScreenProps extends AppStackScreenProps<"OxygenMonitor"> {}
interface OxygenData {
  id: string;
  percent: number;
  timestamp: string;
}

export const OxygenMonitorScreen: FC<OxygenMonitorScreenProps> = observer(function OxygenMonitorScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const [oxygenHistory, setOxygenHistory] = useState<OxygenData[]>([ { id: 'sunday',
    percent: 40,
    timestamp: new Date()}, { id: 'monday',
    percent: 20,
    timestamp: new Date()}]);

    const [currentOxygenPercent, setCurrentOxygenPercent] = useState<number>(0);
    const [newOxygenPercent, setNewOxygenPercent] = useState<number>(0);
  
    const addOxygenHistory = () => {
      const newEntry: OxygenData = {
        id: Math.random().toString(),
        percent: newOxygenPercent,
        timestamp: new Date().toDateString(),
      };
      setOxygenHistory(prevState => [...prevState, newEntry]);
      setCurrentOxygenPercent(prevState => prevState + newOxygenPercent);
      setNewOxygenPercent(0);
    };
  
    const deleteOxygenHistory = (id: string) => {
      const deletedOxygenPercent = oxygenHistory.find(entry => entry.id === id)?.percent || 0;
      setOxygenHistory(prevState => prevState.filter(entry => entry.id !== id));
      setCurrentOxygenPercent(prevState => prevState - deletedOxygenPercent);
    };







  const handleRefresh = () => {
    // Add logic to refresh data
  }

  const handleViewDetails = () => {
    // Add logic to navigate to details screen
  }
  const chartData = oxygenHistory.map(entry => ({ value: entry.percent }));

  return (
    <Screen style={$root} preset="fixed">
      <ScrollView contentContainerStyle={$scrollViewContent}>
        <View style={$header}>
          <Text preset="h1" style={$title}>Oxygen Monitoring</Text>
        </View>
        <View style={$stats}>
          <View style={$stat}>
            <Text preset="h2bold" style={$statLabel}>Current O2 Saturation</Text>
            <Text preset="h1" style={$statValue}>{oxygenHistory[oxygenHistory.length-1].percent}%</Text>
          </View>
        </View>
        <LottieView source={require("../../assets/lungs.json")}  style={{flex:1,height:calculateRelativeHeight(200)}} autoPlay loop />
        <View style={$inputContainer}>
        <TextField
          inputWrapperStyle={$input}
          placeholder="Enter Oxygen Percent"
          keyboardType="numeric"
          // value={newSleepDuration.toString()}
          onChangeText={text => setNewOxygenPercent(parseInt(text))}
        />
      </View>
      <Button text="Add Sleep Record" onPress={addOxygenHistory} style={$addButton} />

        <View style={$chartContainer}>

          <Text preset="h2bold" style={$chartTitle}>Historical Data</Text>
          {/* Placeholder for chart - replace with actual chart component */}
          <View style={$chartPlaceholder}>
          <PieChart data={chartData}  />

          </View>
        </View>
        <Spacer size="large" />
        <View style={$buttonsContainer}>
          <Button text="Refresh Data" preset="default" onPress={handleRefresh} />
          <Spacer size="medium" />
          {/* <Button text="View Details" preset="filled" onPress={handleViewDetails} /> */}
        </View>
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
  // marginBottom: 20,
}

const $title: ViewStyle = {
  fontSize: 24,
}

const $stats: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  marginBottom: 0,
}

const $stat: ViewStyle = {
  alignItems: 'center',
}

const $statLabel: ViewStyle = {
  color: '#999',
  fontSize: 18,
  marginBottom: 30,
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
  // height: 200,
  backgroundColor: colors.palette.neutral200,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius:30
}

const $buttonsContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
}


const $inputContainer:ViewStyle= {
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: spacing.medium,
  marginBottom: spacing.medium,
  justifyContent:'space-between',
alignSelf:'center'
  // minWidth: "90%",
}

const $input:ViewStyle={

    borderWidth: 1,
    borderColor: colors.palette.primary100,
    borderRadius: 8,
    marginRight: 8,
    minWidth: calculateRelativeWidth(200),

}


const $addButton:ViewStyle= {
    minWidth: calculateRelativeWidth(120)
  }