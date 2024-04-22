import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StackScreenProps } from "@react-navigation/stack"
import {


  ForgotPasswordEmailSentScreen,
  ForgotPasswordScreen,
  LoginScreen, ResetPasswordScreen, SignupWithEmailScreen,

} from "../screens"

export type AuthStackParamList = {
  Login: undefined
  SignUp: undefined
  SignUpWithEmail: { type: "member" | "artist" }

  ForgotPasswordEmailSent: { id: string }
  ResetPassword: { reset_token: string; uid: string }
  ResetPasswordSuccess: undefined
  CreatePassword:undefined
  CreateUserName:undefined
  CreateUserDetail:undefined
  SchoolSetup:undefined
  ForgotPassword:undefined
  Space:undefined
  FeedBack:undefined
  // 🔥 Your screens go here
}

export type AuthStackScreenProps<T extends keyof AuthStackParamList> = StackScreenProps<
  AuthStackParamList,
  T
>

const Stack = createNativeStackNavigator<AuthStackParamList>()

export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUpWithEmail" component={SignupWithEmailScreen} />
    
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ForgotPasswordEmailSent" component={ForgotPasswordEmailSentScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />


    </Stack.Navigator>
  )
}
