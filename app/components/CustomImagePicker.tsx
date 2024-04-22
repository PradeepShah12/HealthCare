/* eslint-disable camelcase */
import React, { useEffect, useRef, useState } from "react"
import {
  StyleProp,
  View,
  ViewStyle,
  Image,
  ImageStyle,
  TouchableOpacity,
  Platform,
  FlatList,
  Alert,
} from "react-native"
import { Text, TextProps } from "./Text"
import { colors, spacing } from "../theme"
import {
  calculateRelativeHeight,
  calculateRelativeWidth,
} from "../utils/calculateRelativeDimensions"
import { CropView } from "react-native-image-crop-tools"

import * as MediaLibrary from "expo-media-library"
import { Spacer } from "./Spacer"
import { Button } from "./Button"
import {  useQueryClient } from "@tanstack/react-query"

import { openSettings } from "expo-linking"

import * as FileSystem from "expo-file-system"
import { useAppDispatch } from "../store"
import { setError } from "../store/Error/error.slice"
import { Modalize } from "react-native-modalize"
import { DynamicIcon } from "./DynamicIcon"
import { IconBackground } from "./IconBackground"


export interface CustomImagePickerProps {
  /**
   * An optional style override useful for padding & margin.
   */
  isModalOpen: boolean
  style?: StyleProp<ViewStyle>
  closeModal: () => void
  title?: string
  buttonText: TextProps["tx"]
  done: (props: any) => void
  modalRef: React.LegacyRef<Modalize>
  aspectRatio?: { width: number; height: number }
}

export const CustomImagePicker = (props: CustomImagePickerProps) => {
  // let cropCancel = true
  const { isModalOpen, closeModal, style, done, modalRef, aspectRatio } = props
  const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([])
  const [endCursor, setEndCursor] = useState<string>()
  const [hasNextPage, setHasNextPage] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<MediaLibrary.Asset>()
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions()
  const $styles = [$container, style]
const pickerRef = useRef<FlatList>();
  const queryClient = useQueryClient()
  const cropViewRef = useRef(null)
const dispatch = useAppDispatch()
// console.log(isPreview,'is Preview')


  const getPhotosFromCameraRoll = async (reload: boolean, setInitial = false) => {
    if (!reload) {
      if (!hasNextPage || isLoading) {
        return
      }
    }

    setIsLoading(true)

    try {
      if (!permissionResponse?.granted && permissionResponse?.canAskAgain&& permissionResponse?.accessPrivileges) requestPermission()

     
      const assets = await MediaLibrary.getAssetsAsync({
        first: 20,
        mediaType: "photo",
        after: endCursor,
        sortBy: Platform.OS === "ios" ? "creationTime" : "modificationTime",
      })

      if (setInitial) {
        const fileInfo = await FileSystem.getInfoAsync(assets.assets[0].uri, { size: true })
        const size = fileInfo?.size / 1048576;
        console.log(fileInfo.size / 1048576, "file info size")

        if (size <= 10) {
          setSelectedImage(assets.assets[0])
        } else {
          Alert.alert(
            'Alert',
            'Image selected must be below 10 MB',
            [
              {
                text: 'OK',
                onPress: () => null
              }
            ],
            { cancelable: false }
          )
          // Alert.alert("Sorry!", "Image selected must be below 5 MB")
          // setError("Image selected must be below 5 MB")
        }
      }

      setPhotos((prevPhotos) => [...prevPhotos, ...assets.assets])

      setEndCursor(assets.endCursor)
      setHasNextPage(assets.hasNextPage)
    } catch (error) {
      // console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {

    if (isModalOpen) {
      getPhotosFromCameraRoll(false, true)

      const listener = MediaLibrary.addListener((e) => {
        if (!e.hasIncrementalChanges) {
          getPhotosFromCameraRoll(true)
        } else {
          getPhotosFromCameraRoll(true)
        }
      })

      return () => listener.remove()
    }
  }, [isModalOpen])

  // update profile picture mutation


  // const onSavePress = async () => {
  //   if (selectedImage) {
  //     const manipResult = await ImageManipulator.manipulateAsync(selectedImage.uri, [], {
  //       compress: 0.5,
  //       format: ImageManipulator.SaveFormat.JPEG,
  //     })
  //     console.log(manipResult, "photo to upload")
  //     const body = new FormData()

  //     body.append("image", {
  //       uri: manipResult.uri,
  //       type: "image/png",
  //       name: selectedImage.filename,
  //       // Image width in pixels
  //       // height: calculateRelativeHeight(688),
  //     } as any)

  //     updateProfilePicture.mutate(body)
  //   }
  // }

  const handleImagePress = async (item: MediaLibrary.Asset) => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(item.uri, { size: true })
      const size = fileInfo?.size / 1048576;
      console.log(item,'image info')
  
      // console.log(fileInfo.size / 1048576, "file info size")
      if (size <= 10) {
        setSelectedImage(item)
        pickerRef?.current?.scrollToOffset({offset:0,animated:false});
      } else {
        Alert.alert("Alert!", "Image selected must be below 10 MB")
        // setError("Image selected must be below 5 MB")
      }
    } catch (error) {
      dispatch(
        setError({
          errorMessage: `Image Size Error`,
          isSnackBarVisible: true,
          type: "error",
        }))
    }

  }

  const handlePermissions = async () => {
    if (Platform.OS === "ios") {
      await openSettings()
    } else {
      if (!permissionResponse.canAskAgain) {
        await openSettings()
      } else {
        await requestPermission()
        getPhotosFromCameraRoll(true, true)
      }
    }
  }

  return (

    <Modalize isVisible={isModalOpen} style={$styles} ref={modalRef}
    withHandle={false}
    modalStyle={$styles}
    // rootStyle
    // withOverlay={false}
    // panGestureEnabled={false}
    // adjustToContentHeight
  >
        
      <View style={$contentContainer}>
        {!permissionResponse?.granted ? (
          <>
            <View style={$headerStyle}>
              <DynamicIcon iconName="close" iconColor={colors.transparent} />
              <IconBackground>
              <DynamicIcon iconName="close" iconOnPress={closeModal} />
              </IconBackground>
            </View>
            <View style={$permissionContainer}>
              <Text text="Permissions not granted for photo library." />
              {Platform.OS === "ios" && (
                <Text text="Please go to settings to grant permission." preset="body2Inactive" />
              )}

              <Spacer size="medium" />
              <Button
                text={Platform.OS === "ios" ? "Open Settings" : "Grant Permission"}
                onPress={handlePermissions}
              />
            </View>
          </>
        ) : photos && photos.length > 0 ? (
          <>
            <View style={$headerStyle}>
            <DynamicIcon iconName="close" iconColor={colors.transparent} />
            <IconBackground onPress={()=>closeModal()}>
              <DynamicIcon iconName="close" />
              </IconBackground>
            </View>
            {/* <Spacer size="medium" /> */}




            {/* <Animated.View style={$GalleryContainer}> */}
            <FlatList
 removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        initialNumToRender={5}            ListHeaderComponent={<View style={$previewImage}>
          
            {selectedImage && (
              <CropView
                sourceUrl={selectedImage ? selectedImage.uri : photos[0].uri}
                ref={cropViewRef}
                onImageCrop={(res) => done(res)}
                aspectRatio={aspectRatio || { width: 4, height: 3 }}
                keepAspectRatio
                style={{ height: calculateRelativeHeight(500) }}
                key={selectedImage?.uri}
                
              />
            )}
          </View>}
              data={photos}
              showsVerticalScrollIndicator={false}
              
              // onMomentumScrollBegin={handleScroll}
              // alwaysBounceVertical={true}
              // bounces={true}
              keyExtractor={(item, index) => `${item.uri}-${index}`}
              numColumns={4} // Number of columns in the gallery
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleImagePress(item)}>
                  <Image
                    source={{ uri: item.uri }}
                    style={selectedImage?.uri === item.uri ? $activeThumbnails : $thumbnails}
                  />
                </TouchableOpacity>
              )}
              contentContainerStyle={{ paddingBottom: spacing.massive + spacing.medium }}
              onEndReached={() => getPhotosFromCameraRoll(false, false)}
              style={$flatlistStyle}
              ref={pickerRef}

            />

            <View style={$buttonView}>
              <Button
                preset="filled"
                tx={ "common.save"}
                style={$saveButton}
                onPress={() => {
                  // cropperRef?.current?.done()
                  cropViewRef?.current?.saveImage(true, 90)
                }}
              />
              {/* <Button
                tx="common.cancel"
                style={[$saveButton, { marginLeft: spacing.small }]}
                onPress={closeModal}
                disabled={updateProfilePicture.isPending}
              /> */}
            </View>
            {/* </Animated.View> */}
          </>
        ) : (
          <>
            <View style={$headerStyle}>
            <DynamicIcon iconName="close" iconColor={colors.transparent} />
              <DynamicIcon iconName="close" iconOnPress={closeModal} />
            </View>
            <View style={$permissionContainer}>
              <Text text="There are no photos on this device" />
              {Platform.OS === "ios" && (
                <Text text="There are no photos on this device" preset="body2Inactive" />
              )}

              <Spacer size="medium" />
              <Button text={Platform.OS === "ios" ? "Go Back" : "Go Back"} onPress={closeModal} />
            </View>
          </>
        )}
          
      </View>

    </Modalize>
  

  )
}

