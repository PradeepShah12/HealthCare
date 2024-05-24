import React, { FC, useState } from "react";
import { observer } from "mobx-react-lite";
import { ViewStyle } from "react-native";
import { AppStackScreenProps } from "app/navigators";
import { Button, Screen, Spacer, Text, TextField } from "app/components";
import { colors, spacing } from "app/theme";
import { Alert } from "react-native";
import { useAppSelector } from "app/store";

interface CustomWorkoutDietPlanScreenProps extends AppStackScreenProps<"CustomWorkoutDietPlan"> {}

export const CustomWorkoutDietPlanScreen: FC<CustomWorkoutDietPlanScreenProps> = observer(function CustomWorkoutDietPlanScreen() {
  
  const {id,weight,height} = useAppSelector(state=>state.user?.user)

  const [dietType, setDietType] = useState<string>('');
  const [workoutPlan, setWorkoutPlan] = useState<string>('');
  const [dietPlan, setDietPlan] = useState<string>('');

  const fetchPlans = () => {
    // Call the API endpoint to fetch custom workout and diet plans
    fetch(`http://localhost:3001/user/activity/customWorkoutplan/customplan?id=${id}&Weight=${weight}&Height=${height}&DietType=${dietType}`)
      .then(response => response.json())
      .then(data => {
        setWorkoutPlan(data.workoutPlan);
        setDietPlan(data.dietPlan);
      })
      .catch(error =>Alert.alert("Error","Error fetching custom plans"));
  };

  return (
    <Screen style={styles.container} preset="fixed">
      <Text style={styles.title}>Custom Workout & Diet Plan</Text>
      <Spacer size="medium" />
 
      <TextField
        inputWrapperStyle={styles.input}
        label="Enter Diet Type"
        value={dietType}
        onChangeText={setDietType}
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
