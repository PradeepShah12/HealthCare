import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, TextInputProps, TextStyle, Keyboard } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { AutoImage, Button, Screen, Spacer, Text, TextField } from "app/components"
import { ImageStyle } from "react-native-fast-image"
import { Formik } from "formik"
import { calculateRelativeHeight } from "app/utils/calculateRelativeDimensions"
import { spacing } from "app/theme"

// import { useStores } from "app/models"
import * as Yup from "yup"



const validation = Yup.object().shape({
  email: Yup.string().required("Email or Username is required"),
  password: Yup.string().required("Password is required"),
})
interface InitialValues {


  username: string,

  height:string,
  weight:string,
  country:string,
  dateOfBirth:string


}



interface EditProfileScreenProps extends AppStackScreenProps<"EditProfile"> {}

export const EditProfileScreen: FC<EditProfileScreenProps> = observer(function EditProfileScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const initialValues: InitialValues = {

    username: "",

    height:"",
    weight:"",
    country:"",
    dateOfBirth:""

  }

  const onSubmit = (values: InitialValues) => {
    console.log(values)
// const body:LoginDto = {
//   Email: values.email.toLowerCase(),
//   Password:  values.password
// }
//     // login(body)


   
  }


  return (
    <Screen style={$root} preset="auto">
      <View style={$header}>
        <Text preset="h2" text="Update Your Profile Information"/>
      </View>
      <Spacer size="medium"/>

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
           
              <View>
      
       
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
                <Spacer size="medium" />
                <Button
                  preset="filled"
                text={"Update"}
                  onPress={submitForm}
                  // disabled={_isLoginLoading}
                />
             

          
              </View>
      
            </View>
          )}
        </Formik>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  padding: 20,
}

const $header: ViewStyle = {
  alignItems: 'center',
  marginBottom: 20,
}

const $avatar: ImageStyle = {
  width: 100,
  height: 100,
  borderRadius: 25,
}

const $info: ViewStyle = {
  marginBottom: 20,
}

const $input: ViewStyle & TextInputProps = {
  borderColor: '#ccc',
  borderWidth: 1,
  borderRadius: 8,
  padding: 10,
  fontSize: 16,
  marginBottom: 10,
}


const $signIn: TextStyle = {
  lineHeight: 48,
  marginTop: calculateRelativeHeight(16),
}

const $formContainer: ViewStyle = {
  flex: 1,
  justifyContent: "space-evenly",
}

const $textInputStyle: ViewStyle = {
  marginBottom: spacing.large,
}