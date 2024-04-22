import React, { FC } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { AutoImage, Button,  Screen, Spacer, Text, TextField } from "../../components"
import { Device } from "../../theme"
import { FormikHelpers, useFormik } from "formik"
import * as Yup from "yup"
import Logo from "../../../assets/logo-transparent.png";

import { AuthStackScreenProps } from "../../navigators/AuthStack"
import { calculateRelativeHeight, calculateRelativeWidth } from "../../utils/calculateRelativeDimensions"
import { LogoTextHeader } from "../../components/LogoTextHeader"

// import { useNavigation } from "@react-navigation/native"

interface ForgotPasswordScreenProps extends AuthStackScreenProps<"ForgotPassword"> {}

const validation = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Enter valid email"),
})

interface ResetPasswordForm {
  email: string
}

export const ForgotPasswordScreen: FC<ForgotPasswordScreenProps> = (props) => {
  const _navigation = props.navigation

  const handleReset = (values: ResetPasswordForm, actions: FormikHelpers<ResetPasswordForm>) => {
    actions.validateForm()
    if (!formik.errors.email) {
      _navigation.navigate("ResetPassword", { reset_token: 'sdf', uid: 'sdfs' })      // forgotPassword({ email: values.email.toLowerCase() })
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validation,
    onSubmit: handleReset,
    validateOnChange: false,
  })
const isLoading=false
  // const { mutate: forgotPassword, isPending:isLoading } = useMutation({
  //   mutationFn: (_body:any ) =>null,
  //   onSuccess: (_data) => {
  //     _navigation.push("ForgotPasswordEmailSent", { id: null})
  //   },
  //   onError: (error) => {
  //     const err = error as AxiosError<ApiErrorResponse>
  //     formik.setFieldError("email", err.response.data?.error?.message)
  //   },
  // })

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
            status={formik.errors.email ? "error" : null}
            helper={formik.errors.email}
            onChangeText={formik.handleChange("email")}
          />
        </View>
        <AutoImage source={Logo} style={$imageStyle} />

        <View
          style={{
            marginTop:
              Device.height > 700 ? calculateRelativeHeight(165) : calculateRelativeHeight(40),
          }}
        >
          <Button
            tx={isLoading ? "common.loading" : "auth.forgotPassword.resetPassword"}
            preset="filled"
            onPress={() => formik.handleSubmit()}
            disabled={isLoading}
          />
          <Spacer size="small" />
          <Button tx="common.cancel" onPress={() => _navigation.navigate("Login")} />
          <Spacer size="medium" />
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
  justifyContent: "space-between",
}

const $imageStyle:ImageStyle={
  width:calculateRelativeWidth(250),
  height:calculateRelativeHeight(150),
  alignSelf:'center'
}