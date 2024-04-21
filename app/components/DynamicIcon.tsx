import React from 'react';
import {
  ColorValue,
  GestureResponderEvent,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';
import { colors } from '../theme';

interface StyleProps {
  style?:
    | StyleProp<ViewStyle>
    | Array<StyleProp<ViewStyle>>
    | {[key: string]: string | number | React.FC<any>}
    | any;
}

const VectorIcon = {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  FontAwesome5Pro,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
};

export type DynamicIconProps = StyleProps & {
  iconFamily?:
    | 'AntDesign'
    | 'Entypo'
    | 'EvilIcons'
    | 'Feather'
    | 'FontAwesome'
    | 'FontAwesome5'
    | 'FontAwesome5Pro'
    | 'Fontisto'
    | 'Foundation'
    | 'Ionicons'
    | 'MaterialCommunityIcons'
    | 'MaterialIcons'
    | 'Octicons'
    | 'SimpleLineIcons'
    | 'Zocial';

  iconSize?: number;

  iconName: string;

  iconColor?: ColorValue | number;
  iconOnPress?: ((event?: GestureResponderEvent) => void) | undefined;
  rootStyle?: StyleProp<ViewStyle>;
};

export const DynamicIcon = ({
  iconName = 'home',
  iconSize = 20,
  iconColor = colors.black,
  iconFamily = 'Ionicons',
  iconOnPress,
  rootStyle,
  ...rest
}: DynamicIconProps) => {
  const otherPros = {
    color: iconColor,
    size: iconSize,
  };
  const SelectedIcon = VectorIcon[iconFamily];

  const touchableProps = {
    onPress: iconOnPress,
    activeOpacity: 0.6,
    hitSlop: {top: 14, left: 14, bottom: 14, right: 14},
  };

  if (!iconOnPress) {
    return <SelectedIcon name={iconName} {...otherPros} />;
  }
  return (
    <TouchableOpacity {...touchableProps} style={rootStyle}>
      <SelectedIcon name={iconName} {...otherPros} {...rest} />
    </TouchableOpacity>
  );
};
