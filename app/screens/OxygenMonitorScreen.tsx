import React, { FC, useState } from "react";
import { observer } from "mobx-react-lite";
import LottieView from 'lottie-react-native';
import { ScrollView, View, ViewStyle } from "react-native";
import { AppStackScreenProps } from "app/navigators";
import { Button, Screen, Spacer, Text, TextField } from "app/components";
import { calculateRelativeHeight, calculateRelativeWidth } from "app/utils/calculateRelativeDimensions";
import { colors, spacing } from "app/theme";
import { PieChart } from "react-native-gifted-charts";
import { Alert } from "react-native";

interface OxygenMonitorScreenProps extends AppStackScreenProps<"OxygenMonitor"> {}

interface OxygenData {
  id: string;
  percent: number;
  timestamp: string;
}

export const OxygenMonitorScreen: FC<OxygenMonitorScreenProps> = observer(function OxygenMonitorScreen() {
  const [oxygenHistory, setOxygenHistory] = useState<OxygenData[]>([
    { id: 'sunday', percent: 40, timestamp: new Date().toDateString() },
    { id: 'monday', percent: 20, timestamp: new Date().toDateString() }
  ]);
  const [newOxygenPercent, setNewOxygenPercent] = useState<number>(0);

  const addOxygenHistory = () => {
    const newEntry: OxygenData = {
      id: Math.random().toString(),
      percent: newOxygenPercent,
      timestamp: new Date().toDateString(),
    };
    setOxygenHistory(prevState => [...prevState, newEntry]);
    setNewOxygenPercent(0);

    // Call API endpoint to insert oxygen data
    fetch('http://localhost:3001/user/activity/oxygen/insertheartbeat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Percent: newOxygenPercent,
        Timestamp: new Date().toISOString(),
      }),
    })
    .then(response => {
      if (response.ok) {
        console.log("Oxygen data inserted successfully.");
      } else {
        Alert.alert("ERROR","Failed to insert oxygen data.");
      }
    })
    .catch(error => {
      Alert.alert("ERROR","Error inserting oxygen data:", error);
    });
  };

  const handleRefresh = () => {
    // Add logic to refresh data
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
            <Text preset="h1" style={$statValue}>{oxygenHistory[oxygenHistory.length - 1].percent}%</Text>
          </View>
        </View>
        <LottieView source={require("../../assets/lungs.json")}  style={{flex:1,height:calculateRelativeHeight(200)}} autoPlay loop />
        <View style={$inputContainer}>
          <TextField
            inputWrapperStyle={$input}
            placeholder="Enter Oxygen Percent"
            keyboardType="numeric"
            value={newOxygenPercent.toString()}
            onChangeText={text => setNewOxygenPercent(parseInt(text))}
          />
          <Button text="Add Oxygen Record" onPress={addOxygenHistory} style={$addButton} />
        </View>
        <View style={$chartContainer}>
          <Text preset="h2bold" style={$chartTitle}>Historical Data</Text>
          <View style={$chartPlaceholder}>
            <PieChart data={chartData} />
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