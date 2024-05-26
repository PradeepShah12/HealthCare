import React from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import {  useContext, useState } from 'react';
import { DynamicIcon } from 'app/components/DynamicIcon';
import FitnessCards from 'app/components/FitnessCards';
import { FitnessItems } from '../Context';
import { colors } from 'app/theme';

export const WorkOutScreen = () => {
  const [showIcon, setShowIcon] = useState(false);
  const { calories, minutes, workout, } = useContext(FitnessItems);

  return (
    <ScrollView showsVerticalScrollIndicator={false}
      style={{ marginTop: 20 }}>
      <View style={{ backgroundColor: colors.palette.secondary700, paddingTop: 40, paddingHorizontal: 20, height: 160, width: "100%" }}>

        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 30 }}>

          {/* First Card  */}
          <View style={styles.shadowCards}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>{calories.toFixed(2)}</Text>
            <Text>KCAL</Text>
          </View>

          {/* Second Card  */}
          <View style={styles.shadowCards}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>{workout}</Text>
            <Text>WORKOUTS</Text>
          </View>

          {/* Third Card  */}
          <View style={styles.shadowCards}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>{minutes}</Text>
            <Text>MINUTES</Text>
          </View>
        </View>
      </View>
      {/* Fitness Cards  */}
      <FitnessCards />
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  shadowCards: {
    backgroundColor: "#ffffff",
    width: "32%",
    height: 80,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
});