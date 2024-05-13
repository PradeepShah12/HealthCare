import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { MealItem, Screen, Spacer, Text } from "app/components"
import { $globalTextStyles } from "app/theme/styles"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"
export const meals = [
  {
    id: 1,
    name: "Oatmeal",
    calories: 150,
    protein: 5,
    carbs: 27,
    fats: 2,
  },
  {
    id: 2,
    name: "Eggs",
    calories: 70,
    protein: 6,
    carbs: 1,
    fats: 5,
  },
  {
    id: 3,
    name: "Banana",
    calories: 105,
    protein: 1,
    carbs: 27,
    fats: 0,
  },
  {
    id: 4,
    name: "Chicken Breast",
    calories: 165,
    protein: 31,
    carbs: 0,
    fats: 3.6,
  },
  {
    id: 5,
    name: "Broccoli",
    calories: 55,
    protein: 4,
    carbs: 11,
    fats: 1,
  },
  {
    id: 6,
    name: "Brown Rice",
    calories: 218,
    protein: 5,
    carbs: 45,
    fats: 2,
  },
  {
    id: 7,
    name: "Salmon",
    calories: 206,
    protein: 22,
    carbs: 0,
    fats: 13,
  },
  {
    id: 8,
    name: "Avocado",
    calories: 234,
    protein: 3,
    carbs: 12,
    fats: 21,
  },
  {
    id: 9,
    name: "Greek Yogurt",
    calories: 100,
    protein: 10,
    carbs: 6,
    fats: 2,
  },
  {
    id: 10,
    name: "Spinach",
    calories: 23,
    protein: 3,
    carbs: 4,
    fats: 0,
  },
  // Add more items as needed...
];

interface MealHistoryScreenProps extends AppStackScreenProps<"MealHistory"> {}

export const MealHistoryScreen: FC<MealHistoryScreenProps> = observer(function MealHistoryScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  // Sample meal data


  return (
    <Screen style={$root} preset="scroll" safeAreaEdges={["top"]}>
    <Text text="Meal History" preset="h2bold" style={$globalTextStyles.center}/>
      <Spacer size="small"/>  
          {meals.map(meal => (
        <MealItem key={meal.id} mealName={meal.name} calories={meal.calories} />
      ))}
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
