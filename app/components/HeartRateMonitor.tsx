import { colors, spacing } from 'app/theme';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart, LineChart, PieChart, PopulationPyramid } from "react-native-gifted-charts";

interface HeartRateMonitorProps {
  currentHeartRate: number;
  abnormalHeartRate: boolean;
  heartRateHistory: { x: number, y: number }[];
}
const data=[ {value:50}, {value:80}, {value:90}, {value:70} ]

const randomNumber = () => Math.floor(Math.random() * (50 - 25 + 1)) + 25;

// const DATA = (numberPoints = 13) =>
//   Array.from({ length: numberPoints }, (_, index) => ({
//     day: index + 1,
//     sales: randomNumber(),
//   }))

const HeartRateMonitor: React.FC<HeartRateMonitorProps> = ({ currentHeartRate, abnormalHeartRate, heartRateHistory }) => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Heart Rate Monitor</Text>
      <Text>Current Heart Rate: {currentHeartRate}</Text>
      {/* {abnormalHeartRate && <Text style={styles.abnormal}>Abnormal Heart Rate Detected!</Text>}

      <LineChart data = {data} areaChart height={spacing.massive+spacing.large} /> */}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    // padding: 16,
    marginBottom: 16,
    elevation: 2,
    justifyContent:'space-between'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  abnormal: {
    color: 'red',
    fontWeight: 'bold',
    marginTop: 8,
  },
});

export default HeartRateMonitor;
