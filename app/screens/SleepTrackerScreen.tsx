import React, { FC, useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { FlatList } from "react-native";
import { Button, Screen, TextField } from "app/components";
import { colors, spacing } from "app/theme";
import { calculateRelativeWidth } from "app/utils/calculateRelativeDimensions";
import { PieChart } from "react-native-gifted-charts";
import { observer } from "mobx-react-lite";
import { LoggedInScreenProps } from "app/navigators/LoggedInNavigator";
import axios from "axios";

interface SleepData {
  id: string;
  sleepDuration: number;
  timestamp: string;
}

interface SleepTrackerScreenProps extends LoggedInScreenProps<"SleepTracker"> {}

export const SleepTrackerScreen: FC<SleepTrackerScreenProps> = observer(function SleepTrackerScreen() {
  const [currentSleepDuration, setCurrentSleepDuration] = useState<number>(0);
  const [sleepHistory, setSleepHistory] = useState<SleepData[]>([]);
  const [newSleepDuration, setNewSleepDuration] = useState<number>(0);

  useEffect(() => {
    fetchSleepHistory();
  }, []);

  const fetchSleepHistory = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/user/activity/sleep/getSleepRecords", {
        UserID: "user123", // Replace with actual user ID
        SDate: "2024-01-01", // Replace with actual start date
        EDate: "2024-12-31"  // Replace with actual end date
      });
      const data = response.data;
      setSleepHistory(data);
      const totalSleep = data.reduce((total: number, entry: SleepData) => total + entry.sleepDuration, 0);
      setCurrentSleepDuration(totalSleep);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch sleep records.");
    }
  };

  const addSleepRecord = async () => {
    const newEntry: SleepData = {
      id: Math.random().toString(),
      sleepDuration: newSleepDuration,
      timestamp: new Date().toDateString(),
    };
    try {
      const response = await axios.post("http://localhost:3001/api/user/activity/sleep/insertSleepRecord", {
        UserID: "user123", // Replace with actual user ID
        SleepDuration: newSleepDuration,
        Date: new Date().toISOString(),
      });
      const data = response.data;
      if (data.success) {
        setSleepHistory(prevState => [...prevState, newEntry]);
        setCurrentSleepDuration(prevState => prevState + newSleepDuration);
        setNewSleepDuration(0);
      } else {
        Alert.alert("Error", "Failed to add sleep record.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to add sleep record.");
    }
  };

  const deleteSleepRecord = async (id: string) => {
    try {
      const response = await axios.delete("http://localhost:3001/api/user/activity/sleep/deleteSleepRecord", {
        data: { UserID: "user123", SleepID: id } // Replace with actual user ID and sleep record ID
      });
      const data = response.data;
      if (data.success) {
        const deletedSleepDuration = sleepHistory.find(entry => entry.id === id)?.sleepDuration || 0;
        setSleepHistory(prevState => prevState.filter(entry => entry.id !== id));
        setCurrentSleepDuration(prevState => prevState - deletedSleepDuration);
      } else {
        Alert.alert("Error", "Failed to delete sleep record.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to delete sleep record.");
    }
  };

  const chartData = sleepHistory.map(entry => ({ value: entry.sleepDuration }));

  return (
    <Screen style={styles.root} preset="fixed" safeAreaEdges={["top"]}>
      <View style={styles.container}>
        <Text style={styles.title}>Sleep Tracker</Text>
        <Text style={styles.currentSleepDuration}>Total Sleep Duration: {currentSleepDuration} hours</Text>
        <PieChart data={chartData} />
      </View>

      <View style={styles.inputContainer}>
        <TextField
          inputWrapperStyle={styles.input}
          placeholder="Enter sleep duration (hours)"
          keyboardType="numeric"
          value={newSleepDuration.toString()}
          onChangeText={text => setNewSleepDuration(parseInt(text))}
        />
        <Button text="Add Sleep Record" onPress={addSleepRecord} style={styles.addButton} />
      </View>

      <FlatList
        data={sleepHistory}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Text>{item.timestamp}: {item.sleepDuration} hours</Text>
            <Button text="Delete" onPress={() => deleteSleepRecord(item.id)} style={styles.deleteButton} />
          </View>
        )}
      />
    </Screen>
  );
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    padding: spacing.medium,
    borderRadius: spacing.medium,
    backgroundColor: colors.calenderAvailable,
    marginBottom: spacing.medium,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: spacing.small,
    color: colors.text,
  },
  currentSleepDuration: {
    marginBottom: spacing.medium,
    color: colors.text,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.medium,
    marginBottom: spacing.medium,
    justifyContent: 'space-between',
    minWidth: "90%",
  },
  input: {
    borderWidth: 1,
    borderColor: colors.palette.primary100,
    borderRadius: 8,
    marginRight: 8,
    minWidth: calculateRelativeWidth(200),
  },
  addButton: {
    minWidth: calculateRelativeWidth(120),
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
    backgroundColor: colors.palette.primary300,
    borderRadius: spacing.small,
    marginBottom: spacing.small,
  },
  deleteButton: {
    backgroundColor: colors.palette.danger,
  },
});

export default SleepTrackerScreen;
