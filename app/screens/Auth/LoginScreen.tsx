import React, { FC, useState } from "react"
import {
  Keyboard,
  Pressable,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"

import { Button, Icon, Screen, Spacer, Text, TextField } from "../../components"

import { Device, colors, spacing } from "../../theme"
import { Formik } from "formik"
import * as Yup from "yup"
import { AxiosError } from "axios"

import { navigate } from "../../navigators"

import { LogoTextHeader } from "../../components/LogoTextHeader"
import { calculateRelativeHeight, calculateRelativeWidth } from "../../utils/calculateRelativeDimensions"
import { AuthStackScreenProps } from "../../navigators/AuthStack"
import { useAppDispatch } from "../../store"
import { userLogin } from "../../store/Auth/auth.slice"
import { useMutation, useQuery } from "@tanstack/react-query"
import { LoginDto } from "../../services/api/Auth/types"
import { AuthService } from "../../services/api/Auth/auth.api"
import { setError } from "../../store/Error/error.slice"
import { setUser } from "../../store/User/user.slice"
import { ApiError } from "../.."
import { QueryKey } from "../../utils/react-query/queryKeys"

const validation = Yup.object().shape({
  email: Yup.string().required("Email or Username is required"),
  password: Yup.string().required("Password is required"),
})

interface InitialValues {
  email: string
  password: string
}


interface SignUpWithEmailScreenProps extends AuthStackScreenProps<"SignUp"> { }

export const LoginScreen: FC<SignUpWithEmailScreenProps> = (props) => {
  // GoogleSignin.configure()
const dispatch = useAppDispatch()
  const initialValues: InitialValues = {
    email: "",
    password: "",
  }

  const [inProgress, _setInProgress] = useState(false)
  const [isSecureEntry, setIsSecureEntry] = useState(true)
  const [accessToken, setAccessToken] = useState('')
  const _navigation = props.navigation
  // login mutations






  //169277247355-s60jp8rqid0tafp89dgqb79re9233838.apps.googleusercontent.com




  const onSubmit = (values: InitialValues) => {
    console.log({ username: values.email.toLowerCase(), password: values.password })
    if(values.email.toLowerCase()==='admin@gmail.com'&& values.password ==='admin'){
      dispatch(userLogin({isAuthenticated:true,token:'sampletoken'}))
    }
  }

  // facebook login mutations
  // const { mutate: loginWithFacebook } = useMutation({
  //   mutationFn: (body: FacebookLoginDto) => AuthService.loginWithFacebook(body),
  //   onSuccess: (response) => {
  //     // perform other side effects on success - save tokens
  //     dispatch(
  //       userLogin({
  //         isAuthenticated: true,
  //         token: response.data.token,
  //         refreshToken: response.data.refresh_token,
  //       }),
  //     )
  //     dispatch(setUser({ user: response.data?.user }))
  //   },
  //   onError: (error: AxiosError<ApiErrorResponse>) => {
  //     dispatch(
  //       setError({ isSnackBarVisible: true, errorMessage: error.response.data?.error?.message }),
  //     )
  //   },
  // })




  // const onFacebookLogin = async () => {
  //   try {
  //     const _ = await FacebookService.login()

  //     set_(_)

  //     checkSocialUser({ provider: "facebook", provider_id: _.userID })
  //   } catch (e) {
  //     dispatch(setError({ isSnackBarVisible: true, errorMessage: "Something went wrong" }))
  //   }
  // }





  return (
    <>
      <Screen
        preset="auto"
        safeAreaEdges={["top", "bottom"]}
        ScrollViewProps={{ showsVerticalScrollIndicator: false }}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={(values: InitialValues) => {
            Keyboard.dismiss()
            onSubmit(values)
          }}
          validationSchema={validation}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ handleChange, handleBlur, values, errors, submitForm }) => (
            <View style={$formContainer}>
              <View
                style={{ marginBottom: Device.height < 700 ? spacing.extraLarge : spacing.tiny }}
              >
                <Spacer size="small" />
                <LogoTextHeader />
                <Text tx="auth.signIn.getStarted" preset="h1" style={$signIn} />
                <Spacer size="tiny" />
                <Spacer size="medium" />
              </View>
              <View>
                <TextField
                  label="Email or Username"
                  placeholder="Email or Username"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  status={errors.email ? "error" : null}
                  helper={errors.email}
                  onBlur={handleBlur("email")}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <Spacer size="medium" />
                <TextField
                  labelTx="common.password"
                  placeholderTx="placeholders.password"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  status={errors.password ? "error" : null}
                  onBlur={handleBlur("password")}
                  helper={errors.password}
                  secureTextEntry={isSecureEntry}
                  RightAccessory={() =>
                    values.password.length > 0 && (
                      <Icon
                        icon={isSecureEntry ? "eyeOpen" : "eyeClosed"}
                        size={22}
                        style={{ marginRight: spacing.small }}
                        onPress={() => setIsSecureEntry(!isSecureEntry)}
                        color={colors.palette.neutral300}
                      />
                    )
                  }
                />
                <Spacer size="medium" />
                <Button
                  preset="filled"
                  tx={"common.login"}
                  onPress={submitForm}
                  // disabled={_isLoginLoading}
                />
                <Spacer size="medium" />
                <View style={$divider}>
                  <View style={$line} />
                  <Text tx="common.or" preset="inactive" />
                  <View style={$line} />
                </View>
                <Spacer size="small" />
                {/* <FacebookButton onPress={onFacebookLogin} type="login" /> */}
                {/* <Spacer size="extraLarge" /> */}


        

                <Spacer size="extraLarge" />

                <Pressable
                  style={$forgotPasswod}
                  onPress={() => navigate("ForgotPassword")}
                >
                  <Text
                    tx="auth.signIn.forgotPassword"
                    preset="body2"
                    style={{ color: colors.palette.secondary700 }}
                  />
                </Pressable>
              </View>
              <View
                style={{
                  marginTop:
                    Device.height > 700
                      ? calculateRelativeHeight(140)
                      : calculateRelativeHeight(40),
                }}
              >
                <View style={$haveAccountContainer}>
                  <Text preset="body2" tx="auth.signIn.noAccount" />
                  <Pressable style={$loginText} onPress={() => _navigation.push("SignUpWithEmail")}>
                    <Text
                      tx="auth.signIn.signUpNow"
                      preset="body1bold"
                      style={{ color: colors.palette.secondary700 }}
                    />
                  </Pressable>
                </View>
              </View>
            </View>
          )}
        </Formik>
      </Screen>

    </>
  )
}



const $divider: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-evenly",
}

const $line: ViewStyle = {
  width: calculateRelativeWidth(145),
  borderBottomColor: colors.separator,
  borderBottomWidth: 1,
}

const $haveAccountContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: calculateRelativeHeight(45),
}

const $loginText: ViewStyle = {
  marginLeft: spacing.large,
}

const $forgotPasswod: ViewStyle = {
  alignSelf: "center",
}

const $signIn: TextStyle = {
  lineHeight: 48,
  marginTop: calculateRelativeHeight(16),
}

const $formContainer: ViewStyle = {
  flex: 1,
  justifyContent: "space-evenly",
}

const $appleButtonStyle: ViewStyle = {
  width: "100%", // You must specify a width
  minHeight: 45,
  // borderRadius:25, // You must specify a height
}
