import {  BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import React from "react"
import { CompositeScreenProps } from "@react-navigation/native"

import { Platform, TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"


import { colors, spacing,  } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"

import { calculateRelativeHeight } from "../utils/calculateRelativeDimensions"
import { DefaultHeader,  } from "../components"
import { DynamicIcon } from "../components/DynamicIcon"
import { DashboardScreen, HeartRateMonitorScreen, SettingScreen, SleepTrackerScreen } from "app/screens"
import StepTrackerScreen from "app/screens/StepTrackerScreen"


export type LoggedInParamList = {
  Dashboard: undefined
  StepTracker:undefined
  HeartRateMonitor:undefined
  SleepTracker:undefined
  Setting:undefined
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type LoggedInScreenProps<T extends keyof LoggedInParamList> = CompositeScreenProps<
  BottomTabScreenProps<LoggedInParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>
const Tab = createBottomTabNavigator<LoggedInParamList>()

export function LoggedInNavigator() {

  const { bottom } = useSafeAreaInsets()


  return (
    <Tab.Navigator
      screenOptions={{
        
   
        // headerShadowVisible:false,
// headerTintColor:colors.Map_Primary,
header(props) {
 return<DefaultHeader {...props}/>  
},
        headerStyle:{backgroundColor:colors.palette.primary100,borderWidth:1},
        // headerShown: true,
        tabBarShowLabel:false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height:Platform.OS==='ios'? bottom+55: bottom+70 }],
        tabBarActiveTintColor: colors.palette.Map_Primary,
        tabBarInactiveTintColor: colors.palette.neutral100,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
        unmountOnBlur: false,
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          headerShown:false,
          // tabBarLabel: translate("loggedInNavigator.Home"),
          tabBarIcon: ({ focused }) => (
            <DynamicIcon
              iconName="home"
              iconFamily="Ionicons"
              iconSize={30}
         
              iconColor={focused ? colors.palette.primary200 : colors.palette.neutral100}
            />
          ),
        }}
      />
          <Tab.Screen
        name="StepTracker"
        component={StepTrackerScreen}
        options={{
          headerShown:false,
          // tabBarLabel: translate("loggedInNavigator.Home"),
          tabBarIcon: ({ focused }) => (
            <DynamicIcon
              iconName="footsteps"
              iconFamily="Ionicons"
              iconSize={30}
         
              iconColor={focused ? colors.palette.primary200 : colors.palette.neutral100}
            />
          ),
        }}
      />
         <Tab.Screen
        name="HeartRateMonitor"
        component={HeartRateMonitorScreen}
        options={{
          headerShown:false,
          // tabBarLabel: translate("loggedInNavigator.Home"),
          tabBarIcon: ({ focused }) => (
            <DynamicIcon
              iconName="heartbeat"
              iconFamily="Fontisto"
              iconSize={30}
         
              iconColor={focused ? colors.palette.primary200 : colors.palette.neutral100}
            />
          ),
        }}
      />
              <Tab.Screen
        name="SleepTracker"
        component={SleepTrackerScreen}
        options={{
          headerShown:false,
          // tabBarLabel: translate("loggedInNavigator.Home"),
          tabBarIcon: ({ focused }) => (
            <DynamicIcon
              iconName="moon"
              iconFamily="Ionicons"
              iconSize={30}
         
              iconColor={focused ? colors.palette.primary200 : colors.palette.neutral100}
            />
            
          ),
        }}
      />

<Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          headerShown:false,
          // tabBarLabel: translate("loggedInNavigator.Home"),
          tabBarIcon: ({ focused }) => (
            <DynamicIcon
              iconName="menu"
              iconFamily="Ionicons"
              iconSize={30}
         
              iconColor={focused ? colors.palette.primary200 : colors.palette.neutral100}
            />
            
          ),
        }}
      />





    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.palette.secondary700,
  borderTopColor: colors.palette.primary100,
  // borderWidth:2,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.small,
  justifyContent: "space-between",
}

const $tabBarLabel: TextStyle = {
  fontSize: 14,
  lineHeight: 16,
  flex: 1,
  marginTop: calculateRelativeHeight(5),
  // alignContent: "center",
}

// @demo remove-file
