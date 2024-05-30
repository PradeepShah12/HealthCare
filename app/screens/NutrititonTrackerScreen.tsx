import React, { FC, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { AppStackScreenProps } from "app/navigators";
import { MealItem, NutritionSummary, Screen, Spacer, Text } from "app/components";
import { useNavigation } from "@react-navigation/native";
import { colors } from "app/theme";
import axios from "axios";
import { useAppSelector } from "app/store";

interface Meal {
  id: string;
  name: string;
  calories: number;
}

interface NutrititonTrackerScreenProps extends AppStackScreenProps<"NutrititonTracker"> { }

export const NutrititonTrackerScreen: FC<NutrititonTrackerScreenProps> = observer(function NutrititonTrackerScreen() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { UserID } = useAppSelector(state => state.user.user)
  const navigation = useNavigation();
  const Stime= new Date("2024-05-01")
  const Etime= new Date("2024-05-31")
  useEffect(() => {
    fetchIntake();
  }, []);

  const fetchIntake = async () => {
    try {
      const response = await axios.post("https://c1b4-165-225-114-126.ngrok-free.app/api/user/activity/nutritionTracker/getIntake", {
      
          UserID: UserID,
          SDate:Stime.toISOString(),
          EDate:Etime.toISOString()        
      });
      const data = response.data;
      console.log(data,'data in respnse')
     if(data?.length>0){ setMeals(data);}
    } catch (error) {
      Alert.alert("Alert", "Failed to fetch intake data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Screen style={styles.container} preset="scroll" safeAreaEdges={["top"]}>
        <Text>Loading...</Text>
      </Screen>
    );
  }
  function aggregateNutritionalData(meals) {
    return meals.reduce((acc, meal) => {
      acc.calories += meal.Calories;
      acc.proteins += meal.Proteins;
      acc.fats += meal.Fats;
      acc.carbohydrates += meal.Carbohydrates;
      return acc;
    }, {
      calories: 0,
      proteins: 0,
      fats: 0,
      carbohydrates: 0
    });
  }
  
  // Example usage:
  
  const totals = aggregateNutritionalData(meals);
  console.log(totals);
  // Output will be:
  // { calories: 1100, proteins: 45, fats: 25, carbohydrates: 110 }
  
  return (
    <Screen style={styles.container} preset="scroll" safeAreaEdges={["top"]}>
      <View style={styles.content}>
        <Text text="Nutrition Tracker" preset="h2bold" />
        <Spacer size="small" />
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddMeal')}>
          <Text style={styles.buttonText}>Add Meal</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MealHistory')}>
          <Text style={styles.buttonText}>Meal History</Text>
        </TouchableOpacity> */}
      </View>
      <Text text="Nutrition Summary" preset="h3bold" />
      <Spacer size="small" />
      {meals.length > 0 && <NutritionSummary meal={totals} />}
      <Text text="Nutrition Log" preset="h3bold" />
      <Spacer size="small" />
      {meals.map(meal => (
        <MealItem key={meal.CALORIEINTAKEID} mealName={meal.DateOFINTAKE} calories={meal.Calories} Proteins={meal.Proteins} Fats={meal.Fats} Carbohydrates={meal.Carbohydrates}  />
      ))}
    </Screen>
  );
});

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
    fontSize: 14,
    color: colors.text,
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: colors,
  },
});

export default NutrititonTrackerScreen;
