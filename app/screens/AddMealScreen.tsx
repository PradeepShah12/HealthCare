import React, { FC, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { StyleSheet, TouchableOpacity, View, TextInput, FlatList, Alert } from "react-native";
import { AppStackScreenProps } from "app/navigators";
import { Screen, Text } from "app/components";
import axios from "axios";
import { useAppSelector } from "app/store";

interface Cuisine {
  id: string;
  name: string;
}

interface Food {
  id: string;
  name: string;
}

interface Meal {
  id: string;
  name: string;
}

interface AddMealScreenProps extends AppStackScreenProps<"AddMeal"> { }

const API_BASE = "https://60de-115-64-55-67.ngrok-free.app";

export const AddMealScreen: FC<AddMealScreenProps> = observer(function AddMealScreen() {
  const [cuisines, setCuisines] = useState<Cuisine[]>([
    { id: "1", name: "Italian" },
    { id: "2", name: "Mexican" },
    { id: "3", name: "Chinese" },
  ]);
  const [selectedCuisine, setSelectedCuisine] = useState<Cuisine | null>(null);
  const [foods, setFoods] = useState<Food[]>([
    { id: "1", name: "Pizza" },
    { id: "2", name: "Pasta" },
    { id: "3", name: "Lasagna" },
  ]);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [meals, setMeals] = useState<Meal[]>([
    { id: "1", name: "Breakfast" },
    { id: "2", name: "Lunch" },
    { id: "3", name: "Dinner" },
  ]);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const { UserID } = useAppSelector(state => state.user.user)
  useEffect(() => {
    fetchCuisines();
  }, []);

  useEffect(() => {
    if (selectedCuisine) {
      fetchFoods(selectedCuisine.id);
    }
  }, [selectedCuisine]);

  useEffect(() => {
    if (selectedFood) {
      fetchMeals();
    }
  }, [selectedFood]);

  const fetchCuisines = async () => {
    try {
      const response = await axios.get(`${API_BASE}/user/activity/nutritionTracker/getCuisine`);
      setCuisines(response.data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch cuisines");
    }
  };

  const fetchFoods = async (cuisineId: string) => {
    try {
      const response = await axios.get(`https://60de-115-64-55-67.ngrok-free.app/user/activity/nutritionTracker/getFood`, {
        params: { CuisineID: cuisineId },
      });
      setFoods(response.data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch foods");
    }
  };

  const fetchMeals = async () => {
    try {
      const response = await axios.get(`https://60de-115-64-55-67.ngrok-free.app/user/activity/nutritionTracker/getMeals`);
      setMeals(response.data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch meals");
    }
  };

  const addMeal = async () => {
    try {
      await axios.post(`http://localhost:3004/user/activity/nutritionTracker/InsertIntaker`, {
        UserID: UserID, // replace with actual user ID
        MealID: selectedMeal?.id,
      });
      alert("Meal added successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to add meals");
    }
  };

  return (
    <Screen safeAreaEdges={["top"]} style={styles.container}>
      <Text style={styles.title}>Add Meal</Text>

      <Text style={styles.label}>Select Cuisine</Text>
      <FlatList
        data={cuisines}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedCuisine(item)} style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      {selectedCuisine && (
        <>
          <Text style={styles.label}>Select Food</Text>
          <FlatList
            data={foods}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setSelectedFood(item)} style={styles.item}>
                <Text style={styles.itemText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </>
      )}

      {selectedFood && (
        <>
          <Text style={styles.label}>Select Meal</Text>
          <FlatList
            data={meals}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setSelectedMeal(item)} style={styles.item}>
                <Text style={styles.itemText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </>
      )}

      {selectedMeal && (
        <TouchableOpacity style={styles.addButton} onPress={addMeal}>
          <Text style={styles.buttonText}>Add Meal</Text>
        </TouchableOpacity>
      )}
    </Screen>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
