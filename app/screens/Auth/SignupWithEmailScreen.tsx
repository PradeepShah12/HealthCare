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
import { Selector } from "app/components/Selector";

interface JoinWithEmail {
  FirstName: string,
  LastName:string,
  Email: string,
  Username: string,
  Password: string
  Height:string,
  Weight:string,
  Country:string,
  DateOfBirth:string
  DietType:string


}

interface SignUpWithEmailScreenProps extends AuthStackScreenProps<"SignUpWithEmail"> { }

const validation = Yup.object().shape({
  FirstName: Yup.string().required("First Name is required"),
  LastName:Yup.string().required("Last Name is required"),
  Country:Yup.string().required("Country is required"),
  DateOfBirth:Yup.string().required("Country is required"),
  Height:Yup.string().required("Height is required"),
  Weight:Yup.string().required("Weight is required"),
  Email: Yup.string().required("Email is required").email("Enter valid email"),
  Username: Yup.string().required("Username is required"),
  Password: Yup.string().required("Phone number is required"),
})

export const SignupWithEmailScreen: FC<SignUpWithEmailScreenProps> = (props) => {
  const modalizeRef = useRef<Modalize>(null);
  const [otp, setOtp] = useState<string>('1')
  const [diet,setDiet]= useState('')
  const _navigation = props.navigation
  const formInitialValues: JoinWithEmail = {
    FirstName: "",
    LastName:"",
    Email: "",
    Username: "",
    Password: "",
    Height:"",
    Weight:"",
    Country:"",
    DateOfBirth:""

  }

  const dispatch = useAppDispatch()

  const { mutate: register, isPending: initationPending } = useMutation({
    mutationFn: (body: JoinWithEmail) => AuthService.register(body),
    onSuccess: async (response) => {
      if (response?.message) {
        dispatch(setSuccess({
          errorMessage: response?.message,
          isSnackBarVisible: true,
          type:'success'
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
    register({...values,DietType:diet})
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
                value={values.FirstName}
                containerStyle={$textInputStyle}
                onChangeText={handleChange("FirstName")}
                status={errors.FirstName ? "error" : null}
                helper={errors.FirstName}
                onBlur={handleBlur("FirstName")}
              />
                   <TextField
                labelTx="common.lastName"
                value={values.LastName}
                containerStyle={$textInputStyle}
                onChangeText={handleChange("LastName")}
                status={errors.LastName ? "error" : null}
                helper={errors.LastName}
                onBlur={handleBlur("LastName")}
              />
              <TextField
                labelTx="common.email"
                value={values.Email}
                containerStyle={$textInputStyle}
                onChangeText={handleChange("Email")}
                status={errors.Email ? "error" : null}
                helper={errors.Email}
                onBlur={handleBlur("Email")}
                keyboardType="email-address"
              />
           <TextField
                labelTx="common.username"
                value={values.Username}
                containerStyle={$textInputStyle}
                onChangeText={handleChange("Username")}
                status={errors.Username ? "error" : null}
                helper={errors.Username}
                onBlur={handleBlur("Username")}
              /> 
              <TextField
                labelTx="common.password"
                value={values.Password}
                containerStyle={$textInputStyle}
                onChangeText={handleChange("Password")}
                status={errors.Password ? "error" : null}
                helper={errors.Password}
                onBlur={handleBlur("Password")}
                // keyboardType="phone-pad"
              /> 
               <TextField
                labelTx="common.height"
                value={values.Height}
                containerStyle={$textInputStyle}
                onChangeText={handleChange("Height")}
                status={errors.Height ? "error" : null}
                helper={errors.Height}
                onBlur={handleBlur("Height")}
              /> 
                <TextField
                labelTx="common.weight"
                value={values.Weight}
                containerStyle={$textInputStyle}
                onChangeText={handleChange("Weight")}
                status={errors.Weight ? "error" : null}
                helper={errors.Weight}
                onBlur={handleBlur("Weight")}
              /> 
                  <TextField
                labelTx="common.country"
                value={values.Country}
                containerStyle={$textInputStyle}
                onChangeText={handleChange("Country")}
                status={errors.Country ? "error" : null}
                helper={errors.Country}
                onBlur={handleBlur("Country")}
              /> 
                       <TextField
                labelTx="common.dateOfBirth"
                value={values.DateOfBirth}
                placeholder="YYYY/MM/DD"
                containerStyle={$textInputStyle}
                onChangeText={handleChange("DateOfBirth")}
                status={errors.DateOfBirth ? "error" : null}
                helper={errors.DateOfBirth}
                onBlur={handleBlur("DateOfBirth")}
              /> 
               <Selector 
               onSelect={setDiet}
               value={diet} 
               active={true}
               containerStyle={$textInputStyle}
               items={[{label:"Veg",value:"Veg"},{label:"Non Veg",value:"Non Veg"},{label:"Vegan",value:"Vegan"}]}/>
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
