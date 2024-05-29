import React, { FC, useState } from "react"
import { View, ViewStyle } from "react-native"
import { Button, Icon, Screen, Spacer, Text, TextField } from "../../components"
import { spacing, colors, Device } from "../../theme"
import { FormikHelpers, useFormik } from "formik"
import * as Yup from "yup"
import { AxiosError } from "axios";

import { passwordRegex } from "../../utils/constants"
import { AuthStackScreenProps } from "../../navigators/AuthStack"
import { LogoTextHeader } from "../../components/LogoTextHeader"
import { calculateRelativeHeight } from "../../utils/calculateRelativeDimensions"
import { useMutation } from "@tanstack/react-query"
import { AuthService } from "app/services/api/Auth/auth.api"
import { ApiErrorResponse } from "apisauce"
import { useAppDispatch } from "app/store"
import { setError } from "app/store/Error/error.slice"

interface ResetPasswordForm {
  Otp:string
  ConfirmPassword: string
  NewPassword: string
}



interface ResetPasswordScreenProps extends AuthStackScreenProps<"ResetPassword"> {}

export const ResetPasswordScreen: FC<ResetPasswordScreenProps> = (props) => {
  const _navigation = props.navigation
  const { uid: _resetToken,email  } = props.route.params

  const [isSecureEntry, setIsSecureEntry] = useState(true)


const dispatch = useAppDispatch()


 const { mutate: resetPassword, isPending:isLoading } = useMutation({
  mutationFn: (_body:ResetPasswordForm ) =>AuthService.resetPassword(_body),
  onSuccess: (_data) => {
    
          _navigation.navigate("Login", { reset_token: 'sdf', uid: 'sdfs' })      // resetPassword({ Email: values.Email.toLowerCase() })

    // _navigation.push("ForgotPasswordEmailSent", { id: null})
  },
  onError: (error: AxiosError<ApiErrorResponse>) => {
    _navigation.navigate("Login", { reset_token: 'sdf', uid: 'sdfs' })      // resetPassword({ Email: values.Email.toLowerCase() })

    dispatch(
      setError({
        isSnackBarVisible: true,
        errorMessage: error.message || "Invalid Email or password.",
      }),
    )
  },
})

console.log(_resetToken,'reset token')

const validation = Yup.object().shape({
  NewPassword: Yup.string().required("New Password is required").matches(passwordRegex, {
    message: "Password must be at least 8 characters long with a special character",
  }),
Otp:Yup.string().matches(_resetToken,'Enter Valid Otp'),
  ConfirmPassword: Yup.string()
    .matches(passwordRegex, {
      message: "Password must be at least 8 characters long with a special character",
    })
    .oneOf([Yup.ref("NewPassword")], "Passwords do not match")
    .required("Confirm Password is required"),
})

  const handleReset = (_values: ResetPasswordForm, actions: FormikHelpers<ResetPasswordForm>) => {
    actions.validateForm()
    resetPassword({
   
      NewPassword: _values.NewPassword,
Email:email,
    })
     
  }

  const formik = useFormik({
    initialValues: {
      Otp:"",

      NewPassword: "",
      ConfirmPassword: "",
    },
    validationSchema: validation,
    onSubmit: handleReset,
    validateOnChange: false,
  })

  return (
    <Screen
      preset="scroll"
      safeAreaEdges={["top", "bottom"]}
      contentContainerStyle={$screenContentContainer}
    >
      <View style={$formContainer}>
        <View>
          <LogoTextHeader />
          <Text
            tx="auth.resetPassword.resetYourPassword"
            preset="h1"
            style={{ lineHeight: spacing.huge }}
          />
          <Spacer size="medium" />
          <Text tx="auth.resetPassword.create" preset="inactive" />
          <Spacer size="medium" />

          <TextField
            labelTx="common.Otp"
            status={formik.errors.Otp ? "error" : null}
            helper={formik.errors.Otp}
            onChangeText={formik.handleChange("Otp")}
            // secureTextEntry={isSecureEntry}
        
          />
          <Spacer size="medium" />
          <TextField
            labelTx="auth.resetPassword.newPassword"
            status={formik.errors.NewPassword ? "error" : undefined}
            helper={formik.errors.NewPassword}
            onChangeText={formik.handleChange("NewPassword")}
            // secureTextEntry={isSecureEntry}
            RightAccessory={() => (
              <Icon
                icon={isSecureEntry ? "eyeOpen" : "eyeClosed"}
                size={22}
                style={{ marginRight: spacing.small }}
                onPress={() => setIsSecureEntry(!isSecureEntry)}
                color={colors.palette.neutral300}
              />
            )}
          />
          <Spacer size="large" />
          <TextField
            labelTx="auth.resetPassword.confirmNewPassword"
            status={formik.errors.ConfirmPassword ? "error" : undefined}
            helper={formik.errors.ConfirmPassword}
            onChangeText={formik.handleChange("ConfirmPassword")}
            // secureTextEntry
          />
        </View>
        <View
          style={{
            marginTop:
              Device.height > 700 ? calculateRelativeHeight(165) : calculateRelativeHeight(50),
          }}
        >
          <Button
            tx={isLoading ? "common.loading" : "auth.resetPassword.confirm"}
            preset="filled"
            onPress={() => formik.handleSubmit()}
          />
          <Spacer size="medium" />
          <Button textStyle={{color:colors.text}} tx="common.cancel" onPress={() => _navigation.navigate("Login")} />
        </View>
      </View>
    </Screen>
  )
}

const $screenContentContainer: ViewStyle = {
  flex: 1,
  paddingVertical: spacing.large,
  // backgroundColor: colors.palette.neutral100,
}

const $formContainer: ViewStyle = {
  flex: 1,
  justifyContent: "space-between",
}
