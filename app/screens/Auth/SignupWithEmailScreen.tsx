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
import OTPInput from "../../components/OTPInput";
import { Divider } from "react-native-paper";
import { calculateRelativeHeight, calculateRelativeWidth } from "../../utils/calculateRelativeDimensions";
import { AxiosError } from "axios";
import { AuthService } from "../../services/api/Auth/auth.api";
import { useMutation } from "@tanstack/react-query";
import { setError, setSuccess } from "../../store/Error/error.slice";
import { ImageStyle } from "react-native-fast-image";
import { ApiErrorResponse } from "apisauce";

interface JoinWithEmail {
  fullName: string,
  email: string,
  username: string,
  phoneNumber: string
}

interface SignUpWithEmailScreenProps extends AuthStackScreenProps<"SignUpWithEmail"> { }

const validation = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string().required("Email is required").email("Enter valid email"),
  username: Yup.string().required("Username is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
})

export const SignupWithEmailScreen: FC<SignUpWithEmailScreenProps> = (props) => {
  const modalizeRef = useRef<Modalize>(null);
  const [otp, setOtp] = useState<string>('1')
  const _navigation = props.navigation
  const formInitialValues: JoinWithEmail = {
    fullName: "",
    email: "",
    username: "",
    phoneNumber: ""
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
    <Screen style={$root} contentContainerStyle={$rootContainer} preset="scroll" safeAreaEdges={["top", "bottom"]}>
      <View style={$globalViewStyles.center}>
        <Spacer size="medium" />
        <LogoTextHeader />
        <Text tx="auth.signup.joinWithEmail" preset="h3bold" />
        <Spacer size="tiny" />
        <Text tx="auth.signup.enterInformation" preset="inactive" />
      </View>
      <Spacer size="huge" />

      {/* <AutoImage source={Logo} style={$imageStyle} /> */}
      <View>
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
            <View>
              {/* <TextField
                labelTx="common.fullName"
                value={values.fullName}
                containerStyle={$textInputStyle}
                onChangeText={handleChange("fullName")}
                status={errors.fullName ? "error" : null}
                helper={errors.fullName}
                onBlur={handleBlur("fullName")}
              /> */}
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
              {/* <TextField
                labelTx="common.username"
                value={values.username}
                containerStyle={$textInputStyle}
                onChangeText={handleChange("username")}
                status={errors.username ? "error" : null}
                helper={errors.username}
                onBlur={handleBlur("username")}
              />
              <TextField
                labelTx="common.phoneNumber"
                value={values.phoneNumber}
                containerStyle={$textInputStyle}
                onChangeText={handleChange("phoneNumber")}
                status={errors.phoneNumber ? "error" : null}
                helper={errors.phoneNumber}
                onBlur={handleBlur("phoneNumber")}
                keyboardType="phone-pad"
              /> */}
              <Button
                preset="filled"
                tx={initationPending ? "common.loading" : "auth.signup.createAccount"}
                onPress={() => handleSubmit()}
                disabled={initationPending}
              />
            </View>
          )}
        </Formik>

        <Spacer size="medium" />
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
          />
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
      <Modalize ref={modalizeRef} withReactModal reactModalProps={{ presentationStyle: "formSheet", animationType: 'slide', }} modalStyle={$modalContainerStyle}>
        <Spacer size="tiny" />
        <Pressable onPress={() => modalizeRef.current.close()} style={$cancelBackground}>
          <Icon name="close" size={spacing.large} />
        </Pressable >
        <Spacer size="medium" />
        <Text preset="h3bold" text="Registration Successful!" />
        <Text preset="body1Inactive" text="Please check your email and follow the instructions!" />
        <Spacer size="small" />
        <Divider />
        <Spacer size="small" />
        <Text preset="body1Inactive" text="Or you can verify by entering the 4-digit code below" />
        <Spacer size="large" />
        <OTPInput
          code={otp}
          editable={true}
          setCode={setOtp}
          maximumLength={4}
          setIsOTPReady={(isReady) => {
            if (isReady) {
              setOtp('');
              _navigation.navigate("CreatePassword");
              modalizeRef.current.close();
            }
          }}
        />
      </Modalize>
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