const $container: ViewStyle = {
  justifyContent: "center",
  // flex: 1,
  // backgroundColor: colors.palette.primary300,
  margin: 0,
}

const $contentContainer: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  justifyContent: "space-between",
  backgroundColor: colors.palette.primary300,
  // borderWidth:1,
  // borderColor:'red',
  paddingTop:0,
}

const $headerStyle: ViewStyle = {
  flexDirection: "row",
  top: calculateRelativeHeight(35),
  right:15,
  justifyContent: "space-between",
  paddingHorizontal: spacing.medium,
  zIndex: 999,
  position:'absolute'
}
// const $titleStyle: TextStyle = {
//   textAlign: "center",
// }

// const $GalleryContainer: ViewStyle = {
//   minHeight: calculateRelativeHeight(318),
//   backgroundColor: colors.palette.primary300,
//   // alignSelf: "flex-end",
// }

const $thumbnails: ImageStyle = {
  width: calculateRelativeWidth(98),
  height: calculateRelativeWidth(98),
  borderWidth: 0.5,
}
const $activeThumbnails: ImageStyle = {
  width: calculateRelativeWidth(98),
  height: calculateRelativeWidth(98),
  borderWidth: 2,
}

const $saveButton: ViewStyle = {
  bottom: spacing.extraLarge - spacing.micro,
  width: calculateRelativeWidth(300),
  alignSelf: "center",
}

const $previewImage: ViewStyle = {
}

export const $buttonView: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  paddingHorizontal: spacing.small,
  alignSelf:'center',
  position: "absolute",
  // borderWidth:1,
  bottom: 0,
}

export const $permissionContainer: ViewStyle = {
  // flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

export const $flatlistStyle:ViewStyle={
  backgroundColor:colors.palette.neutral400,
    height: calculateRelativeHeight(780),
    // flex: 1,

}