import React, { FC, useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, StatusBar, ViewStyle, Alert } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, Text, TextField } from "app/components"
import { StyleSheet } from "react-native"
import { colors, spacing } from "app/theme"
import { calculateRelativeHeight, calculateRelativeWidth } from "app/utils/calculateRelativeDimensions"
import { View } from "react-native"
import { LineChart } from "react-native-gifted-charts"
import axios from 'axios';

interface StepRateData {
  id: string;
  step: number;
  timestamp: string;
}

interface StepTrackerScreenProps extends AppStackScreenProps<"StepTracker"> {}

export const StepTrackerScreen: FC<StepTrackerScreenProps> = observer(function StepTrackerScreen() {
  const [currentStepRate, setCurrentStepRate] = useState<number>(0);
  const [stepRateHistory, setStepRateHistory] = useState<StepRateData[]>([]);
  const [newStepRate, setNewStepRate] = useState<string>("");
  const [totalStepsTaken, setTotalStepsTaken] = useState<number>(0);

  useEffect(() => {
    fetchStepRateHistory();
  }, []);

  const fetchStepRateHistory = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/user/activity/stepcounter/getSteps", {
        UserID: "user123", // Replace with actual user ID
        SDate: "2024-01-01", // Replace with actual start date
        EDate: "2024-12-31"  // Replace with actual end date
      });
      const data = response.data;
      setStepRateHistory(data);
      const totalSteps = data.reduce((total: number, entry: StepRateData) => total + entry.step, 0);
      setTotalStepsTaken(totalSteps);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch step rate history.");
    }
  };

  const addStepRate = async () => {
    const parsedStepRate = parseInt(newStepRate, 10);
    if (!isNaN(parsedStepRate)) {
      const newEntry: StepRateData = {
        id: Math.random().toString(),
        step: parsedStepRate,
        timestamp: new Date().toDateString(),
      };
      try {
        const response = await axios.post("http://localhost:3001/api/user/activity/stepcounter/insertsteps", {
          UserID: "user123", // Replace with actual user ID
          Steps: parsedStepRate,
          Date: new Date().toISOString(),
        });
        const data = response.data;
        if (data.success) {
          setStepRateHistory(prevState => [...prevState, newEntry]);
          setTotalStepsTaken(prevState => prevState + parsedStepRate);
          setNewStepRate("");
        } else {
          Alert.alert("Error", "Failed to add step rate.");
        }
      } catch (error) {
        Alert.alert("Error", "Failed to add step rate.");
      }
    }
  };

  const deleteStepRate = async (id: string, stepRate: number) => {
    try {
      const response = await axios.delete("http://localhost:3001/api/user/activity/stepcounter/deletesteps", {
        data: { UserID: "user123", StepID: id } // Replace with actual user ID and step ID
      });
      const data = response.data;
      if (data.success) {
        setStepRateHistory(prevState => prevState.filter(entry => entry.id !== id));
        setTotalStepsTaken(prevState => prevState - stepRate);
      } else {
        Alert.alert("Error", "Failed to delete step rate.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to delete step rate.");
    }
  };

  const chartData = stepRateHistory.map(entry => ({ value: entry.step }));
  const formattedHistory: { [key: string]: StepRateData[] } = stepRateHistory.reduce((acc, entry) => {
    const timestamp = new Date(entry.timestamp);
    const month = timestamp.toLocaleString('default', { month: 'long' });
    const year = timestamp.getFullYear();
    const formattedDate = `${month} ${year}`;
    if (!acc[formattedDate]) {
      acc[formattedDate] = [];
    }
    acc[formattedDate].push(entry);
    return acc;
  }, {});

  return (
    <Screen style={styles.root} preset="scroll" safeAreaEdges={["top"]}>
      <View style={styles.container}>
        <Text style={styles.title}>Steps Monitor</Text>
        <Text style={styles.currentStepRate}>Current Steps: {currentStepRate}</Text>
        <Text style={styles.currentStepRate}>Total Steps: {totalStepsTaken}</Text>
        <LineChart
          yAxisColor={colors.palette.neutral100}
          yAxisTextStyle={{ color: colors.palette.neutral100 }}
          xAxisLabelTextStyle={{ color: colors.palette.neutral100 }}
          color1={colors.palette.neutral100}
          stripColor={'red'} // extract colors from chartData
          data={chartData}
          areaChart
          areaChart4
        />
      </View>

      <View style={styles.inputContainer}>
        <TextField
          inputWrapperStyle={styles.input}
          placeholder="Enter new steps taken"
          keyboardType="numeric"
          value={newStepRate}
          onChangeText={text => setNewStepRate(text)}
        />
        <Button text="Add Steps" onPress={addStepRate} style={styles.addButton} />
      </View>
      {Object.entries(formattedHistory).map(([date, entries]) => (
        <View key={date}>
          <Text style={styles.date}>{date}</Text>
          <View style={{ flexGrow: 1 }}>
            <FlatList
              data={entries}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <View style={styles.historyItem}>
                  <Text>{item.timestamp}: {item.step}</Text>
                  <Button text="Delete" onPress={() => deleteStepRate(item.id, item.step)} style={styles.deleteButton} />
                </View>
              )}
              contentContainerStyle={{ paddingBottom: calculateRelativeHeight(500) }}
            />
          </View>
        </View>
      ))}
    </Screen>
  )
})

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    padding: spacing.medium,
    borderRadius: spacing.medium,
    backgroundColor: colors.palette.secondary700,
    marginBottom: spacing.medium,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: spacing.small,
    color: colors.palette.neutral100,
  },
  currentStepRate: {
    marginBottom: spacing.medium,
    color: colors.palette.neutral100,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.medium,
    marginBottom: spacing.medium,
    minWidth: '90%'
  },
  input: {
    borderWidth: 1,
    borderColor: colors.palette.primary100,
    borderRadius: 8,
    marginRight: 8,
    minWidth: calculateRelativeWidth(180)
  },
  addButton: {
    minWidth: calculateRelativeWidth(120),
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
    backgroundColor: colors.palette.primary300,
    borderRadius: spacing.small,
    marginBottom: spacing.small,
  },
  deleteButton: {
    backgroundColor: colors.palette.danger,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: spacing.medium,
    marginVertical: spacing.small,
  }
});

export default StepTrackerScreen;
