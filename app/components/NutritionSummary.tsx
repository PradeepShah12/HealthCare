import * as React from "react"
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { Text } from "app/components/Text"
import { calculateRelativeHeight, calculateRelativeWidth } from "app/utils/calculateRelativeDimensions"

export interface NutritionSummaryProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  calories:string
   protein:string
    carbs:string
    fats:string
    meal:{  calories:string
      protein:string
       carbs:string
       fats:string}
}

/**
 * Describe your component here
 */
export const NutritionSummary = observer(function NutritionSummary(props: NutritionSummaryProps) {
  const { style ,calories, protein, carbs, fats,meal} = props
  const $styles = [$container, style]
  return (
    <View style={[styles.container, style]}>
      <View style={styles.card}>
        <Text preset="body2bold" text={"Total Calories"}/>
        <Text text={meal.calories}/>
      </View>
      <View style={styles.card}>
        <Text preset="body2bold" text={"Protein (g)"}/>
        <Text text={meal.proteins}/>
      </View>
      <View style={styles.card}>
        <Text preset="body2bold" text={"Carbs (g)"}/>
        <Text text={meal.carbohydrates}/>
      </View>
      <View style={styles.card}>
        <Text preset="body2bold" text={"Fats (g)"}/>
        <Text text={meal.fats}/>
      </View>
    </View>
  );
})

const $container: ViewStyle = {
  justifyContent: "center",
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
    // display:'flex',
    flexWrap:'wrap',

  },
  card: {
    backgroundColor:colors.palette.primary400,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems:'center',
    height:calculateRelativeHeight(50),
    width:calculateRelativeWidth(150),
    marginBottom:10,
   
    // flex: 1,
    // marginHorizontal: 5,
    elevation: 3,
  },
  label: {
    // fontFamily: typography.primary.normal,
    // fontSize: 14,
    // color: colors.text.secondary,
    marginBottom: 5,
  },
  value: {
    // fontFamily: typography.primary.normal,
    // fontSize: 16,
    color: colors.text,
  },
});