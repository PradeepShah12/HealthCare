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
import { useAppSelector } from "app/store";

interface SleepData {
  id: string;
  sleepDuration: number;
  timestamp: string;
}

interface SleepTrackerScreenProps extends LoggedInScreenProps<"SleepTracker"> { }

export const SleepTrackerScreen: FC<SleepTrackerScreenProps> = observer(function SleepTrackerScreen() {
  const [currentSleepDuration, setCurrentSleepDuration] = useState<number>(0);
  const [sleepHistory, setSleepHistory] = useState<SleepData[]>([]);
  const [newSleepDuration, setNewSleepDuration] = useState<number>(0);
  const { UserID } = useAppSelector(state => state.user.user)
  useEffect(() => {
    fetchSleepHistory();
  }, []);

  const fetchSleepHistory = async () => {
    const Stime= new Date("2024-05-01")
const Etime= new Date("2024-05-31")

    try {
      const response = await axios.post("https://e0a9-115-64-55-67.ngrok-free.app/api/user/activity/sleep/getsleep", {
        UserID: UserID, // Replace with actual user ID
        SDate:Stime.toISOString(),
      EDate:Etime.toISOString()
      });
      const data = response;
      console.log(data,'sleep recourd output')

      const output = data?.data?.map((item, index) => ({
        id: (index + 1).toString(),
        sleepDuration: item.Duration === null ? 0 : item.Duration,  // handling null Duration
        timestamp: item.DateOFSleep
      }));
   
        setSleepHistory(output);

      
      const totalSleep = output?.reduce((total: number, entry: SleepData) => total + entry.sleepDuration, 0);
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


    const now= new Date()
    try {
      const response = await axios.post("https://e0a9-115-64-55-67.ngrok-free.app/api/user/activity/sleep/insertsleep", {
        UserID: UserID, // Replace with actual user ID
        SleepDuration: newSleepDuration,
        // Date: now.toISOString(),
      });
      const data = response.data;
      if (data?.status==true) {
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
      const response = await axios.delete("https://e0a9-115-64-55-67.ngrok-free.app/api/user/activity/sleep/deleteSleepRecord", {
        data: { UserID: UserID, SleepID: id } // Replace with actual user ID and sleep record ID
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
          // value={newSleepDuration.toString()}
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
            {/* <Button text="Delete" onPress={() => deleteSleepRecord(item.id)} style={styles.deleteButton} /> */}
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
