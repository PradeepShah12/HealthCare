import * as React from "react";
import { StyleProp, View, ViewStyle, StyleSheet } from "react-native";
import { observer } from "mobx-react-lite";
import { colors, typography } from "app/theme";
import { Text } from "app/components/Text";

export interface MealItemProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>;
  mealName: string;
  calories: string;
  Proteins:string;
  Fats:string;
  Carbohydrates:string;
}

/**
 * Describe your component here
 */
export const MealItem = observer(function MealItem(props: MealItemProps) {
  const { style, mealName, calories ,Proteins,Fats,Carbohydrates} = props;
  const $styles = [styles.container, style];

  return (
    <View style={$styles}>
      <View style={styles.card}>
        <Text  text={mealName} preset="h3"/>
        <Text style={styles.calories}>Calories: {calories}</Text>
        <Text style={styles.calories}>Protein: {Proteins}</Text>
        <Text style={styles.calories}>Fat: {Fats}</Text>
        <Text style={styles.calories}>Protein: {Proteins}</Text>
        <Text style={styles.calories}>Carbohydrates: {Carbohydrates}</Text>




      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    elevation: 5,
  },
  mealName: {
    // fontFamily: typography.primary.normal,
    fontSize: 16,
    color: colors.palette.primary500,
    marginBottom: 5,
  },
  calories: {
    // fontFamily: typography.primary.normal,
    fontSize: 14,
    color: colors.text
  },
});
