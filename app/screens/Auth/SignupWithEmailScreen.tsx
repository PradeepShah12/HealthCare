import React, { FC, useRef, useState } from "react"
import { Modalize } from 'react-native-modalize';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import { Keyboard, Pressable, View, ViewStyle } from "react-native"
import {  Button, Screen, Spacer, Text, TextField } from "../../components"
import { $globalViewStyles, colors, spacing } from "../../theme"

import * as Yup from "yup"
import { Formik } from "formik"

import { useAppDispatch } from "../../store"

import { AuthStackScreenProps } from "../../navigators/AuthStack"
import { LogoTextHeader } from "../../components/LogoTextHeader"

import { calculateRelativeHeight, calculateRelativeWidth } from "../../utils/calculateRelativeDimensions";
import { AxiosError } from "axios";
import { AuthService } from "../../services/api/Auth/auth.api";
import { useMutation } from "@tanstack/react-query";
import { setError, setSuccess } from "../../store/Error/error.slice";
import { ImageStyle } from "react-native-fast-image";
import { ApiErrorResponse } from "apisauce";

interface JoinWithEmail {
  firstName: string,
  lastName:string,
  email: string,
  username: string,
  password: string
  height:string,
  weight:string,
  country:string,
  dateOfBirth:string


}

interface SignUpWithEmailScreenProps extends AuthStackScreenProps<"SignUpWithEmail"> { }

const validation = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName:Yup.string().required("Last Name is required"),
  country:Yup.string().required("Country is required"),
  dateOfBirth:Yup.string().required("Country is required"),
  height:Yup.string().required("Height is required"),
  weight:Yup.string().required("Weight is required"),
  email: Yup.string().required("Email is required").email("Enter valid email"),
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Phone number is required"),
})

