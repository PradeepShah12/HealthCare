import * as React from "react"
import { Keyboard, StyleProp, TouchableOpacity, View, ViewStyle } from "react-native"
import { $globalViewStyles, Device, colors, spacing } from "../theme"
import { Text } from "./Text"
import { IconBackground } from "./IconBackground"
import { goBack } from "../navigators"
import { DynamicIcon } from "./DynamicIcon"
import { Spacer } from "./Spacer"
import { Formik } from "formik"
import { useAppDispatch, useAppSelector } from "../store"
import { setScope, setSearchQuery, setSearchResult } from "../store/Search/search.slice"
import { SearchParams, SearchService } from "../services/api/Search/searc.api"
import { setError, setSuccess } from "../store/Error/error.slice"
import { AxiosError } from "axios"
import { ApiError } from ".."
import { useMutation } from "@tanstack/react-query"
import {  TextInput } from "react-native-paper"

import { calculateRelativeWidth } from "../utils/calculateRelativeDimensions"
import { NativeStackHeaderProps } from "@react-navigation/native-stack"
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
export interface DefaultHeaderProps extends NativeStackHeaderProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  line?: StyleProp<ViewStyle>

}
export interface DefaultHeaderBottomTabProps extends BottomTabHeaderProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  line?: StyleProp<ViewStyle>

}


/**
 * Describe your component here
 */
interface InitialValues {
  searchQuery: string
}

const filters = [{ id: 'post', title: 'Post' }, { id: 'user', title: 'User' }, { id: 'spaces', title: 'Spaces' }]


export const SearchHeader = (props: DefaultHeaderBottomTabProps|DefaultHeaderProps) =>{
  const { style } = props
  const topInsetStyle=useSafeAreaInsetsStyle(["top"])

  const $styles = [$container, style,topInsetStyle]
  const { scope } = useAppSelector(state => state.search)
  const initialValues: InitialValues = {
    searchQuery: '',
  }
  const dispatch = useAppDispatch()
  const { mutate: search, isPending:_isSearching,data:_SearchResult,} = useMutation({
    mutationFn: (body:SearchParams) => SearchService.completeSearch(body),
    onSuccess: async (resultData) => {

      dispatch(setSearchResult({data:resultData}))
      // perform other side effects on success - save tokens
      dispatch(
        setSuccess({
          isSnackBarVisible: true,
          errorMessage: "Search success" ,
        }),
      )
    },
    
    onError: (error: AxiosError<ApiError>) => {
      dispatch(
        setError({
          isSnackBarVisible: true,
          errorMessage: error.message ,
        }),
      )
      
    },
    
    
  })

  const handleChangeQuery = (e: InitialValues) => {

    dispatch(setSearchQuery({ searchQuery: e.searchQuery }))
    search({searchQuery:e.searchQuery,scope:scope,limitSpace:''})
  }

  const handleFilter=(items)=>{
console.log(scope===items)

if(scope===items){
  dispatch(setSearchResult({data:_SearchResult}))
  dispatch(setScope({ scope: 'all' }))
}else{
  const filteredFilters = _SearchResult?.filter((item) => item.type === items)

  dispatch(setSearchResult({data:filteredFilters}))
  dispatch(setScope({ scope: items }))
}


  }






  return (
           <View style={$backgroundColor}> 


      <View style={[$styles,$globalViewStyles.rowCenter, $globalViewStyles.justifyStart, $paddedScreen]}>
        <IconBackground onPress={() => goBack()}>
          <DynamicIcon iconName="chevron-back" iconFamily="Ionicons" />
        </IconBackground>
        <Spacer size="small" orientation="width" />
        <Formik
          initialValues={initialValues}
          onSubmit={(values: InitialValues) => {
            Keyboard.dismiss()
            handleChangeQuery(values)
          }}
        >
          {({ handleChange, values, submitForm }) => (
            <TextInput
              mode="outlined"
              placeholder="Search HealthCare"
              // placeholderTx="placeholders.search"
              value={values.searchQuery}
              onEndEditing={submitForm}
              onChangeText={handleChange("searchQuery")}
              style={$inputStyle}
              outlineStyle={$inputOutline}
              
            />
          )}
          {/* <DynamicIcon iconName="search" iconFamily="Feather"/> */}
        </Formik>
        <Spacer size="small" />

     </View>
     {/* <Spacer size="tiny" /> */}

      {/* <Divider color={colors.palette.neutral400}/> */}
      <Spacer size="small" />

      <View style={[$globalViewStyles.rowCenter, $globalViewStyles.justifyEvenly]}>
        {filters.map((item) => { return <TouchableOpacity onPress={() => handleFilter(item.id)} style={scope === item.id ? $activeChip : $chipStyle} key={item?.id}><Text text={item?.title} /></TouchableOpacity  > })}


      </View>
      {/* <Spacer size="small" /> */}
      </View>
  )
}

const $container: ViewStyle = {
  justifyContent: "center",
}


const $paddedScreen: ViewStyle = {
  paddingHorizontal: spacing.medium,
}
const $inputStyle: ViewStyle = {
  height: spacing.extraLarge + spacing.extraSmall,
  borderWidth: 0,
  width: Device.width * 0.8,
  backgroundColor: colors.palette.neutral200,
  padding: 0
}

const $inputOutline: ViewStyle = {
  borderWidth: 0,
  padding: 0,
  borderRadius: spacing.extraLarge,

}

const $activeChip: ViewStyle = {
  borderRadius: spacing.tiny,
  backgroundColor: colors.palette.primary200,
  width: calculateRelativeWidth(100),
  alignItems: 'center',
  paddingVertical: spacing.tiny,
  // borderWidth:1,
}
const $chipStyle: ViewStyle = {
  borderRadius: spacing.tiny,
  backgroundColor: colors.palette.neutral100,
  width: calculateRelativeWidth(100),
  alignItems: 'center',
  paddingVertical: spacing.tiny,
  borderWidth:0.5,
  borderColor:colors.inactiveText

}
const $backgroundColor:ViewStyle={
  backgroundColor:colors.palette.neutral100
}