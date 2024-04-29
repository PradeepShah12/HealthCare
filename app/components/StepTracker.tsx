import { colors, spacing } from 'app/theme';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart, LineChart, PieChart, PopulationPyramid } from "react-native-gifted-charts";

interface HeartRateMonitorProps {
stepsHistory: number;
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

const StepTracker: React.FC<HeartRateMonitorProps> = ({ stepsHistory, abnormalHeartRate, heartRateHistory }) => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Steps Counted</Text>

      <Text style={styles.title}>{stepsHistory}
      </Text>

      {/* <LineChart data = {data} areaChart  width={spacing.massive+spacing.large} height={spacing.massive+spacing.small}/> */}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    
    // padding: 16,
    // marginBottom: 16,
    // elevation: 2,
    justifyContent:'space-between',
    // a:'flex-start'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign:'center'
  },
  abnormal: {
    color: 'red',
    fontWeight: 'bold',
    marginTop: 8,
  },
});

export default StepTracker;
