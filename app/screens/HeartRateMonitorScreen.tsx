import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, Text, TextField } from "app/components"
import { StyleSheet } from "react-native"
import { colors, spacing } from "app/theme"
import { calculateRelativeHeight, calculateRelativeWidth } from "app/utils/calculateRelativeDimensions"
import { View } from "react-native"
import { LineChart } from "react-native-gifted-charts"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"
interface HeartRateData {
  id: string;
  heartRate: number;
  timestamp: string;
}
interface HeartRateMonitorScreenProps extends AppStackScreenProps<"HeartRateMonitor"> {}

export const HeartRateMonitorScreen: FC<HeartRateMonitorScreenProps> = observer(function HeartRateMonitorScreen() {
  const [currentHeartRate, setCurrentHeartRate] = useState<number>(0);
  const [heartRateHistory, setHeartRateHistory] = useState<HeartRateData[]>([]);
  const [newHeartRate, setNewHeartRate] = useState<string>("");

  const addHeartRate = () => {
    const parsedHeartRate = parseInt(newHeartRate, 10);
    if (!isNaN(parsedHeartRate)) {
      const newEntry: HeartRateData = {
        id: Math.random().toString(),
        heartRate: parsedHeartRate,
        timestamp: new Date().toDateString(),
      };
      setHeartRateHistory(prevState => [...prevState, newEntry]);
      setCurrentHeartRate(parsedHeartRate);
      setNewHeartRate("");
    }
  };

  const deleteHeartRate = (id: string) => {
    const deletedHeartRate = heartRateHistory.find(entry => entry.id === id)?.heartRate || 0;
    setHeartRateHistory(prevState => prevState.filter(entry => entry.id !== id));
    setCurrentHeartRate(prevState => prevState === deletedHeartRate ? 0 : prevState);
  };

  const chartData = heartRateHistory.map(entry => ({ value: entry.heartRate }));
  const formattedHistory: { [key: string]: HeartRateData[] } = heartRateHistory.reduce((acc, entry) => {
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
    <Screen style={styles.root} preset="fixed" safeAreaEdges={["top"]}>
      <View style={styles.container}>
        <Text style={styles.title}>Heart Rate Monitor</Text>
        <Text style={styles.currentHeartRate}>Current Heart Rate: {currentHeartRate}</Text>

        <LineChart 
          stripColor={'red'} // extract colors from chartData

        data={chartData} areaChart  areaChart4/>
      </View>

      <View style={styles.inputContainer}>
        <TextField
          inputWrapperStyle={styles.input}
          placeholder="Enter new heart rate"
          
          keyboardType="numeric"
          value={newHeartRate}
          onChangeText={text => setNewHeartRate(text)}
        />
        <Button text="Add Heart Rate" onPress={addHeartRate} style={styles.addButton} />
      </View>
      {Object.entries(formattedHistory).map(([date, entries]) => (
        <View key={date}>
          <Text style={styles.date}>{date}</Text>
          <View style={{flexGrow:1}}>
          <FlatList
            data={entries}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.historyItem}>
                <Text>{item.timestamp}: {item.heartRate}</Text>
                <Button text="Delete" onPress={() => deleteHeartRate(item.id)} style={styles.deleteButton} />
              </View>
            )}
            contentContainerStyle={{paddingBottom:calculateRelativeHeight(500)}}
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
    backgroundColor: colors.palette.primary300,
    marginBottom: spacing.medium,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: spacing.small,
    color: colors.text,
  },
  currentHeartRate: {
    marginBottom: spacing.medium,
    color: colors.text,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.medium,
    marginBottom: spacing.medium,
    minWidth:'90%'
  },
  input: {
    borderWidth: 1,
    borderColor: colors.palette.primary100,
    borderRadius: 8,
    // paddingHorizontal: 12,
    marginRight: 8,
    minWidth:calculateRelativeWidth(220)
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
});

export default HeartRateMonitorScreen;