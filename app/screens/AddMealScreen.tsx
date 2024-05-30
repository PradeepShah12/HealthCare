import React, { FC, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { StyleSheet, TouchableOpacity, View, TextInput, FlatList, Alert, ActivityIndicator } from "react-native";
import { AppStackScreenProps } from "app/navigators";
import { IconBackground, Screen, Spacer, Text, TextField } from "app/components";
import axios from "axios";
import { useAppSelector } from "app/store";
import { colors, spacing } from "app/theme";
import { $globalTextStyles } from "app/theme/styles";
import { DynamicIcon } from "app/components/DynamicIcon";

interface Cuisine {
  id: string;
  name: string;
}

interface Food {
  id: string;
  name: string;
}

interface Meal {
  id: string;
  name: string;
}

interface AddMealScreenProps extends AppStackScreenProps<"AddMeal"> { }

const API_BASE = "https://c1b4-165-225-114-126.ngrok-free.app/api/";

export const AddMealScreen: FC<AddMealScreenProps> = observer(function AddMealScreen() {
  const [cuisines, setCuisines] = useState<Cuisine[]>([
    { id: "1", name: "Italian" },
    { id: "2", name: "Mexican" },
    { id: "3", name: "Chinese" },
  ]);

  const [searchResult,setSearchResult]=useState({
    FoodName:'',
    Cal:'',
    Carb:"",
    Proteins:"",
    Fats:"'"
  })
  const [selectedCuisine, setSelectedCuisine] = useState<Cuisine | null>(null);
  const [searchQuery,setSeearchQuery]=useState('')
  const [isLoading,setIsLoading]=useState()
  const [selectedCustomFood,setSelectedCustomFood]=useState()
  const [foods, setFoods] = useState<Food[]>([
    { id: "1", name: "Pizza" },
    { id: "2", name: "Pasta" },
    { id: "3", name: "Lasagna" },
  ]);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [meals, setMeals] = useState<Meal[]>([
    { id: "1", name: "Breakfast" },
    { id: "2", name: "Lunch" },
    { id: "3", name: "Dinner" },
  ]);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const { UserID } = useAppSelector(state => state.user.user)
  useEffect(() => {
    fetchCuisines();
  }, []);

  useEffect(() => {
    if (selectedCuisine) {
      fetchFoods(selectedCuisine.CuisineId);
    }
  }, [selectedCuisine]);

  useEffect(() => {
    if (selectedFood) {
      fetchMeals();
      
    }

  }, [selectedFood]);



  useEffect(() => {
    fetchCustomFood({query:searchQuery})
  
 
  }, [searchQuery])
  

  const fetchCuisines = async () => {
    try {
      const response = await axios.post(`${API_BASE}user/activity/nutritionTracker/getCuisine`);
      setCuisines(response.data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch cuisines");
    }
  };

  const fetchFoods = async (cuisineId: string) => {
    try {
      const response = await axios.post(`https://c1b4-165-225-114-126.ngrok-free.app/api/user/activity/nutritionTracker/getFood`, {
      CuisineID: cuisineId ,
      UserID,
      });
      setFoods(response.data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch foods");
    }
  };

  


  const fetchCustomFood = async (body) => {
    setIsLoading(true)
    try {
      const response = await axios.post(`https://c1b4-165-225-114-126.ngrok-free.app/api/user/activity/nutritionTracker/mealdata`,body);
      setSearchResult(response?.data?.items);
      setIsLoading(false)

    } catch (error) {
      setIsLoading(false)

      // Alert.alert("Error", "Failed to fetch meals");
    }
  };


  const fetchMeals = async () => {
    console.log(selectedCuisine,selectedFood,'selected cuising and food')
    try {
      const response = await axios.post(`https://c1b4-165-225-114-126.ngrok-free.app/api/user/activity/nutritionTracker/getMeals`,{UserID,CuisineID:selectedCuisine?.CuisineId,FoodID:selectedFood?.foodId});
      setMeals(response.data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch meals");
    }
  };

  const addMeal = async () => {
    try {
      await axios.post(`https://c1b4-165-225-114-126.ngrok-free.app/api/user/activity/nutritionTracker/InsertIntake`, {
        UserID: UserID, // replace with actual user ID
        MealID: selectedMeal?.mealId,
    CuisineID:selectedCuisine?.CuisineId,
    FoodID:selectedFood?.foodId
      });
      alert("Meal added successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to add meals");
    }
  };
  const addCustomMeal = async () => {
    try {
      await axios.post(`https://c1b4-165-225-114-126.ngrok-free.app/api/user/activity/nutritionTracker/insertFood`, 
      {FoodName:selectedCustomFood?.name,
      Cal:selectedCustomFood?.calories,
      Carb:selectedCustomFood?.carbohydrates_total_g,
      Proteins:selectedCustomFood?.protein_g,
      Fats:selectedCustomFood?.fat_total_g,
      UserID:UserID,
      });
      Alert.alert("Meal added successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to add meals");
    }
  };

  const hanldeCustomFood=(food)=>{
    setSelectedCustomFood(food);
    setSelectedMeal();
    setSelectedCuisine();
    setSelectedFood();

  }

console.log(searchResult,'searcjResi;t length')

  return (
    <Screen  style={styles.container}>
      <TextField
      onChangeText={setSeearchQuery}
      label="Search Food"
      style={{
      width:"90%"}}/>
      
      {isLoading&&<ActivityIndicator />}
    {searchResult?.length>0&&<View>
      {searchResult.map((item,index)=>{return(
        <TouchableOpacity  key={item?.name} onPress={()=>hanldeCustomFood(item)} style={{padding:spacing.small,backgroundColor:colors.palette.secondary200}}>
          <Text text={item.name}/>
          </TouchableOpacity>
      )})}
      </View>}
      <Spacer size="medium"/>
      <Text style={styles.title}>Add Meal</Text>

      <Text style={styles.label}>Select Cuisine</Text>
      <FlatList
        data={cuisines}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedCuisine(item)} style={styles.item}>
            <Text style={styles.itemText}>{item.CuisineName}</Text>
          </TouchableOpacity>
        )}
      />

      {selectedCuisine && (
        <>
          <Text style={styles.label}>Select Food</Text>
          <FlatList
            data={foods}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setSelectedFood(item)} style={styles.item}>
                <Text style={styles.itemText}>{item.FoodName}</Text>
              </TouchableOpacity>
            )}
          />
        </>
      )}

      {selectedFood && (
        <>
          <Text style={styles.label}>Select Meal</Text>
          <FlatList
            data={meals}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setSelectedMeal(item)} style={styles.item}>
                <Text style={styles.itemText}>{item.mealType}</Text>
              </TouchableOpacity>
            )}
          />
        </>
      )}

      {selectedMeal && (
        <TouchableOpacity style={styles.addButton} onPress={addMeal}>
          <Text style={styles.buttonText}>Add Meal</Text>
        </TouchableOpacity>
      )}

{selectedCustomFood && (
        <View style={{backgroundColor:colors.palette.secondary200,padding:spacing.small,borderRadius:spacing.small,marginTop:spacing.small}}>
         <View style={{borderRadius:spacing.medium,backgroundColor:colors.palette.neutral100,width:spacing.medium}}>
         <DynamicIcon iconName="close" iconSize={spacing.medium} iconOnPress={()=>setSelectedCustomFood()}/>

         </View>
          <Text  preset="h2bold" style={[$globalTextStyles.center,styles.buttonText]}>{selectedCustomFood?.name?.toUpperCase()}</Text>
          <Text style={styles.buttonText}>Fats:{selectedCustomFood?.fat_total_g}</Text>
          <Text style={styles.buttonText}>Proteins:{selectedCustomFood?.protein_g}</Text>
          <Text style={styles.buttonText}>Carbs:{selectedCustomFood?.carbohydrates_total_g}</Text>

        </View>
      )}





{selectedCustomFood && (
        <TouchableOpacity style={styles.addButton} onPress={()=>addCustomMeal()}>
          <Text style={styles.buttonText}>Add Selected Food</Text>
        </TouchableOpacity>
      )}

    </Screen>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
