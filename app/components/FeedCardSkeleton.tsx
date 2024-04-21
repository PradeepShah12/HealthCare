import * as React from "react"

import { calculateRelativeHeight } from "../utils/calculateRelativeDimensions"
import { ImageStyle, View, ViewStyle } from "react-native"
import { colors, spacing } from "../theme"
import { Skeleton } from "@rneui/base"
import { Spacer } from "./Spacer"


/**
 * Describe your component here
 */
export const FeedCardSkeleton = () =>{

  return (
    <Skeleton animation="wave"  height={calculateRelativeHeight(480)}>

            <Skeleton
              style={$profileContainer}>
              <Skeleton
                style={$ppWrapper}>
                <Skeleton
                  >
                  <Skeleton circle style={$ppStyle} />
                  {/* <CacheImage
                  style={{
                    height: 34,
                    width: 34,
                    padding: 20,
                    // margin: 6,
                    resizeMode: 'cover',
                    borderRadius: 36,
                  }}
                  uri={OtherPic(profileDetails?.profilePic)}></CacheImage> */}
                </Skeleton>

                <Skeleton
                  style={$nameContainer}>
                  <Skeleton
                    
                    // style={$headerStyle}
                    >
                    <Skeleton>
                    </Skeleton>
                    {/* <DynamicIcon
                    iconName="checkmark-circle"
                    iconFamily="Ionicons"
                    iconSize={18}
                    iconColor={Colors.blue}
                  /> */}
                  </Skeleton>
                  <Skeleton
                >
                  </Skeleton>
                </Skeleton>
              </Skeleton>
              <Skeleton
                style={$menuIconStyle}
                >
        
              </Skeleton>

            </Skeleton>


            <Skeleton
              style={$textWrapper}>
              <Skeleton/>



            </Skeleton>
    </Skeleton>
  )
}

export const MessageCardSkeleton = () =>{

  return (
    <View   style={$notificationCardStyle}>
    <Skeleton animation="wave" circle  height={spacing.huge} width={spacing.huge}>

    </Skeleton>
    <Spacer size="small" orientation="width"/>
    <View style={[$container,$rowStyle]}>
    <Skeleton />
            <Skeleton width={100} />
            <View style={$footer}>
        <Skeleton width={75}/>
      </View>
      </View>
    </View>

  )
}
const $footer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  // marginTop: 8,
};


const $container: ViewStyle = {
  justifyContent: "space-between",
//  padding:spacing.small,
  backgroundColor:colors.palette.neutral100,
  paddingHorizontal: 10,
  paddingVertical: 10,
// marginBottom:spacing.small,
borderRadius:spacing.small
};

const $rowStyle:ViewStyle={
  flexDirection: 'column',
  flex: 1,
}

const $notificationCardStyle:ViewStyle={
  backgroundColor:colors.palette.neutral100 ,
  paddingHorizontal: 10,
  // paddingVertical: 12,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  // borderRadius:spacing.small,
  // borderBottomWidth:0.4,
  // borderTopWidth:0.5,

  // borderWidth:0.25,

}


const $profileContainer: ViewStyle = {
  height: 'auto',
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  alignSelf: 'center',
  // borderWidth: 1,
  margin: 5,
  marginTop: 0,
  // borderWidth: 1,
}







const $ppWrapper: ViewStyle = {

  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'space-between',


}
const $ppStyle: ImageStyle = {
  width: 40,
  height: 40,
  borderRadius: 40,
}
const $textWrapper: ViewStyle = {

  width: '100%',
  // paddingHorizontal: 10,
  paddingBottom: 10,
}



const $menuIconStyle: ViewStyle = {

  position: 'relative',
  right: -8,
  // borderWidth: 1,
  top: 2,
  alignSelf: 'flex-start',
  alignItems: 'flex-end',
  width: 20,
  alignContent: 'flex-end',
  justifyContent: 'flex-end',
}


const $nameContainer: ViewStyle = {
  marginLeft: 9,
  alignContent: 'center',
  // borderWidth: 1,
}
