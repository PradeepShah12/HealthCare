import React, { FC, useState } from "react"
import { Keyboard, View, ViewStyle } from "react-native"
import { AutoImage, Button, Icon, Screen, Spacer, Text, TextField } from "../../components"
import { AuthStackScreenProps } from "../../navigators/AuthStack"
  // @ts-ignore
import Logo from "../../../assets/logo-transparent.png";
import { ImageStyle } from "react-native-fast-image";
import { Formik } from "formik";
import * as Yup from "yup"
import { colors, spacing } from "../../theme";
import { passwordRegex } from "../../utils/constants";

// import { useNavigation } from "@react-navigation/native"


// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `CreatePassword: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="CreatePassword" component={CreatePasswordScreen} />`
// Hint: Look for the 🔥!

interface CreatePasswordScreenProps extends AuthStackScreenProps<"CreatePassword">{}
const validation = Yup.object().shape({

  confirmPassword: Yup.string()
    .matches(passwordRegex, {
      message: "Password must be at least 8 characters long with a special character",
    })
    .oneOf([Yup.ref("password"), null], "Passwords do not match")
    .required("Confirm Password is required"),
  password: Yup.string().required("Password is required").matches(passwordRegex, {
    message: "Password must be at least 8 characters long with a special character",
  }), 
})

interface JoinWithEmail {
  password: string
  confirmPassword:string

}

export const CreatePasswordScreen: FC<CreatePasswordScreenProps> = (props) => {
  const isLoading = false
  const [isSecureEntry, setIsSecureEntry] = useState(true)
  const _navigation = props.navigation

  const formInitialValues: JoinWithEmail = {
 
    password: "",
    confirmPassword:""

  }
  
  const onSubmit = () => {
   _navigation.navigate("CreateUserName")
  
  }
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    
    <Screen 
    style={$root} 
    contentContainerStyle={$rootContainer}
    ScrollViewProps={{ showsVerticalScrollIndicator: false }}

    preset="scroll" 
    safeAreaEdges={["top","bottom"]}>
<View>


<AutoImage source={Logo} style={$imageStyle}/>
<Spacer size="medium"/>
<Text preset="h3bold" text="Create Password"/>
<Spacer size="medium"/>

<Text preset="body1Inactive" text="Your password must consist of atleast six characters"/>
<Spacer size="massive"/>

<Formik
        initialValues={formInitialValues}
        onSubmit={() => {
          Keyboard.dismiss()
          onSubmit()
        }}
        validationSchema={validation}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View>
           
     
           <TextField
                  labelTx="common.password"
                  placeholderTx="placeholders.password"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  status={errors.password ? "error" : null}
                  onBlur={handleBlur("password")}
                  helper={errors.password}
                  secureTextEntry={isSecureEntry}
                  containerStyle={$textInputStyle}

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
                 <TextField
                  labelTx="auth.signup.confirmPassword"
                  placeholderTx="placeholders.password"
                  value={values.confirmPassword}
                  onChangeText={handleChange("confirmPassword")}
                  status={errors.confirmPassword ? "error" : null}
                  onBlur={handleBlur("password")}
                  helper={errors.confirmPassword}
                  secureTextEntry={isSecureEntry}
                  containerStyle={$textInputStyle}

                  RightAccessory={() =>
                    values.confirmPassword.length > 0 && (
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
          <Spacer size="massive"/>
     
            <Button
              preset="filled"
              tx={isLoading ? "common.loading" : "common.next"}
              onPress={() => handleSubmit()}
              disabled={isLoading}
            />
          </View>
        )}
      </Formik>
      </View>

<View>



      </View>



    </Screen>

  )
}


const $root: ViewStyle = {
  flex: 1,
}
const $imageStyle:ImageStyle={
  width:100,
  height:100
}


const $rootContainer: ViewStyle = {
  flex: 1,
  justifyContent:'space-between'
}
const $textInputStyle: ViewStyle = {
  marginBottom: spacing.large,
}