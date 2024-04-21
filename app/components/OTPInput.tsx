import React, { useEffect, useRef, useState } from 'react'
import { View, TextInput, Pressable, ViewStyle,  } from 'react-native'
import { Text } from './Text'
import { colors } from '../theme'


interface IOTPInputProps {
  code: string
  editable: boolean
  setCode: (code: string) => void
  maximumLength: number
  setIsOTPReady: (status: boolean) => void
}

const OTPInput: React.FC<IOTPInputProps> = ({
  code,
  maximumLength,
  setCode,
  editable,
  setIsOTPReady,
}) => {

  const [isInputBoxFocused, setIsInputBoxFocused] = useState(false)
  const boxArray = new Array(maximumLength).fill(0)

  const inputRef = useRef<TextInput>(null)

  const handleOnPress = () => {
    setIsInputBoxFocused(true)
    inputRef?.current?.focus()
  }

  const handleOnBlur = () => {
    setIsInputBoxFocused(false)
  }

  useEffect(() => {
    // update pin ready status
    setIsOTPReady(code.length === maximumLength)
    setIsInputBoxFocused(true)
    // clean up function
    return () => {
      setIsOTPReady(false)
    }
  }, [code])

  const boxDigit = (_: any, index: number) => {
    const emptyInput = ''
    const digit = code[index] || emptyInput

    const isCurrentValue = index === code.length
    const isLastValue = index === maximumLength - 1
    const isCodeComplete = code.length === maximumLength

    const isValueFocused = isCurrentValue || (isLastValue && isCodeComplete)

    return (
      <View
        style={
          isInputBoxFocused && isValueFocused
            ? $splitBoxesFocused
            : $splitBoxes
        }
        key={index}
      >
        <Text preset="h1">{digit}</Text>
      </View>
    )
  }

  return (
    <View style={$OTPInputContainer}>
      <Pressable style={$splitOTPBoxesContainer} onPress={handleOnPress}>
        {boxArray.map(boxDigit)}
      </Pressable>
      <TextInput
        ref={inputRef}
        style={$textInputHidden}
        value={code}
        onChangeText={setCode}
        onBlur={handleOnBlur}
        // showSoftInputOnFocus={true}
        maxLength={maximumLength}
        editable={editable}
        autoFocus={true}
        keyboardType="number-pad"
        returnKeyType="done"
      />
    </View>
  )
}


  const $OTPInputContainer:ViewStyle= {
    justifyContent: 'flex-start',
    // borderWidth:1,

    alignItems: 'flex-start',

  }

  const $textInputHidden:ViewStyle= {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    // color: colors.navInactive,
    position: 'absolute',
    opacity: 0

  }

  const $splitOTPBoxesContainer:ViewStyle= {
    flexDirection: 'row',
    justifyContent: 'space-evenly',

  }
  const $splitBoxes:ViewStyle={
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 5,
    alignItems:'center',
    justifyContent:'center',
    minWidth: 50,
    height: 60,
    marginHorizontal: 7,
    backgroundColor:colors.palette.neutral100,
   

  }

  const $splitBoxesFocused:ViewStyle={
    borderColor: 'black',
    borderWidth: 1,
    alignItems:'center',
    justifyContent:'center',
        borderRadius: 5,
    minWidth: 50,
    height: 60,
    marginHorizontal: 7,
    alignContent:'center',
    backgroundColor:colors.palette.neutral100,

  }


export default OTPInput