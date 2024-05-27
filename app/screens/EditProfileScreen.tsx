import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, TextInputProps, TextStyle, Keyboard } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, Spacer, Text, TextField } from "app/components"
import { Formik } from "formik"
import * as Yup from "yup"
import RNPickerSelect from "react-native-picker-select"
import { spacing } from "app/theme"
import { useMutation } from "@tanstack/react-query"
import { LoginResponse, RegisterDto } from "app/services/api/Auth/types"
import { AuthService } from "app/services/api/Auth/auth.api"
import { useAppDispatch, useAppSelector } from "app/store"
import { setUser } from "app/store/User/user.slice"
import { setError, setSuccess } from "app/store/Error/error.slice"


const CountryList = [
  { label: "Afghanistan", value: "AF" },
  { label: "Albania", value: "AL" },
  { label: "Algeria", value: "DZ" },
  { label: "Andorra", value: "AD" },
  { label: "Angola", value: "AO" },
  { label: "Antigua and Barbuda", value: "AG" },
  { label: "Argentina", value: "AR" },
  { label: "Armenia", value: "AM" },
  { label: "Australia", value: "AU" },
  { label: "Austria", value: "AT" },
  { label: "Azerbaijan", value: "AZ" },
  { label: "Bahamas", value: "BS" },
  { label: "Bahrain", value: "BH" },
  { label: "Bangladesh", value: "BD" },
  { label: "Barbados", value: "BB" },
  { label: "Belarus", value: "BY" },
  { label: "Belgium", value: "BE" },
  { label: "Belize", value: "BZ" },
  { label: "Benin", value: "BJ" },
  { label: "Bhutan", value: "BT" },
  { label: "Bolivia", value: "BO" },
  { label: "Bosnia and Herzegovina", value: "BA" },
  { label: "Botswana", value: "BW" },
  { label: "Brazil", value: "BR" },
  { label: "Brunei", value: "BN" },
  { label: "Bulgaria", value: "BG" },
  { label: "Burkina Faso", value: "BF" },
  { label: "Burundi", value: "BI" },
  { label: "Cabo Verde", value: "CV" },
  { label: "Cambodia", value: "KH" },
  { label: "Cameroon", value: "CM" },
  { label: "Canada", value: "CA" },
  { label: "Central African Republic", value: "CF" },
  { label: "Chad", value: "TD" },
  { label: "Chile", value: "CL" },
  { label: "China", value: "CN" },
  { label: "Colombia", value: "CO" },
  { label: "Comoros", value: "KM" },
  { label: "Congo (Congo-Brazzaville)", value: "CG" },
  { label: "Costa Rica", value: "CR" },
  { label: "Croatia", value: "HR" },
  { label: "Cuba", value: "CU" },
  { label: "Cyprus", value: "CY" },
  { label: "Czechia (Czech Republic)", value: "CZ" },
  { label: "Democratic Republic of the Congo", value: "CD" },
  { label: "Denmark", value: "DK" },
  { label: "Djibouti", value: "DJ" },
  { label: "Dominica", value: "DM" },
  { label: "Dominican Republic", value: "DO" },
  { label: "Ecuador", value: "EC" },
  { label: "Egypt", value: "EG" },
  { label: "El Salvador", value: "SV" },
  { label: "Equatorial Guinea", value: "GQ" },
  { label: "Eritrea", value: "ER" },
  { label: "Estonia", value: "EE" },
  { label: "Eswatini", value: "SZ" },
  { label: "Ethiopia", value: "ET" },
  { label: "Fiji", value: "FJ" },
  { label: "Finland", value: "FI" },
  { label: "France", value: "FR" },
  { label: "Gabon", value: "GA" },
  { label: "Gambia", value: "GM" },
  { label: "Georgia", value: "GE" },
  { label: "Germany", value: "DE" },
  { label: "Ghana", value: "GH" },
  { label: "Greece", value: "GR" },
  { label: "Grenada", value: "GD" },
  { label: "Guatemala", value: "GT" },
  { label: "Guinea", value: "GN" },
  { label: "Guinea-Bissau", value: "GW" },
  { label: "Guyana", value: "GY" },
  { label: "Haiti", value: "HT" },
  { label: "Honduras", value: "HN" },
  { label: "Hungary", value: "HU" },
  { label: "Iceland", value: "IS" },
  { label: "India", value: "IN" },
  { label: "Indonesia", value: "ID" },
  { label: "Iran", value: "IR" },
  { label: "Iraq", value: "IQ" },
  { label: "Ireland", value: "IE" },
  { label: "Israel", value: "IL" },
  { label: "Italy", value: "IT" },
  { label: "Jamaica", value: "JM" },
  { label: "Japan", value: "JP" },
  { label: "Jordan", value: "JO" },
  { label: "Kazakhstan", value: "KZ" },
  { label: "Kenya", value: "KE" },
  { label: "Kiribati", value: "KI" },
  { label: "Kuwait", value: "KW" },
  { label: "Kyrgyzstan", value: "KG" },
  { label: "Laos", value: "LA" },
  { label: "Latvia", value: "LV" },
  { label: "Lebanon", value: "LB" },
  { label: "Lesotho", value: "LS" },
  { label: "Liberia", value: "LR" },
  { label: "Libya", value: "LY" },
  { label: "Liechtenstein", value: "LI" },
  { label: "Lithuania", value: "LT" },
  { label: "Luxembourg", value: "LU" },
  { label: "Madagascar", value: "MG" },
  { label: "Malawi", value: "MW" },
  { label: "Malaysia", value: "MY" },
  { label: "Maldives", value: "MV" },
  { label: "Mali", value: "ML" },
  { label: "Malta", value: "MT" },
  { label: "Marshall Islands", value: "MH" },
  { label: "Mauritania", value: "MR" },
  { label: "Mauritius", value: "MU" },
  { label: "Mexico", value: "MX" },
  { label: "Micronesia", value: "FM" },
  { label: "Moldova", value: "MD" },
  { label: "Monaco", value: "MC" },
  { label: "Mongolia", value: "MN" },
  { label: "Montenegro", value: "ME" },
  { label: "Morocco", value: "MA" },
  { label: "Mozambique", value: "MZ" },
  { label: "Myanmar (Burma)", value: "MM" },
  { label: "Namibia", value: "NA" },
  { label: "Nauru", value: "NR" },
  { label: "Nepal", value: "NP" },
  { label: "Netherlands", value: "NL" },
  { label: "New Zealand", value: "NZ" },
  { label: "Nicaragua", value: "NI" },
  { label: "Niger", value: "NE" },
  { label: "Nigeria", value: "NG" },
  { label: "North Korea", value: "KP" },
  { label: "North Macedonia", value: "MK" },
  { label: "Norway", value: "NO" },
  { label: "Oman", value: "OM" },
  { label: "Pakistan", value: "PK" },
  { label: "Palau", value: "PW" },
  { label: "Palestine State", value: "PS" },
  { label: "Panama", value: "PA" },
  { label: "Papua New Guinea", value: "PG" },
  { label: "Paraguay", value: "PY" },
  { label: "Peru", value: "PE" },
  { label: "Philippines", value: "PH" },
  { label: "Poland", value: "PL" },
  { label: "Portugal", value: "PT" },
  { label: "Qatar", value: "QA" },
  { label: "Romania", value:"ROm"}]


  const DietType = [
    { label: "VEG", value: "VEG" },
    { label: "NON-VEG", value: "NON-VEG" },
    { label: "VEGAN", value: "VEGAN" },]



