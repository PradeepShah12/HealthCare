/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigatorScreenParams,
} from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import React from "react"
import { useColorScheme } from "react-native"
import * as Screens from "app/screens"
import Config from "../config"
import { useStores } from "../models"
import { DemoNavigator, DemoTabParamList } from "./DemoNavigator"
import { navigate, navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { colors } from "app/theme"
import { AuthStack } from "./AuthStack"
import { LoggedInNavigator } from "./LoggedInNavigator"
import { useAppSelector } from "app/store"
import { DynamicIcon } from "app/components/DynamicIcon"
import { AppHeader } from "app/components"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  Welcome: undefined
  Login: undefined
  Demo: NavigatorScreenParams<DemoTabParamList>
  // 🔥 Your screens go here
  LoggedInNavigator: undefined
	StepTracker: undefined
	HeartRateMonitor: undefined
	SleepTracker: undefined
	Setting: undefined
	WaterReminder: undefined
	BodyMeasurement: undefined
	NutrititonTracker: undefined
	AddMeal: undefined
	MealHistory: undefined
	Profile: undefined
	EditProfile: undefined
	OxygenMonitor: undefined
	SwimmingTracker: undefined
	WorkOut: undefined
	WorkOutDetail: undefined
	Fit: undefined
	Rest: undefined
	AddEditWorkout: undefined
	HealthFitnessBlog: undefined
	BlogDetail: undefined
	// IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
const isAuthenticated= useAppSelector(state=>state.auth.isAuthenticated)


  console.log(isAuthenticated,'is authenticatedd ')
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: true,
        header:(props)=><AppHeader {...props}/>,navigationBarColor: colors.danger}}
      initialRouteName={isAuthenticated ? "LoggedIn" : "Demo"}
    
    >
      {isAuthenticated ? (
        <>
          <Stack.Screen name="LoggedIn" component={LoggedInNavigator}   options={{headerShown:true,title:"Dashboard",headerBackTitle:'back',
        headerRight:()=> <DynamicIcon iconName="user-circle" iconSize={30} iconFamily="FontAwesome"  />,
        // headerLeft:()=> <DynamicIcon iconName="settings" iconSize={30} iconFamily="Ionicons" iconOnPress={()=>navigate("Setting")}/>
      }}  />

        </>
      ) : (
        <>
                  <Stack.Screen options={{headerShown:false}} name="Demo" component={AuthStack} />

          {/* <Stack.Screen name="Login" component={Screens.LoginScreen} /> */}
        </>
      )}

      {/** 🔥 Your screens go here */}
			<Stack.Screen name="StepTracker" component={Screens.StepTrackerScreen}  options={{headerShown:true,title:"Step Tracker",headerBackTitle:'back',
        headerRight:()=> <DynamicIcon iconName="user-circle" iconSize={30} iconFamily="FontAwesome"  />
      }}  />
			<Stack.Screen name="HeartRateMonitor" component={Screens.HeartRateMonitorScreen}  options={{headerShown:true,title:"Heart Rate Monitor",headerBackTitle:'back',
        headerRight:()=> <DynamicIcon iconName="user-circle" iconSize={30} iconFamily="FontAwesome"  />
      }} />
			<Stack.Screen name="SleepTracker" component={Screens.SleepTrackerScreen} options={{headerShown:true,title:"Sleep Tracker",headerBackTitle:'back',
        headerRight:()=> <DynamicIcon iconName="user-circle" iconSize={30} iconFamily="FontAwesome"  />
      }}  />
			<Stack.Screen name="Setting" component={Screens.SettingScreen}  options={{headerShown:true,title:"Setting",headerBackTitle:'back',
        headerRight:()=> <DynamicIcon iconName="user-circle" iconSize={30} iconFamily="FontAwesome"  />
      }}  />
			<Stack.Screen name="WaterReminder"  component={Screens.WaterReminderScreen} options={{headerShown:true,title:"Hydration Reminder",headerBackTitle:'back',
        headerRight:()=> <DynamicIcon iconName="user-circle" iconSize={30} iconFamily="FontAwesome"  />
      }} />
			<Stack.Screen name="BodyMeasurement" component={Screens.BodyMeasurementScreen} options={{title:"BMI",headerShown:true}} />
			<Stack.Screen name="NutrititonTracker" component={Screens.NutrititonTrackerScreen} options={{title:"Nutrition Tracker",headerShown:true}}  />
			<Stack.Screen name="AddMeal" component={Screens.AddMealScreen} options={{title:"Add Meal",headerShown:true}} />
			<Stack.Screen name="MealHistory" component={Screens.MealHistoryScreen}  options={{title:"Meal History",headerShown:true}}  />
			<Stack.Screen name="Profile" component={Screens.ProfileScreen} />
			<Stack.Screen name="EditProfile" component={Screens.EditProfileScreen} />
			<Stack.Screen name="OxygenMonitor" component={Screens.OxygenMonitorScreen} />
			<Stack.Screen name="SwimmingTracker" component={Screens.SwimmingTrackerScreen} />
			<Stack.Screen name="WorkOut" component={Screens.WorkOutScreen} />
			<Stack.Screen name="WorkOutDetail" component={Screens.WorkOutDetailScreen} />
			<Stack.Screen name="Fit" component={Screens.FitScreen} />
			<Stack.Screen name="Rest" component={Screens.RestScreen} />
			<Stack.Screen name="AddEditWorkout" component={Screens.AddEditWorkoutScreen} />
			<Stack.Screen name="HealthFitnessBlog" component={Screens.HealthFitnessBlogScreen} />
			<Stack.Screen name="BlogDetail" component={Screens.BlogDetailScreen} />
			{/* IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS */}
    </Stack.Navigator>
  )
})

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
})
