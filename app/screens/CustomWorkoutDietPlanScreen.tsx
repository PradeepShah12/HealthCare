import React, { FC, useState } from "react";
import { observer } from "mobx-react-lite";
import { ViewStyle } from "react-native";
import axios from 'axios'
import RNPickerSelect from "react-native-picker-select"

import { AppStackScreenProps } from "app/navigators";
import { Button, Screen, Spacer, Text, TextField } from "app/components";
import { colors, spacing } from "app/theme";
import { Alert } from "react-native";
import { useAppSelector } from "app/store";

interface CustomWorkoutDietPlanScreenProps extends AppStackScreenProps<"CustomWorkoutDietPlan"> { }

export const CustomWorkoutDietPlanScreen: FC<CustomWorkoutDietPlanScreenProps> = observer(function CustomWorkoutDietPlanScreen() {

  const { UserID, Weight, Height } = useAppSelector(state => state.user?.user)

  const [dietType, setDietType] = useState<string>('');
  const [workoutPlan, setWorkoutPlan] = useState<string>('');
  const [dietPlan, setDietPlan] = useState<string>('');
  const DietType = [
    { label: "VEG", value: "veg" },
    { label: "NON-VEG", value: "non-veg" },
    { label: "VEGAN", value: "vegan" },]


  const fetchPlans = () => {
    // Call the API endpoint to fetch custom workout and diet plans
    axios.post(`https://e0a9-115-64-55-67.ngrok-free.app/api/user/activity/customWorkoutplan/customplan`,{
      UserID:UserID,
      Weight:Weight,
      Height:Height,
      DietType:dietType
    })
      .then(data => {
        setWorkoutPlan(data.data.workoutPlan);
        setDietPlan(data.data.dietPlan);
      })
      .catch(error => Alert.alert("Error", "Error fetching custom plans"));
  };

  return (
    <Screen style={styles.container} preset="fixed">
      <Text style={styles.title}>Custom Workout & Diet Plan</Text>
      <Spacer size="medium" />

      <RNPickerSelect
                  onValueChange={(value) => setDietType(value)}
                  items={DietType}
                  style={pickerSelectStyles}
                  value={dietType}
                />
      <Spacer size="medium" />
      <Button text="Fetch Plans" onPress={fetchPlans} />
      <Spacer size="medium" />
      <Text style={styles.subtitle}>Workout Plan:</Text>
      <Text>{workoutPlan}</Text>
      <Spacer size="medium" />
      <Text style={styles.subtitle}>Diet Plan:</Text>
      <Text>{dietPlan}</Text>
    </Screen>
  );
});

const styles = {
  container: {
    flex: 1,
    paddingHorizontal: spacing.medium,
    paddingTop: spacing.medium,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: spacing.medium,
    color: colors.text,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: spacing.small,
    color: colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.palette.primary100,
    borderRadius: 8,
    marginBottom: spacing.small,
  },
};

export default CustomWorkoutDietPlanScreen;



const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
}