const validation = Yup.object().shape({
  Height: Yup.string(),
  Weight: Yup.string(),
  Country: Yup.string(),
  DietType:Yup.string(),
})

interface InitialValues {
  Height: string,
  Weight: string,
  Country: string,
  DietType:string,
  Password:string,
}

interface EditProfileScreenProps extends AppStackScreenProps<"EditProfile"> {}

export const EditProfileScreen: FC<EditProfileScreenProps> = observer(function EditProfileScreen() {
  const initialValues: InitialValues = {
    Height: "",
    Weight: "",
    Country: "",
    DietType: "",
    Password:"",

  }

  const {UserID}=useAppSelector(state=>state.user.user)
  const dispatch = useAppDispatch()
  const { mutate: update } = useMutation({
    mutationFn: (body: RegisterDto) => AuthService.updateProfile(body),
    onSuccess: (response: LoginResponse) => {
      // perform other side effects on success - save tokens
      console.log(response, 'user login response')
     
      dispatch(setSuccess({
        errorMessage: response?.message,
        isSnackBarVisible: true,
        type:'success'
      }))
      // dispatch(setUser({ user: response?.result[0][0] }))
    },
    onError: (error) => {
      // dispatch(userLogin({isAuthenticated:true,token:'sampletoken'}))

      dispatch(
        setError({ isSnackBarVisible: true, errorMessage: error.response.data?.error }),
      )
    },
  })
  const onSubmit = (values: InitialValues) => {
    function extractAndKeepStrings(obj) {
      const result = {};
      for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
              const value = obj[key];
              const intValue = parseInt(value, 10);
              if (!isNaN(intValue) && intValue.toString() === value) {
                  result[key] = intValue;
              } else {
                  result[key] = value;
              }
          }
      }
      return result;
  }
  const integers = extractAndKeepStrings(values);
   
    
    update({...integers,UserID:UserID})
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
        {({ handleChange, handleBlur, values, errors, submitForm, setFieldValue }) => (
          <View style={$formContainer}>
            <View>
      
      
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
                labelTx="common.password"
                value={values.Password}
                containerStyle={$textInputStyle}
                onChangeText={handleChange("Password")}
                status={errors.Password ? "error" : null}
                helper={errors.Password}
                onBlur={handleBlur("Password")}
              /> 
              <View style={$pickerContainer}>
                <Text preset="body2Inactive" text="Country" />
                <RNPickerSelect
                  onValueChange={(value) => setFieldValue("Country", value)}
                  items={CountryList}
                  style={pickerSelectStyles}
                  value={values.Country}
                />
                {errors.Country && <Text style={$errorText}>{errors.Country}</Text>}
              </View>

              <View style={$pickerContainer}>
                <Text preset="body2Inactive" text="Diet Type" />
                <RNPickerSelect
                  onValueChange={(value) => setFieldValue("DietType", value)}
                  items={DietType}
                  style={pickerSelectStyles}
                  value={values.DietType}
                />
                {errors.Country && <Text style={$errorText}>{errors.DietType}</Text>}
              </View>

       
              
              <Spacer size="medium" />
              <Button
                preset="filled"
                text={"Update"}
                onPress={submitForm}
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

const $formContainer: ViewStyle = {
  flex: 1,
  justifyContent: "space-evenly",
}

const $textInputStyle: ViewStyle = {
  marginBottom: spacing.large,
}

const $pickerContainer: ViewStyle = {
  marginBottom: spacing.large,
}

const $errorText: TextStyle = {
  color: 'red',
  marginTop: 4,
}

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
}
