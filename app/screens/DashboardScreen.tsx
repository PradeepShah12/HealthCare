import React, { FC } from "react";
import { observer } from "mobx-react-lite";
import { StyleSheet, View, FlatList, TouchableOpacity, ViewStyle } from "react-native";
import { AppStackScreenProps, navigate } from "app/navigators";
import { Screen, Text, Button, Spacer } from "app/components";
import { $globalViewStyles, colors, spacing, typography } from "app/theme";
import StepTracker from "app/components/StepTracker";
import HeartRateMonitor from "app/components/HeartRateMonitor";
import SleepTracker from "app/components/SleeepTracker";
import { DynamicIcon } from "app/components/DynamicIcon";

interface ActivityItem {
  id: string;
  title: string;
  duration: string;
  type: string;
}

interface DashboardScreenProps extends AppStackScreenProps<"Dashboard"> {}
const Actions = [
  { name: "Swimming Tracker", id: '1', icon: "water", navigationKey: "SwimmingScreen" },
  { name: "Hydration Reminder", id: '2', icon: "alarm", navigationKey: "WaterReminder" },
  { name: "Steps Taken", id: '11', icon: "walk", navigationKey: "StepTracker" },
  { name: "Sleep Tracker", id: '12', icon: "moon", navigationKey: "SleepTracker" },
  { name: "Nutrition Tracker", id: '3', icon: "nutrition", navigationKey: "NutritionTrackerScreen" },
  { name: "Workout Monitoring", id: '4', icon: "fitness", navigationKey: "WorkoutMonitoringScreen" },
  { name: "Heartbeat Monitoring", id: '6', icon: "heart", navigationKey: "HeartRateMonitor" },
  { name: "Health & Fitness Blog", id: '7', icon: "newspaper", navigationKey: "HealthFitnessBlogScreen" },
  { name: "Customizable workout plan", id: '8', icon: "options", navigationKey: "CustomWorkoutPlanScreen" },
  { name: "Oxygen Monitoring", id: '9', icon: "pulse", navigationKey: "OxygenMonitoringScreen" },
  { name: "Body Measurement Index", id: '10', icon: "body", navigationKey: "BodyMeasurementScreen" },
];

const dummyActivityData: ActivityItem[] = [
  { id: "1", title: "Morning Walk", duration: "30 minutes", type: "Walking" },
  { id: "2", title: "Afternoon Nap", duration: "1 hour", type: "Sleep" },
  { id: "3", title: "Evening Jog", duration: "45 minutes", type: "Running" },
];

export const DashboardScreen: FC<DashboardScreenProps> = observer(function DashboardScreen() {
  return (
    <Screen style={styles.root} preset="scroll" safeAreaEdges={["top"]} StatusBarProps={{ backgroundColor: "red", networkActivityIndicatorVisible: true }}>
       <Spacer size="small"/>
<View style={$listContainerStyle}>


{Actions.map((item,index)=>{
  return (

    <TouchableOpacity  key={item.id} onPress={()=>navigate(item.navigationKey)} style={[styles.card, $globalViewStyles.shadow,$globalViewStyles.rowCenter,$globalViewStyles.justifyContentBetween]}>
      <Text text={item.name}/>
      <DynamicIcon iconName={item.icon}/>
  </TouchableOpacity>
  )
})}
</View>





      {/* <View style={[styles.card, styles.activityContainer,]}>
        <Text style={styles.cardTitle}>Recent Activity</Text>
        <FlatList
          data={dummyActivityData}
          renderItem={({ item }) => (
            <View style={styles.activityItem}>
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>{item.title}</Text>
                <Text>{item.duration}</Text>
              </View>
              <Text style={styles.activityType}>{item.type}</Text>
            </View>
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.activityList}
        />
        <Button text="View All" onPress={() => console.log("View All pressed")} />
      </View> */}
    </Screen>
  );
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    paddingHorizontal: spacing.medium,
    marginTop: spacing.medium,
  },
  card: {
    borderRadius: 8,
    elevation: 2,
    marginBottom: spacing.medium,
    paddingVertical:spacing.extraMedium,
    paddingHorizontal:spacing.small,

    width:'45%',
    backgroundColor:'#6b99f5'

// alignItems:'center'
    // padding: spacing.medium,
    // minw: "48%", // Adjust according to your layout
  },
  cardTitle: {
    fontSize: spacing.large,
    fontWeight: "bold",
    marginBottom: spacing.medium,
  },
  activityContainer: {
    // backgroundColor: colors.palette.neutral100,
    // paddingHorizontal: spacing.medium,
    paddingVertical: spacing.medium,
    // marginHorizontal: spacing.medium,
  },
  activityList: {
    flexGrow: 1,
    marginBottom: spacing.medium,
  },
  activityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.small,
  },
  activityInfo: {
    flex: 1,
    marginRight: spacing.small,
  },
  activityTitle: {
    fontWeight: "bold",
    marginBottom: spacing.extraSmall,
  },
  activityType: {
    color: colors.textLight,
  },
});

export default DashboardScreen;


const $listContainerStyle:ViewStyle={flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between'}