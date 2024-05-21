import React, { FC, useContext } from "react";
import { observer } from "mobx-react-lite";
import { ScrollView, ViewStyle, Image, TouchableOpacity, View } from "react-native";
import { AppStackScreenProps } from "app/navigators";
import { Screen, Text } from "app/components";
import { useNavigation } from "@react-navigation/native";
import { DynamicIcon } from "app/components/DynamicIcon";
import { colors, spacing } from "app/theme";

// Dummy data for blog posts
const blogPosts = [
  {
    id: "1",
    image: "https://image.isu.pub/180525022840-9d960995c0da4352ac682f37fc47d492/jpg/page_1.jpg",
    title: "The Benefits of Morning Exercise",
    excerpt: "Exercising in the morning has numerous benefits, including boosting your metabolism and improving mental clarity for the day ahead...",
    content: `Morning exercise is a powerful way to start your day. It helps to kickstart your metabolism, allowing you to burn more calories throughout the day. Additionally, exercising in the morning can lead to better mental clarity and a more positive outlook as endorphins are released. Studies also show that people who exercise in the morning are more consistent with their workout routines. 
    To get started with morning exercise, try simple activities like jogging, yoga, or even a quick HIIT session. Remember to stay hydrated and have a light, healthy breakfast post-workout to fuel your body.`,
    author: "Jane Doe",
    publishedDate: "2023-05-10",
    tags: ["exercise", "morning routine", "fitness"]
  },
  {
    id: "2",
    image: "https://www.heart.org/-/media/Images/Healthy-Living/Healthy-Eating/MediterraneanDiet.jpg?h=248&iar=0&mw=440&w=440",
    title: "Healthy Eating: Tips for a Balanced Diet",
    excerpt: "Eating a balanced diet is crucial for maintaining good health. Here are some tips to help you make healthier food choices...",
    content: `Maintaining a balanced diet is essential for overall health and wellness. A balanced diet includes a variety of foods from all food groups: fruits, vegetables, protein, dairy, and grains. 
    Start by incorporating more whole foods into your diet and reducing processed foods. Aim to fill half your plate with fruits and vegetables, and opt for whole grains over refined grains. Protein is also important, so include a mix of plant-based proteins like beans and nuts, as well as lean meats and fish.
    Staying hydrated is just as important, so make sure to drink plenty of water throughout the day. Consider preparing meals at home where you can control the ingredients and portions. Finally, moderation is key - it's okay to enjoy your favorite treats in moderation.`,
    author: "John Smith",
    publishedDate: "2023-06-15",
    tags: ["nutrition", "healthy eating", "diet tips"]
  },
  {
    id: "3",
    image: "https://images.healthshots.com/healthshots/en/uploads/2022/05/11184715/Yoga-for-weight-loss.jpg",
    title: "Yoga for Beginners: Getting Started",
    excerpt: "Yoga is a great way to improve flexibility and reduce stress. If you're new to yoga, here's how to get started...",
    content: `Yoga is an excellent practice for beginners and offers numerous benefits including improved flexibility, strength, and stress relief. To start your yoga journey, begin with basic poses and gradually increase the complexity as you become more comfortable.
    Key poses for beginners include the Mountain Pose (Tadasana), Downward-Facing Dog (Adho Mukha Svanasana), and Child's Pose (Balasana). Focus on your breathing and take your time with each pose, listening to your body and avoiding any movements that cause pain.
    Joining a beginner yoga class can be very helpful, as you will have guidance from an instructor and the support of fellow beginners. There are also many online resources and videos available to help you practice at home.
    Remember, consistency is key in yoga. Try to practice regularly, even if it's just for a few minutes each day, and you will soon notice improvements in both your physical and mental well-being.`,
    author: "Emily Johnson",
    publishedDate: "2023-07-20",
    tags: ["yoga", "beginner tips", "wellness"]
  },
];


interface HealthFitnessBlogScreenProps extends AppStackScreenProps<"HealthFitnessBlog"> {}

export const HealthFitnessBlogScreen: FC<HealthFitnessBlogScreenProps> = observer(function HealthFitnessBlogScreen() {
  const navigation = useNavigation();

  return (
    <Screen style={$root} preset="scroll">
      <ScrollView showsVerticalScrollIndicator={false} >
        {blogPosts.map((post) => (
          <TouchableOpacity
            key={post.id}
            style={{ backgroundColor:colors.palette.neutral200,marginVertical: 12,  flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" ,padding:spacing.small,borderRadius:10}}
            onPress={() => navigation.navigate("BlogDetail", { post })}
          >
            <Image style={{ width: 90, height: 90, borderRadius: 8 }} source={{ uri: post.image }} />
            <View style={{ marginLeft: 10, flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>{post.title}</Text>
              <Text style={{ marginTop: 4, fontSize: 16, color: "gray" }}>{post.excerpt}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Screen>
  );
});

const $root: ViewStyle = {
  flex: 1,
};