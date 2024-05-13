import React, { FC, useState } from "react";
import { observer } from "mobx-react-lite";
import { TextInput, TouchableOpacity, View, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { AppStackScreenProps } from "app/navigators";
import { Screen, Text } from "app/components";

interface AddMealScreenProps extends AppStackScreenProps<"AddMeal"> {}

export const AddMealScreen: FC<AddMealScreenProps> = observer(function AddMealScreen() {
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fats, setFats] = useState('');

  const addMeal = () => {
    // Logic to add meal to data storage
  };

  return (
    <Screen safeAreaEdges={["top"]} style={styles.container}>
      <Text style={styles.title}>Add Meal</Text>
      <TextInput
        style={styles.input}
        placeholder="Meal Name"
        value={mealName}
        onChangeText={text => setMealName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Calories"
        value={calories}
        onChangeText={text => setCalories(text)}
        keyboardType="numeric"
      />
      <View style={styles.macrosContainer}>
        <TextInput
          style={[styles.input, styles.smallInput]}
          placeholder="Protein (g)"
          value={protein}
          onChangeText={text => setProtein(text)}
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, styles.smallInput]}
          placeholder="Carbs (g)"
          value={carbs}
          onChangeText={text => setCarbs(text)}
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, styles.smallInput]}
          placeholder="Fats (g)"
          value={fats}
          onChangeText={text => setFats(text)}
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity style={styles.addButton} onPress={addMeal}>
        <Text style={styles.buttonText}>Add Meal</Text>
      </TouchableOpacity>
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  macrosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  smallInput: {
    flex: 1,
    marginRight: 5,
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
