import React, { FC, useState } from "react";
import { observer } from "mobx-react-lite";
import { TextInput, View, ViewStyle, ScrollView } from "react-native";
import { AppStackScreenProps, goBack } from "app/navigators";
import { Button, Screen, Spacer, Text, TextField } from "app/components";
import { useNavigation, useRoute } from "@react-navigation/native";

interface Exercise {
  id: string;
  name: string;
  sets: number;
  image: string;
}

interface Workout {
  id: string;
  name: string;
  description: string;
  exercises: Exercise[];
  image: string;
}

interface AddEditWorkoutScreenProps extends AppStackScreenProps<"AddEditWorkout"> {}

export const AddEditWorkoutScreen: FC<AddEditWorkoutScreenProps> = observer(function AddEditWorkoutScreen() {
  const route = useRoute();
  const { workout, onSave } = route.params || {};
  const [name, setName] = useState(workout ? workout.name : '');
  const [description, setDescription] = useState(workout ? workout.description : '');
  const [exercises, setExercises] = useState<Exercise[]>(workout ? workout.exercises : []);
  const [imageUrl, setImageUrl] = useState(workout ? workout.image : '');
  const [exerciseName, setExerciseName] = useState('');
  const [exerciseSets, setExerciseSets] = useState('');
  const [exerciseImage, setExerciseImage] = useState('');

  const handleAddExercise = () => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: exerciseName,
      sets: parseInt(exerciseSets),
      image: exerciseImage,
    };
    setExercises([...exercises, newExercise]);
    setExerciseName('');
    setExerciseSets('');
    setExerciseImage('');
  };

  const handleSave = () => {
    const newWorkout: Workout = {
      id: workout ? workout.id : Date.now().toString(),
      name,
      description,
      exercises,
      image: imageUrl,
    };
    onSave(newWorkout);
    goBack();
  };

  return (
    <Screen preset="scroll" contentContainerStyle={{paddingBottom:50}}>
        <TextField
          label="Workout Name"
          value={name}
          onChangeText={setName}
        />
        <Spacer size="small"/>
        <TextField
          label="Description"
          value={description}
          onChangeText={setDescription}
        />
        <Spacer size="small"/>
        <TextField
          label="Image Url"
          value={imageUrl}
          onChangeText={setImageUrl}
        />
        <Spacer size="small"/>

        <Text>Exercises</Text>
        {exercises.map((exercise, index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <Text>Name: {exercise.name}</Text>
            <Text>Sets: {exercise.sets}</Text>
            <Text>Image: {exercise.image}</Text>
          </View>
        ))}

        <Spacer size="small"/>
        <TextField
          label="Exercise Name"
          value={exerciseName}
          onChangeText={setExerciseName}
        />
        <Spacer size="small"/>
        <TextField
          label="Exercise Sets"
          value={exerciseSets}
          onChangeText={setExerciseSets}
          keyboardType="numeric"
        />
        <Spacer size="small"/>
        <TextField
          label="Exercise Image Url"
          value={exerciseImage}
          onChangeText={setExerciseImage}
        />
        <Spacer size="small"/>
        <Button text="Add Exercise" onPress={handleAddExercise} />

        <Spacer size="small"/>
        <Button text="Save Workout" onPress={handleSave} />
    </Screen>
  );
});

const $root: ViewStyle = {
  flex: 1,
}
