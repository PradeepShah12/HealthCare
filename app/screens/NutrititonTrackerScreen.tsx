import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { MealItem, NutritionSummary, Screen, Spacer, Text } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { meals } from "./MealHistoryScreen"
import { colors } from "app/theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface NutrititonTrackerScreenProps extends AppStackScreenProps<"NutrititonTracker"> {}

export const NutrititonTrackerScreen: FC<NutrititonTrackerScreenProps> = observer(function NutrititonTrackerScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  return (
    <Screen style={styles.container} preset="scroll" safeAreaEdges={["top"]}>
      <View style={styles.content}>
      <Text text="Nutrition Tracker" preset="h2bold"/>
      <Spacer size="small"/>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddMeal')}>
          <Text style={styles.buttonText}>Add Meal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MealHistory')}>
          <Text style={styles.buttonText}>Meal History</Text>
        </TouchableOpacity>
      </View>    
      <Text text="Nutrition Summary" preset="h3bold"/>
      <Spacer size="small"/>

      <NutritionSummary meal={meals[0]} />
      <Text text="Nutrition Log" preset="h3bold"/>
      <Spacer size="small"/>
      {meals.map(meal => (
        <MealItem key={meal.id} mealName={meal.name} calories={meal.calories} />
      ))}
    </Screen>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flex: 1,
    marginHorizontal: 5,
    elevation: 3,
  },
  label: {
    // fontFamily: typography.primary.normal,
    fontSize: 14,
    color: colors.text,
    marginBottom: 5,
  },
  value: {
    // fontFamily: typography.primary.normal,
    fontSize: 16,
    color: colors,
  },
});