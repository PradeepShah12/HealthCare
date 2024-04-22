import * as React from "react"
import { PressableProps, StyleProp, TouchableOpacity, View, ViewStyle } from "react-native"
import { $globalViewStyles, colors, spacing } from "../theme"
import { Text } from "./Text"
import { AutoImage } from "./AutoImage";
import { Spacer } from "./Spacer";
import { TimeDiffrence } from "../utils/formatDate";
import { MailService } from "../services/api/Mail/mail.api";
import { useQuery } from "@tanstack/react-query";
import { placeHolder } from "../utils/constants";
import { navigate } from "../navigators";
import { useAppSelector } from "../store";
import { truncateString } from "../utils/textUtils";

export interface MessageCardProps extends PressableProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Content of the message.
   */
  content: string;
  /**
   * Timestamp of the message.
   */
  timestamp: string;
  /**
   * Status of the message (read, unread, delivered, etc.).
   */
  status?: string;
  sender: number

  RoomId: number
}

/**
 * Component to display a message card.
 */
export const MessageCard = (props: MessageCardProps) => {
  const { style, content, timestamp, status, RoomId } = props;
  const $styles = [$container, style];
  const { user } = useAppSelector(state => state.user)


  const {
    data: RecipientData,
    isFetching: _isRecipientLoading,
  } = useQuery({
    queryKey: [`receipients-${RoomId}`],
    queryFn: async () => MailService.listRecipientsOfConversation(RoomId),
    enabled: !!RoomId,

  },
  )

  // console.log(RoomId,'roomId')
  const {
    data: EntryData,
    isFetching: _isEntryLoading,
  } = useQuery({
    queryKey: [`message-entry-${RoomId}`],
    queryFn: async () => {
      const res = await MailService.listEntriesByConversationId(RoomId);
      //  res.reverse()
      return res.reverse()
    },
    enabled: !!RoomId,

  })
  const filteredRecipientData = RecipientData?.filter(item => item.id !== user.id);
  const combinedNames = filteredRecipientData?.map(recipient => recipient?.display_name).join(", ");

  return (
    <TouchableOpacity
      onPress={() => navigate("MessageDetail", { data: { EntryData, participants: filteredRecipientData }, roomId: RoomId, roomName:combinedNames })}
      style={[$readNotificationCardStyle, $notificationCardStyle]}>
      <View style={[$globalViewStyles.row, $globalViewStyles.justifyStart, { flexWrap: 'wrap',width:spacing.extraLarge*2,height:spacing.extraLarge*2}]}>
        {filteredRecipientData?.map((users, index) => {
          return (
            <AutoImage key={index} source={{ uri: users.image || placeHolder }} maxWidth={filteredRecipientData.length<2?spacing.extraLarge*2:spacing.extraLarge} maxHeight={filteredRecipientData.length<2?spacing.extraLarge*2:spacing.extraLarge} showLoader />


          )
        })}

        {filteredRecipientData?.length===0?            <AutoImage  source={{ uri: RecipientData[0]?.image || placeHolder }} maxWidth={spacing.extraLarge*2} maxHeight={spacing.extraLarge*2} showLoader />:null}

        
      </View>
      <Spacer size="tiny" orientation="width" />

      <View style={[$rowStyle, $styles]}>
        {/* <Text preset="body1bold" text={RecipientData?.length>1?filteredRecipientData[0]?.display_name:RecipientData?.length>0?RecipientData[0]?.display_name:"HealthCare User" as string} /> */}

        <View style={[$globalViewStyles.row, $globalViewStyles.justifyStart]}>
      
              <Text

                preset="body1bold"
                text={truncateString(combinedNames,30)}
              />

        </View>
        <Text preset="body4" text={content} />
        <View style={$footer}>
          <Text preset="body4Inactive" text={TimeDiffrence(new Date(timestamp))} />
          <Text preset="body4Inactive" text={status} />
        </View>
      </View>
    </TouchableOpacity>

  );
};

const $readNotificationCardStyle: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  paddingHorizontal: 10,
  // paddingVertical: 12,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
}
const $notificationCardStyle: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  paddingHorizontal: 10,
  // paddingVertical: 12,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  borderRadius: spacing.small,
  // borderBottomWidth:0.4,
  // borderTopWidth:0.5,

  // borderWidth:0.25,

}
const $container: ViewStyle = {
  justifyContent: "space-between",
  //  padding:spacing.small,
  backgroundColor: colors.palette.neutral100,
  paddingHorizontal: 10,
  paddingVertical: 10,
  // marginBottom:spacing.small,
  borderRadius: spacing.small
};

const $rowStyle: ViewStyle = {
  flexDirection: 'column',
  flex: 1,
}
const $footer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  // marginTop: 8,
};


