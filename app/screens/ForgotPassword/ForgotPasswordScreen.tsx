import React, { FC } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import {  Button,  Screen, Spacer, Text, TextField } from "../../components"
import { FormikHelpers, useFormik } from "formik"
import * as Yup from "yup"
import { AxiosError } from "axios";

import { AuthStackScreenProps } from "../../navigators/AuthStack"
import { calculateRelativeHeight, calculateRelativeWidth } from "../../utils/calculateRelativeDimensions"
import { LogoTextHeader } from "../../components/LogoTextHeader"
import { useMutation } from "@tanstack/react-query"
import { AuthService } from "app/services/api/Auth/auth.api"
import { useAppDispatch } from "app/store"
import { setError } from "app/store/Error/error.slice"
import { ApiErrorResponse } from "apisauce"

// import { useNavigation } from "@react-navigation/native"

interface ForgotPasswordScreenProps extends AuthStackScreenProps<"ForgotPassword"> {}

const validation = Yup.object().shape({
  Email: Yup.string().required("Email is required").email("Enter valid Email"),
})

interface ResetPasswordForm {
  Email: string
}

export const ForgotPasswordScreen: FC<ForgotPasswordScreenProps> = (props) => {
  const _navigation = props.navigation










  const dispatch = useAppDispatch()

  const { mutate: forgotPassword, isPending:isLoading } = useMutation({
    mutationFn: (_body:ResetPasswordForm ) =>AuthService.forgotPassword(_body),
    onSuccess: (_data) => {
      
            _navigation.navigate("ResetPassword", { reset_token: 'sdf', uid: 'sdfs' })      // forgotPassword({ Email: values.Email.toLowerCase() })

      // _navigation.push("ForgotPasswordEmailSent", { id: null})
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      _navigation.navigate("ResetPassword", { reset_token: 'sdf', uid: 'sdfs' })      // forgotPassword({ Email: values.Email.toLowerCase() })

      dispatch(
        setError({
          isSnackBarVisible: true,
          errorMessage: error.message || "Invalid Email or password.",
        }),
      )
    },
  })

  const handleReset = (values: ResetPasswordForm, actions: FormikHelpers<ResetPasswordForm>) => {
    actions.validateForm()
    console.log('no error email')

  
      console.log('no error email')

forgotPassword({Email:values.Email})
  
  }
  const formik = useFormik({
    initialValues: {
      Email: "",
    },
    validationSchema: validation,
    onSubmit: handleReset,
    validateOnChange: false,
  })


  return (
    <Screen
      preset="auto"
      safeAreaEdges={["top", "bottom"]}
      contentContainerStyle={$screenContentContainer}
    >
      <View style={$formContainer}>
        <View>
          <LogoTextHeader />
          <Spacer size="medium" />
          <Text tx="auth.forgotPassword.forgotpassword" preset="h1" style={$forgotPasswod} />
          <Spacer size="tiny" />
          <Text tx="auth.forgotPassword.enterEmail" preset="inactive" />
          <Spacer size="large" />
          <TextField
            labelTx="common.email"
            status={formik.errors.Email ? "error" : null}
            helper={formik.errors.Email}
            onChangeText={formik.handleChange("Email")}
          />
        </View>
        {/* <AutoImage source={Logo} style={$imageStyle} /> */}
<Spacer size="medium"/>
        <View
          // style={{
          //   marginTop:
          //     Device.height > 700 ? calculateRelativeHeight(165) : calculateRelativeHeight(40),
          // }}
        >
          <Button
            tx={isLoading ? "common.loading" : "auth.forgotPassword.resetPassword"}
            preset="filled"
            onPress={() => formik.handleSubmit()}
            disabled={isLoading}
          />
          <Spacer size="small" />
          {/* <Button tx="common.cancel" onPress={() => _navigation.navigate("Login")} />
          <Spacer size="medium" /> */}
        </View>
      </View>
    </Screen>
  )
}

const $screenContentContainer: ViewStyle = {
  flex: 1,
  // backgroundColor: colors.palette.neutral100,
}

const $forgotPasswod: TextStyle = {
  lineHeight: 48,
}

const $formContainer: ViewStyle = {
  flex: 1,
  // justifyContent: "space-between",
}

const $imageStyle:ImageStyle={
  width:calculateRelativeWidth(250),
  height:calculateRelativeHeight(150),
  alignSelf:'center'
}