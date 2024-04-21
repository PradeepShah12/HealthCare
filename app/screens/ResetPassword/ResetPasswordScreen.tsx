import React, { FC, useState } from "react"
import { View, ViewStyle } from "react-native"
import { Button, Icon, Screen, Spacer, Text, TextField } from "../../components"
import { spacing, colors, Device } from "../../theme"
import { FormikHelpers, useFormik } from "formik"
import * as Yup from "yup"
import { passwordRegex } from "../../utils/constants"
import { AuthStackScreenProps } from "../../navigators/AuthStack"
import { LogoTextHeader } from "../../components/LogoTextHeader"
import { calculateRelativeHeight } from "../../utils/calculateRelativeDimensions"

interface ResetPasswordForm {
  newPassword: string
  confirmNewPassword: string
}

const validation = Yup.object().shape({
  newPassword: Yup.string()
    .matches(passwordRegex, {
      message: "Password must be at least 8 characters long with a special character",
    })
    .oneOf([Yup.ref("confirmNewPassword"), null], "Passwords do not match")
    .required("Password is required")
    .min(8, "Password must be more than 8 characters"),
  confirmNewPassword: Yup.string()
    .matches(passwordRegex, {
      message: "Password must be at least 8 characters long with a special character",
    })
    .oneOf([Yup.ref("newPassword"), null], "Passwords do not match")
    .required("Confirm Password is required"),
})

interface ResetPasswordScreenProps extends AuthStackScreenProps<"ResetPassword"> {}

export const ResetPasswordScreen: FC<ResetPasswordScreenProps> = (props) => {
  const _navigation = props.navigation
  const { reset_token: _resetToken,  } = props.route.params

  const [isSecureEntry, setIsSecureEntry] = useState(true)

 const isLoading = false
  const handleReset = (_values: ResetPasswordForm, actions: FormikHelpers<ResetPasswordForm>) => {
    actions.validateForm()
     
  }

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmNewPassword: "",
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
            labelTx="auth.resetPassword.newPassword"
            status={formik.errors.newPassword ? "error" : null}
            helper={formik.errors.newPassword}
            onChangeText={formik.handleChange("newPassword")}
            secureTextEntry={isSecureEntry}
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
            status={formik.errors.confirmNewPassword ? "error" : null}
            helper={formik.errors.confirmNewPassword}
            onChangeText={formik.handleChange("confirmNewPassword")}
            secureTextEntry
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
          <Button tx="common.cancel" onPress={() => _navigation.navigate("Login")} />
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
