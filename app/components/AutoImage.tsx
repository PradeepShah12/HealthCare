import React, { useLayoutEffect, useState } from "react"
import { ActivityIndicator, Image, ImageURISource, Platform, View } from "react-native"
import FastImage, { FastImageProps } from "react-native-fast-image"
import { $activityIndicator } from "../theme"
import { placeHolder } from "../utils/constants"

// TODO: document new props
export interface AutoImageProps extends FastImageProps {
  showLoader?: boolean
  /**
   * How wide should the image be?
   */
  maxWidth?: number
  /**
   * How tall should the image be?
   */
  maxHeight?: number
}

/**
 * A hook that will return the scaled dimensions of an image based on the
 * provided dimensions' aspect ratio. If no desired dimensions are provided,
 * it will return the original dimensions of the remote image.
 *
 * How is this different from `resizeMode: 'contain'`? Firstly, you can
 * specify only one side's size (not both). Secondly, the image will scale to fit
 * the desired dimensions instead of just being contained within its image-container.
 *
 */
export function useAutoImage(
  remoteUri: string,
  dimensions?: [maxWidth: number, maxHeight: number],
): [width: number, height: number] {
  const [[remoteWidth, remoteHeight], setRemoteImageDimensions] = useState([0, 0])
  const remoteAspectRatio = remoteWidth / remoteHeight
  const [maxWidth, maxHeight] = dimensions ?? []

  useLayoutEffect(() => {
    if (!remoteUri) return

    Image.getSize(remoteUri, (w, h) => setRemoteImageDimensions([w, h]))
  }, [remoteUri])

  if (Number.isNaN(remoteAspectRatio)) return [0, 0]

  if (maxWidth && maxHeight) {
    const aspectRatio = Math.min(maxWidth / remoteWidth, maxHeight / remoteHeight)
    return [remoteWidth * aspectRatio, remoteHeight * aspectRatio]
  } else if (maxWidth) {
    return [maxWidth, maxWidth / remoteAspectRatio]
  } else if (maxHeight) {
    return [maxHeight * remoteAspectRatio, maxHeight]
  } else {
    return [remoteWidth, remoteHeight]
  }
}

/**
 * An Image component that automatically sizes a remote or data-uri image.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-AutoImage.md)
 */
export function AutoImage(props: AutoImageProps) {
  const { maxWidth, maxHeight, showLoader, ...FastImageProps } = props
  const [tempSource,setTempSource]=useState( props.source)
  // const source = props.source as  ImageURISource

  const [loading, setLoading] = useState(false)

  const [_width, height] = useAutoImage(
    Platform.select({
      web: (tempSource?.uri as string) ?? (tempSource as string),
      default: tempSource?.uri as string,
    }),
    [maxWidth, maxHeight],
  )

  
  return (
    <>
      {loading && showLoader && (
        <View style={[$activityIndicator, { maxHeight, maxWidth }]}>
          <ActivityIndicator />
        </View>
      )}
      <FastImage
        {...FastImageProps}
        source={tempSource}
        style={[{ width:maxWidth, height }, props.style]}
        onLoadStart={() => setLoading(true)}
        onLoad={() => setLoading(false)}
        onLoadEnd={() => setLoading(false)}
        resizeMode="cover"
        onError={()=> {setTempSource({uri:placeHolder})}}
      />
    </>
  )
}
