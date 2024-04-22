import { spacing } from 'app/theme';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

interface SleepTrackerProps {
  sleepDuration: string;
  sleepQuality: string;
  sleepAnalysisData: any[]; // Array of sleep analysis data
}
const data=[ {value:50}, {value:80}, {value:90}, {value:70} ]

const SleepTracker: React.FC<SleepTrackerProps> = ({ sleepDuration, sleepQuality, sleepAnalysisData }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sleep Tracker</Text>
      <Text>Sleep Duration: {sleepDuration}</Text>
      <Text>Sleep Quality: {sleepQuality}</Text>
      <PieChart data={data} radius={spacing.massive+spacing.small}/>
      {/* Display sleep analysis chart/graph here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    justifyContent:'space-between'

  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default SleepTracker;
