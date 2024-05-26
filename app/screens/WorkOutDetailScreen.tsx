import React, { FC, useContext } from "react"
import { observer } from "mobx-react-lite"
import { ScrollView, ViewStyle ,Image, TouchableOpacity, View} from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"
import { useNavigation, useRoute } from "@react-navigation/native"
import { FitnessItems } from '../Context';
import { DynamicIcon } from "app/components/DynamicIcon"
import { colors } from "app/theme"

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface WorkOutDetailScreenProps extends AppStackScreenProps<"WorkOutDetail"> {}

export const WorkOutDetailScreen: FC<WorkOutDetailScreenProps> = observer(function WorkOutDetailScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const route = useRoute();
  const navigation = useNavigation();
  const { completed, setCompleted } = useContext(FitnessItems);
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll">



      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "white", marginTop: 20 }}
      >
        <Image
          style={{ width: "100%", height: 200, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, marginBottom: 20 }}
          source={{ uri: route.params.image }}
        />

<DynamicIcon iconName="arrow-back-outline"
  iconSize={24}
  iconFamily="Ionicons"
  iconColor="black"
  style={{ position: 'absolute', top: 30, left: 20, backgroundColor: "white", borderRadius: 8, padding: 3 }}
  iconOnPress={() => navigation.goBack()}
  />
 

        {
          route.params.exercises.map((item, index) => (
            <TouchableOpacity style={{ marginVertical: 12, marginHorizontal: 18, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} key={index}>
              <View style={{ flexDirection: "row", alignItems: "center", }}>
                <Image style={{ width: 90, height: 90, }} source={{ uri: item.image }} />

                <View style={{ marginLeft: 10 }}>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.name}</Text>
                  <Text style={{ marginTop: 4, fontSize: 16, color: "gray" }}>{item.sets}</Text>
                </View>
              </View>

              {
                completed.includes(item?.name) ? (<DynamicIcon iconFamily="AntDesign" iconName="checkcircle" iconSize={24} iconColor="#198f51" />) : null
              }
            </TouchableOpacity>
          ))
        }
      </ScrollView>

      <TouchableOpacity onPress={() => {
        navigation.navigate("Fit", { exercises: route.params.exercises,workoutType:route.params.workoutType }) 
        setCompleted([]);
      }} style={{ backgroundColor: colors.palette.secondary700, padding: 12, marginHorizontal: 15, marginVertical: 20, borderRadius: 50}}>
        <Text style={{ textAlign: "center", color: "#fff", fontWeight: "bold", fontSize: 20 }}>
          <DynamicIcon iconFamily="MaterialCommunityIcons" iconColor={"white"} iconName="whistle" iconSize={24}/>
 START</Text>
      </TouchableOpacity>
  

    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
