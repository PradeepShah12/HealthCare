import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import {  TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, Text } from "app/components"
import { $globalTextStyles } from "app/theme/styles"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface BodyMeasurementScreenProps extends AppStackScreenProps<"BodyMeasurement"> {}

export const BodyMeasurementScreen: FC<BodyMeasurementScreenProps> = observer(function BodyMeasurementScreen() {
  const [age, setAge] = useState(''); 
  const [height, setHeight] = useState(''); 
  const [weight, setWeight] = useState(''); 
  const [gender, setGender] = useState(''); 
  const [bmiResult, setBmiResult] = useState(null); 

  const validateForm = () => { 
      if (!age || !height || !weight || !gender) { 
          alert('All fields are required!'); 
      } else { 
          countBmi(); 
      } 
  }; 

  const countBmi = () => { 
      const bmi = (parseFloat(weight) /  
          ((parseFloat(height) / 100) ** 2)).toFixed(2); 

      let result = ''; 
      if (bmi < 18.5) { 
          result = 'Underweight'; 
      } else if (bmi >= 18.5 && bmi <= 24.9) { 
          result = 'Healthy'; 
      } else if (bmi >= 25 && bmi <= 29.9) { 
          result = 'Overweight'; 
      } else if (bmi >= 30 && bmi <= 34.9) { 
          result = 'Obese'; 
      } else if (bmi >= 35) { 
          result = 'Extremely obese'; 
      } 

      // Set the BMI result 
      setBmiResult({ bmi, result }); 

      // Reset the form 
      setAge(''); 
      setHeight(''); 
      setWeight(''); 
      setGender(''); 
  }; 

  return ( 
      <Screen safeAreaEdges={['top']}> 
          <Text text="BMI Calculator" preset="h2bold" style={$globalTextStyles.center} /> 
          <View style={$form}> 
              <View style={$inputRow}> 
                  <Text style={$label}> 
                      Age 
                  </Text> 
                  <TextInput 
                      style={$textInput} 
                      placeholder="Enter your age"
                      onChangeText={setAge} 
                      value={age} 
                      keyboardType="numeric"
                  /> 
              </View> 
              <View style={$inputRow}> 
                  <Text style={$label}> 
                      Height (cm) 
                  </Text> 
                  <TextInput 
                      style={$textInput} 
                      placeholder="Enter your height"
                      onChangeText={setHeight} 
                      value={height} 
                      keyboardType="numeric"
                  /> 
              </View> 
              <View style={$inputRow}> 
                  <Text style={$label}> 
                      Weight (kg) 
                  </Text> 
                  <TextInput 
                      style={$textInput} 
                      placeholder="Enter your weight"
                      onChangeText={setWeight} 
                      value={weight} 
                      keyboardType="numeric"
                  /> 
              </View> 
              <View style={$genderRow}> 
                  <TouchableOpacity 
                      style={[ 
                          $genderButton, 
                          gender === 'male' && $selectedGender, 
                      ]} 
                      onPress={() => setGender('male')} 
                  > 
                      <Text style={$genderText}> 
                          Male 
                      </Text> 
                  </TouchableOpacity> 
                  <TouchableOpacity 
                      style={[ 
                          $genderButton, 
                          gender === 'female' && $selectedGender, 
                      ]} 
                      onPress={() => setGender('female')} 
                  > 
                      <Text style={$genderText}>Female</Text> 
                  </TouchableOpacity> 
              </View> 
              <Button preset="filled" text="Calculate BMI " onPress={()=>validateForm()}/> 
              {bmiResult && ( 
                  <View style={$resultContainer}> 
                      <Text style={$resultLabel}> 
                          BMI: 
                      </Text> 
                      <Text style={$resultText}> 
                          {bmiResult.bmi} 
                      </Text> 
                      <Text style={$resultLabel}> 
                          Result: 
                      </Text> 
                      <Text style={$resultText}> 
                          {bmiResult.result} 
                      </Text> 
                  </View> 
              )} 
          </View> 
      </Screen> 
  ); 
}
)



  const $container:ViewStyle={ 
      flex: 1, 
      backgroundColor: '#eef2f3', 
      borderWidth:1,
      alignItems: 'center', 
      justifyContent: 'space-evenly', 
      // minHeight:'100%',

  }

  const $form:ViewStyle={
      // backgroundColor: colors.palette.neutral200, 
      borderRadius: 20, 
      padding: 20, 
      width: '90%', 
      // elevation: 5, 
  }
  const $inputRow:ViewStyle={
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      marginBottom: 20, 
  }
  const $label:ViewStyle={
      flex: 1, 
      fontSize: 18, 
      fontWeight: 'bold', 
      marginRight: 10, 
  }
  const $textInput:ViewStyle={
      flex: 2, 
      height: 40, 
      borderWidth: 1, 
      borderColor: '#ddd', 
      borderRadius: 10, 
      paddingLeft: 10, 
      fontSize: 16, 
  }
  const $genderRow:ViewStyle={
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      marginBottom: 20, 
  }
  const $genderButton:ViewStyle={
      flex: 1, 
      height: 40, 
      borderRadius: 10, 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: '#dbeffe', 
      padding: 10, 
      margin: 10, 
  }
  const $selectedGender:ViewStyle={
      backgroundColor: '#289df6', 
  }
  const $genderText:ViewStyle={
      fontSize: 16, 
      fontWeight: 'bold', 
      color: '#333', 
  }
  const $submitButton:ViewStyle={
      backgroundColor: '#289df6', 
      borderRadius: 10, 
      height: 50, 
      justifyContent: 'center', 
      alignItems: 'center', 
  }
  const $submitButtonText:ViewStyle={
      fontSize: 18, 
      fontWeight: 'bold', 
      color: '#fff', 
  }
  const $resultContainer:ViewStyle={
      marginTop: 20, 
  }
  const $resultLabel:ViewStyle={
      fontSize: 18, 
      fontWeight: 'bold', 
      marginBottom: 5, 
  }
  const $resultText:TextStyle={
      fontSize: 16, 
  }


const $root: ViewStyle = {
  flex: 1,
}
