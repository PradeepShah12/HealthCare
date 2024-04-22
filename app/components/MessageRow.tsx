import React,{ useEffect, useState }  from 'react';

import moment from 'moment';
import { Dimensions, Platform, TextStyle, View, ViewStyle } from 'react-native';
import { Text } from './Text';
import { colors, spacing, } from '../theme';
import { AutoImage } from './AutoImage';
import { Spacer } from './Spacer';
import { $globalTextStyles, $globalViewStyles } from '../theme/styles';
import { useAppSelector } from '../store';



export default function MessageRow({ message, userId, profilePic }) {
  const [myMessage, setMyMessage] = useState(false);
  const {user}=useAppSelector(state=>state.user)

  useEffect(() => {
    if (parseInt(message?.updated_by) === user.id) {
      setMyMessage(true);
    }
  }, [userId]);


  function isEmojiOnly(message) {

    // Regular expression to match emoji characters
    const emojiRegex =
      /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{1FAB0}-\u{1FABF}\u{1FAC0}-\u{1FAFF}\u{1F004}-\u{1F0CF}\u{1F170}-\u{1F251}\u{1F004}-\u{1F0CF}\u{1F004}-\u{1F0CF}\u{1F004}-\u{1F0CF}\u{1F004}-\u{1F0CF}\u{1F004}-\u{1F0CF}\u{1F004}-\u{1F0CF}\u{1F004}-\u{1F0CF}\u{1F004}-\u{1F0CF}\u{1F004}-\u{1F0CF}\u{1F004}-\u{1F0CF}\u{1F004}-\u{1F0CF}\u{1F004}-\u{1F0CF}\u{1F004}-\u{1F0CF}\u{1F004}-\u{1F0CF}\u{1F004}-\u{1F0CF}\u{1F004}-\u{1F0CF}\u{1F004}-\u{1F0CF}\u{1F004}-\u{1F0CF}]/gu;

    // Use the regular expression to match emoji characters in the message
    const emojis = message?.match(emojiRegex);
    // Check if the message contains only emoji characters
    return emojis !== null && message?.length === emojis?.join('').length;
  }
  const textStyle:TextStyle = myMessage
    ? {
      padding: 10,
      maxWidth: 300,
      borderRadius: 10,
      textAlign: 'right',

    }
    : {
      padding: 10,
      maxWidth: 300,
      borderRadius: 10,
      textAlign: 'left',

    };
  const cardStyle: ViewStyle = {
    backgroundColor: myMessage
      ? !isEmojiOnly(message?.content)
        ? colors.palette.primary300
        : '#0000'
      : !isEmojiOnly(message?.content)
        ? colors.palette.neutral200
        : '#0000',
  };

  return (

    <View style={[$container,  myMessage ? $globalViewStyles.justifyEnd : $globalViewStyles.justifyStart ]}>
      <View style={[$mainCard,myMessage?$globalViewStyles.rowReverse:$globalViewStyles.row ,$globalViewStyles.center,$globalViewStyles.justifyContentBetween,{  width: Dimensions.get('window').width - 20 }]}>
        <View style={$alignText}>
            {!myMessage && <AutoImage source={{ uri: profilePic }} maxWidth={spacing.extraLarge}/>}
            <Spacer size="tiny" orientation='width' />
            <View style={[myMessage ? myCardStyle : othersCardStyle, cardStyle]}>
            <Text  text={message?.content} style={textStyle} preset={ isEmojiOnly(message?.content)?'h4':undefined}/>
        
          </View>
          </View>
  

        <Text text='' style={[$timeText, myMessage ? $globalTextStyles.right : $globalTextStyles.left ]} />

        <Text style={[$timeText, myMessage ?$globalTextStyles.right :$globalTextStyles.left ]}>
            {message?.updated_at ? 'Sent' : Platform.OS !== 'android' ? 'UnSent' : 'Sent'}.{' '}
            {moment(message?.updated_at).endOf('minutes').fromNow()}
          </Text>
      </View>
    </View>

  );
}

const $container: ViewStyle = {
  width: '100%',
  paddingHorizontal: 10,
  flex: 1,
};

const $alignText:ViewStyle={
  flexDirection:'row',
  alignItems:'flex-end'
}
const $mainCard: ViewStyle = {
  marginVertical: 10,
  width: '100%',
  flexDirection: 'row',
};


const $timeText: TextStyle = {
  fontSize: 10,
  paddingTop: 0,
  top: 0,
  color: colors.palette.neutral300,
};
const myCardStyle: ViewStyle = {
  backgroundColor: colors.palette.primary100,
  justifyContent: 'flex-end',
  borderRadius: 10,
  borderBottomRightRadius: 0,
};

const othersCardStyle: ViewStyle = {
  backgroundColor: colors.palette.primary300,
  justifyContent: 'flex-start',
  borderRadius: 10,
  borderBottomLeftRadius: 0,
};

