import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, StatusBar, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, Text, TextField } from "app/components"
import { StyleSheet } from "react-native"
import { colors, spacing } from "app/theme"
import { calculateRelativeHeight, calculateRelativeWidth } from "app/utils/calculateRelativeDimensions"
import { View } from "react-native"
import { LineChart } from "react-native-gifted-charts"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"
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
  const [TotalStepsTaken, setTotalStepsTake] = useState<number>(0);

  const addStepRate = () => {
    const parsedStepRate = parseInt(newStepRate, 10);
    if (!isNaN(parsedStepRate)) {
      const newEntry: StepRateData = {
        id: Math.random().toString(),
        step: parsedStepRate,
        timestamp: new Date().toDateString(),
      };
      setTotalStepsTake(prev=>prev+parsedStepRate)

      setStepRateHistory(prevState => [...prevState, newEntry]);
      setCurrentStepRate(parsedStepRate);
      setNewStepRate("");
    }
  };

  const deleteStepRate = (id: string,newStepRate:string) => {
    setTotalStepsTake(prev=>prev-parseInt(newStepRate))

    const deletedStepRate = stepRateHistory.find(entry => entry.id === id)?.step || 0;
    setStepRateHistory(prevState => prevState.filter(entry => entry.id !== id));
    setCurrentStepRate(prevState => prevState === deletedStepRate ? 0 : prevState);
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
        <Text style={styles.currentStepRate}>Toal Steps: {TotalStepsTaken}</Text>

        <LineChart 
        yAxisColor={colors.palette.neutral100}
        yAxisTextStyle={{color:colors.palette.neutral100}}
        xAxisLabelTextStyle={{color:colors.palette.neutral100}}
color1={colors.palette.neutral100}
          stripColor={'red'} // extract colors from chartData

        data={chartData} areaChart  areaChart4/>
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
          <View style={{flexGrow:1}}>
          <FlatList
            data={entries}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.historyItem}>
                <Text>{item.timestamp}: {item.step}</Text>
                <Button text="Delete" onPress={() => deleteStepRate(item.id,item.step)} style={styles.deleteButton} />
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
    justifyContent:'space-between',
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
    minWidth:calculateRelativeWidth(180)
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

export default StepTrackerScreen;