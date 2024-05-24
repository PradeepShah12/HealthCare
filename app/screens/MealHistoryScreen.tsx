import React, { FC, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { ViewStyle } from "react-native";
import { AppStackScreenProps } from "app/navigators";
import { MealItem, Screen, Spacer, Text } from "app/components";
import { $globalTextStyles } from "app/theme/styles";
import { useAppSelector } from "app/store";
import { Alert } from "react-native";

interface Meal {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

interface MealHistoryScreenProps extends AppStackScreenProps<"MealHistory"> {
  userID: string;
  startDate: string;
  endDate: string;
}

export const MealHistoryScreen: FC<MealHistoryScreenProps> = observer(function MealHistoryScreen({ route }) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const startDate = "2024-02-01";
  const endDate = "2024-05-31";

const {userId:userID}= useAppSelector(state=>state?.user?.user?.id)

  useEffect(() => {
    fetch(`http://localhost:3003/user/activity/nutritionTracker/getIntake?UserID=${userID}&SDate=${startDate}&EDate=${endDate}`)
      .then(response => response.json())
      .then(data => setMeals(data))
      .catch(error =>Alert.alert("Error","Error fetching meals:"));
  }, [userID, startDate, endDate]);

  return (
    <Screen style={$root} preset="scroll" safeAreaEdges={["top"]}>
      <Text text="Meal History" preset="h2bold" style={$globalTextStyles.center} />
      <Spacer size="small" />  
      {meals.map(meal => (
        <MealItem 
          key={meal.id} 
          mealName={meal.name} 
          calories={meal.calories} 
          protein={meal.protein} 
          carbs={meal.carbs} 
          fats={meal.fats} 
        />
      ))}
    </Screen>
  );
});

const $root: ViewStyle = {
  flex: 1,
};
