import React, { ReactNode, useMemo } from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet"

import { Text } from "./Text"
import { colors, spacing } from "../theme"
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types"

export interface CustomBottomSheetProps {
  height: string
  title: string
  bottomSheetRef: React.Ref<BottomSheetMethods>
  onClose?: () => void
  contentContainerStyle?: StyleProp<ViewStyle>
  dismissableOnBackDropPress?: boolean
  enablePanDownToClose?: boolean
  headerRightComponent?: ReactNode
  children?: ReactNode
  handleClose?: () => void
  
}

const CustomBottomSheet = (props: CustomBottomSheetProps) => {
  const {
    headerRightComponent,
    title,
    children,
    height,
    bottomSheetRef,
    onClose,
    enablePanDownToClose,
    contentContainerStyle: $contentContainerOverride,
  } = props

  // const handleClose = () => {
  //   bottomSheetRef.current.forceClose()
  //   bottomSheetRef.current.close()
  // }

  const snapPoints = useMemo(() => [height, height], [])

  const onCloseSheet = () => (onClose ? onClose() : () => null)

  return (
    <BottomSheet
      ref={bottomSheetRef}
      
      // backdropComponent={(backdropProps)=><CustomBackdrop  {...backdropProps}/>}
      // backdropComponent={(backdropProps) => (
      //   <BottomSheetBackdrop  {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.5}/>
      // )}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={enablePanDownToClose || true}
      backgroundStyle={$handleBackgroundStyle}
      handleIndicatorStyle={$handleStyle}
      onChange={(index) => {
        if (index === -1) {
          onCloseSheet()
        }
      }}
      // waitFor={bottomSheetRef}
      // enableContentPanningGesture={true}
    >
      <View style={[$contentContainer, $contentContainerOverride]}>
        <View style={$header}>
          <View style={$onethird} />
          <View style={$onethird}>
            <Text text={title} preset="h3bold" textBreakStrategy="highQuality" />
          </View>
          <View style={$onethird}>{headerRightComponent}</View>
        </View>
        {children}
      </View>
    </BottomSheet>
  )
}

const $contentContainer: ViewStyle = {
  flex: 1,
  alignItems: "center",
  padding: spacing.medium,
}

const $handleStyle: ViewStyle = {
  borderRadius: 0,
  width: 40,
  height: 2,
}
const $handleBackgroundStyle: ViewStyle = {
  borderRadius: spacing.small,
  borderWidth: 0,
  backgroundColor:colors.palette.primary400
}
const $header: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
}

const $onethird: ViewStyle = {
  alignItems: "center",
}

export default CustomBottomSheet
