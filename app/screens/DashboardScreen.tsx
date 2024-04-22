import React, { FC } from "react";
import { observer } from "mobx-react-lite";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { AppStackScreenProps, navigate } from "app/navigators";
import { Screen, Text, Button } from "app/components";
import { $globalViewStyles, colors, spacing, typography } from "app/theme";
import StepTracker from "app/components/StepTracker";
import HeartRateMonitor from "app/components/HeartRateMonitor";
import SleepTracker from "app/components/SleeepTracker";

interface ActivityItem {
  id: string;
  title: string;
  duration: string;
  type: string;
}

interface DashboardScreenProps extends AppStackScreenProps<"Dashboard"> {}

const dummyActivityData: ActivityItem[] = [
  { id: "1", title: "Morning Walk", duration: "30 minutes", type: "Walking" },
  { id: "2", title: "Afternoon Nap", duration: "1 hour", type: "Sleep" },
  { id: "3", title: "Evening Jog", duration: "45 minutes", type: "Running" },
];

export const DashboardScreen: FC<DashboardScreenProps> = observer(function DashboardScreen() {
  return (
    <Screen style={styles.root} preset="scroll" safeAreaEdges={["top"]} StatusBarProps={{ backgroundColor: "red", networkActivityIndicatorVisible: true }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={()=>navigate("StepTracker")} style={[styles.card, $globalViewStyles.shadow]}>
          <StepTracker  stepsHistory={400} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigate("SleepTracker")} style={[styles.card, $globalViewStyles.shadow]}>
          <SleepTracker sleepDuration={""} sleepQuality={""} sleepAnalysisData={[]} />
        </TouchableOpacity>
  
      </View>
      <TouchableOpacity onPress={()=>navigate("HeartRateMonitor")} style={[styles.card, $globalViewStyles.shadow,{alignItems:'center'}]}>
          <HeartRateMonitor currentHeartRate={0} abnormalHeartRate={true} heartRateHistory={[]} />
        </TouchableOpacity>
      <View style={[styles.card, styles.activityContainer,]}>
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
      </View>
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
