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

  useEffect(() => {
    fetchIntake();
  }, []);

  const fetchIntake = async () => {
    try {
      const response = await axios.get("http://192.168.18.12:3000/api/user/nutrition/getIntake", {
        params: {
          UserID: UserID, // Replace with actual user ID
        },
      });
      const data = response.data;
      setMeals(data);
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

  return (
    <Screen style={styles.container} preset="scroll" safeAreaEdges={["top"]}>
      <View style={styles.content}>
        <Text text="Nutrition Tracker" preset="h2bold" />
        <Spacer size="small" />
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddMeal')}>
          <Text style={styles.buttonText}>Add Meal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MealHistory')}>
          <Text style={styles.buttonText}>Meal History</Text>
        </TouchableOpacity>
      </View>
      <Text text="Nutrition Summary" preset="h3bold" />
      <Spacer size="small" />
      {meals.length > 0 && <NutritionSummary meal={meals[0]} />}
      <Text text="Nutrition Log" preset="h3bold" />
      <Spacer size="small" />
      {meals.map(meal => (
        <MealItem key={meal.id} mealName={meal.name} calories={meal.calories} />
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
