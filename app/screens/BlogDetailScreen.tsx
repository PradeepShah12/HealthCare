import React, { FC, useContext } from "react";
import { observer } from "mobx-react-lite";
import { ScrollView, ViewStyle, Image, TouchableOpacity, View } from "react-native";
import { AppStackScreenProps } from "app/navigators";
import { Screen, Text } from "app/components";
import { useNavigation, useRoute } from "@react-navigation/native";
import { DynamicIcon } from "app/components/DynamicIcon";
import { colors, spacing } from "app/theme";

// A screen for the detailed blog post
interface BlogDetailScreenProps extends AppStackScreenProps<"BlogDetail"> {}

export const BlogDetailScreen: FC<BlogDetailScreenProps> = observer(function BlogDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { post } = route.params;

  return (
    <Screen style={$root} preset="scroll">
      <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: "white", marginTop: 20 }}>
        <Image style={{ width: "100%", height: 200, marginBottom: 20 }} source={{ uri: post.image }} />
        <DynamicIcon
          iconName="arrow-back-outline"
          iconSize={24}
          iconFamily="Ionicons"
          iconColor="black"
          // style={{ position: "absolute", top: 30, left: 20, backgroundColor: "white", borderRadius: 8, padding: 3 }}
          iconOnPress={() => navigation.goBack()}
        />
        <View >
          <Text preset="h1">{post.title}</Text>
          <Text style={{ fontSize: 16, color: "gray" }}>{post.content}</Text>
        </View>
      </ScrollView>
    </Screen>
  );
});
const $root: ViewStyle = {
  flex: 1,
};