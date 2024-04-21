import React, { FC, useState } from "react"
import { View, ViewStyle } from "react-native"
import { AutoImage, Button, Screen, Spacer, Text } from "../../components"
import { spacing,  } from "../../theme"
import OTPInput from "../../components/OTPInput"
import Logo from "../../../assets/logo-transparent.png";

import { AuthStackScreenProps } from "../../navigators/AuthStack"
import { calculateRelativeHeight, calculateRelativeWidth } from "../../utils/calculateRelativeDimensions"
import { LogoTextHeader } from "../../components/LogoTextHeader"
import { ImageStyle } from "react-native-fast-image"

interface ForgotPasswordEmailSentScreenProps
  extends AuthStackScreenProps<"ForgotPasswordEmailSent"> {}

export const ForgotPasswordEmailSentScreen: FC<ForgotPasswordEmailSentScreenProps> = (props) => {
  const _navigation = props.navigation



  const [code, setCode] = useState("")
  const [isOTPReady, setIsOTPReady] = useState(false)

  // verify OTP mutation


  return (
    <Screen
      style={$root}
      preset="fixed"
      safeAreaEdges={["bottom"]}
      contentContainerStyle={$screenContentContainer}
    >
      <View>
        <Spacer size="small" />
        <LogoTextHeader />
        <Spacer size="medium" />
        <Text tx="auth.forgotPassword.thankYou" preset="h1" style={{ lineHeight: spacing.huge }} />
        <Spacer size="medium" />
        <Text tx="auth.forgotPassword.receiveEmail" preset="inactive" />
        <Spacer size="medium" />
        <AutoImage source={Logo} style={$imageStyle} />

        <OTPInput
          code={code}
          setCode={setCode}
          setIsOTPReady={setIsOTPReady}
          maximumLength={6}
          editable
        />
        <Spacer size="small" />

      </View>
      <Button
        tx="auth.forgotPassword.verifyOtp"
        preset="filled"
        style={{ marginBottom: -calculateRelativeHeight(40) }}
        onPress={()=>null}
        disabled={!isOTPReady}
      />
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
}

const $screenContentContainer: ViewStyle = {
  flex: 1,
  paddingVertical: spacing.huge,
  // backgroundColor: colors.palette.neutral100,
  justifyContent: "space-between",
}

const $imageStyle:ImageStyle={
  width:calculateRelativeWidth(250),
  height:calculateRelativeHeight(150),
  alignSelf:'center'
}