export const SignupWithEmailScreen: FC<SignUpWithEmailScreenProps> = (props) => {
  const modalizeRef = useRef<Modalize>(null);
  const [otp, setOtp] = useState<string>('1')
  const _navigation = props.navigation
  const formInitialValues: JoinWithEmail = {
    firstName: "",
    lastName:"",
    email: "",
    username: "",
    password: "",
    height:"",
    weight:"",
    country:"",
    dateOfBirth:""

  }

  const dispatch = useAppDispatch()

  const { mutate: register, isPending: initationPending } = useMutation({
    mutationFn: (body: JoinWithEmail) => AuthService.register(body),
    onSuccess: async (response) => {
      if (response?.message) {
        dispatch(setSuccess({
          errorMessage: response?.message,
          isSnackBarVisible: true
        }))
      } else {
        dispatch(setError({
          errorMessage: response?.email[0],
          isSnackBarVisible: true
        }))
      }
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      dispatch(
        setError({
          isSnackBarVisible: true,
          errorMessage: error.message || "Invalid email or password.",
        }),
      )
    },
  })

  const onSubmit = (values: JoinWithEmail) => {
    register(values)
  }

  return (
    <Screen style={$root}  preset="auto" safeAreaEdges={["top", "bottom"]}>
      <View style={$globalViewStyles.center}>
        {/* <Spacer size="medium" /> */}
        <LogoTextHeader />
        <Text tx="auth.signup.joinWithEmail" preset="h3bold" />
        <Spacer size="tiny" />
        <Text tx="auth.signup.enterInformation" preset="inactive" />
      </View>
      <Spacer size="huge" />

      {/* <AutoImage source={Logo} style={$imageStyle} /> */}
      <View >
        <Formik
        
          initialValues={formInitialValues}
          onSubmit={(values: JoinWithEmail) => {
            Keyboard.dismiss()
            onSubmit(values)
          }}
          validationSchema={validation}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View >
              <TextField
                labelTx="common.firstName"
                value={values.firstName}
                containerStyle={$textInputStyle}
                onChangeText={handleChange("firstName")}
                status={errors.firstName ? "error" : null}
                helper={errors.firstName}
                onBlur={handleBlur("firstName")}
              />
                   <TextField
                labelTx="common.lastName"
                value={values.lastName}
                containerStyle={$textInputStyle}
                onChangeText={handleChange("lastName")}
                status={errors.lastName ? "error" : null}
                helper={errors.lastName}
                onBlur={handleBlur("lastName")}
              />
              <TextField
                labelTx="common.email"
                value={values.email}
                containerStyle={$textInputStyle}
                onChangeText={handleChange("email")}
                status={errors.email ? "error" : null}
                helper={errors.email}
                onBlur={handleBlur("email")}
                keyboardType="email-address"
              />
           <TextField
                labelTx="common.username"
                value={values.username}
                containerStyle={$textInputStyle}
                onChangeText={handleChange("username")}
                status={errors.username ? "error" : null}
                helper={errors.username}
                onBlur={handleBlur("username")}
              /> 
              <TextField
                labelTx="common.password"
                value={values.password}
                containerStyle={$textInputStyle}
                onChangeText={handleChange("password")}
                status={errors.password ? "error" : null}
                helper={errors.password}
                onBlur={handleBlur("password")}
                keyboardType="phone-pad"
              /> 
               <TextField
                labelTx="common.height"
                value={values.height}
                containerStyle={$textInputStyle}
                onChangeText={handleChange("height")}
                status={errors.height ? "error" : null}
                helper={errors.height}
                onBlur={handleBlur("height")}
              /> 
                <TextField
                labelTx="common.weight"
                value={values.weight}
                containerStyle={$textInputStyle}
                onChangeText={handleChange("weight")}
                status={errors.weight ? "error" : null}
                helper={errors.weight}
                onBlur={handleBlur("weight")}
              /> 
                  <TextField
                labelTx="common.country"
                value={values.country}
                containerStyle={$textInputStyle}
                onChangeText={handleChange("country")}
                status={errors.country ? "error" : null}
                helper={errors.country}
                onBlur={handleBlur("country")}
              /> 
                       <TextField
                labelTx="common.dateOfBirth"
                value={values.dateOfBirth}
                containerStyle={$textInputStyle}
                onChangeText={handleChange("dateOfBirth")}
                status={errors.dateOfBirth ? "error" : null}
                helper={errors.dateOfBirth}
                onBlur={handleBlur("dateOfBirth")}
              /> 
              <Button
                preset="filled"
                tx={initationPending ? "common.loading" : "auth.signup.createAccount"}
                onPress={() => handleSubmit()}
                disabled={initationPending}
              />
            </View>
          )}
        </Formik>

        {/* <Spacer size="medium" />
        <View style={$divider}>
          <View style={$line} />
          <Text tx="common.or" preset="inactive" />
          <View style={$line} />
        </View>
        <Spacer size="small" />
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Standard}
          color={GoogleSigninButton.Color.Light} 
          style={$appleButtonStyle}
          /> */}
        <Spacer size="medium" />
        <View style={$haveAccountContainer}>
          <Text preset="body2" tx="auth.signup.alreadyHaveAccount" />
          <Pressable style={$loginText} onPress={() => _navigation.push("Login")}>
            <Text
              tx="common.login"
              preset="body1bold"
              style={{ color: colors.palette.secondary700 }}
            />
          </Pressable>
          <Spacer size="medium" />
        </View>
      </View>

    </Screen>
  )
}

const $textInputStyle: ViewStyle = {
  marginBottom: spacing.large,
}

const $root: ViewStyle = {
  flex: 1,
}
const $rootContainer: ViewStyle = {
  flex: 1,
  // justifyContent:'space-between'
}

const $loginText: ViewStyle = {
  marginLeft: spacing.large,
}

const $haveAccountContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
}

const $modalContainerStyle: ViewStyle = {
  padding: spacing.medium,
  backgroundColor: colors.palette.primary400,
}
const $cancelBackground: ViewStyle = {
  backgroundColor: colors.palette.primary200,
  width: spacing.extraLarge,
  alignItems: 'center',
  justifyContent: 'center',
  height: spacing.extraLarge,
  borderRadius: spacing.extraLarge,
}
const $imageStyle: ImageStyle = {
  width: calculateRelativeWidth(250),
  height: calculateRelativeHeight(150),
  alignSelf: 'center'
}

const $divider: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-evenly",
}

const $line: ViewStyle = {
  width: calculateRelativeWidth(100),
  borderBottomColor: colors.separator,
  borderBottomWidth: 1,
}

const $appleButtonStyle: ViewStyle = {
  width: "100%", // You must specify a width
  minHeight: 50, // You must specify a height
  // alignContent:'center'
}
