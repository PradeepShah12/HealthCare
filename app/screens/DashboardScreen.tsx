import React, { FC, useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { StyleSheet, View, FlatList, TouchableOpacity, ViewStyle, TextStyle, Alert, Keyboard } from "react-native";
import { AppStackScreenProps, navigate } from "app/navigators";
import { Screen, Text, Button, Spacer, TextField } from "app/components";
import { $globalViewStyles, colors, spacing, typography } from "app/theme";
import StepTracker from "app/components/StepTracker";
import * as Yup from "yup"
import SleepTracker from "app/components/SleeepTracker";
import { DynamicIcon } from "app/components/DynamicIcon";
import { LinearGradient } from "expo-linear-gradient";
import { calculateRelativeHeight, calculateRelativeWidth } from "app/utils/calculateRelativeDimensions";
import { useAppDispatch, useAppSelector } from "app/store";
import { Card } from "@rneui/base";
import { Modalize } from "react-native-modalize";
import { $globalTextStyles } from "app/theme/styles";
import { useMutation } from "@tanstack/react-query";
import { setError } from "app/store/Error/error.slice";
import { AuthService } from "app/services/api/Auth/auth.api";
import { setUser } from "app/store/User/user.slice";
import { Formik } from "formik";

interface ActivityItem {
  id: string;
  title: string;
  duration: string;
  type: string;
}

interface DashboardScreenProps extends AppStackScreenProps<"Dashboard"> { }
const Actions = [
  { name: "Body Measurement Index", id: '10', icon: "body", navigationKey: "BodyMeasurement", isSubs: false },
  { name: "Nutrition Tracker", id: '3', icon: "nutrition", navigationKey: "NutrititonTracker", isSubs: false },

  { name: "Hydration Reminder", id: '2', icon: "alarm", navigationKey: "WaterReminder", isSubs: false },
  { name: "Steps Taken", id: '11', icon: "walk", navigationKey: "StepTracker", isSubs: false },
  { name: "Sleep Tracker", id: '12', icon: "moon", navigationKey: "SleepTracker", isSubs: true },
  { name: "Swimming Tracker", id: '1', icon: "water", navigationKey: "SwimmingTracker", isSubs: true },

  { name: "Workout Monitoring", id: '4', icon: "fitness", navigationKey: "WorkOut", isSubs: true },
  { name: "Heartbeat Monitoring", id: '6', icon: "heart", navigationKey: "HeartRateMonitor", isSubs: true },
  { name: "Health & Fitness Blog", id: '7', icon: "newspaper", navigationKey: "HealthFitnessBlog", isSubs: true },
  { name: "Customizable workout plan", id: '8', icon: "options", navigationKey: "CustomWorkoutDietPlan", isSubs: true },
  { name: "Oxygen Monitoring", id: '9', icon: "pulse", navigationKey: "OxygenMonitor", isSubs: true },
];



export const DashboardScreen: FC<DashboardScreenProps> = observer(function DashboardScreen() {

  const { user } = useAppSelector(state => state.user)
  const modalRef = useRef<Modalize>(null)
  const dispatch = useAppDispatch()

  const { mutate: subscribe } = useMutation({
    mutationFn: (body: any) => AuthService.subscribe(body),
    onSuccess: (response: any) => {
      // perform other side effects on success - save tokens
      console.log(response, 'user login response')
      dispatch(setUser({ user: { ...user, IsSubscribed: true } }))
      modalRef?.current?.close()
    },
    onError: (error: any) => {
      // dispatch(userLogin({isAuthenticated:true,token:'sampletoken'}))

      dispatch(
        setError({ isSnackBarVisible: true, errorMessage: error.response.data?.error?.message }),
      )
    },
  })




  const handleSubscription = () => {
    modalRef.current?.open()
  }
  const initialValues: InitialValues = {
    cardNumber: "",
    CVC: "",
    Expiry: ""
  }
  const validation = Yup.object().shape({
    cardNumber: Yup.string().required("Card  name is required"),
    CVC: Yup.string().required("CVC is required"),
    Expiry: Yup.string().required("Expiry is required"),

  })
  console.log(user, 'user id')
  return (
    <Screen style={styles.root} preset="scroll" StatusBarProps={{ backgroundColor: "red", networkActivityIndicatorVisible: true }}>

      <Modalize
        withReactModal
        ref={modalRef}
        reactModalProps={{

        }}
        modalHeight={400}
        modalStyle={{ backgroundColor: colors.palette.neutral300 }}
        childrenStyle={{ width: '90%', alignSelf: 'center', }}
      >

        <Spacer size="medium" />

        <Text preset="h3" text="Make A Payment" style={$globalTextStyles.center} />
        <Spacer size="small" />
        <Formik
          initialValues={initialValues}
          onSubmit={(values:any) => {
            Keyboard.dismiss()
           
            subscribe({UserID:user?.UserID,IsSubscribed:true})





          }}
          validationSchema={validation}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ handleChange, handleBlur, values, errors, submitForm }) => (
           <View>

        <TextField
        label="Card Number"
        placeholder="1231-12312-12-123"
        value={values.cardNumber}
        onChangeText={handleChange("cardNumber")}
        status={errors.cardNumber ? "error" : null}
        helper={errors.cardNumber}
        onBlur={handleBlur("cardNumber")}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{borderWidth:1,backgroundColor:colors.palette.neutral200trans}}/>
      
<Spacer size="small"/>


<TextField
        label="CVC Number"
        placeholder="XXX"
        value={values.CVC}
        onChangeText={handleChange("CVC")}
        status={errors.CVC ? "error" : null}
        helper={errors.CVC}
        onBlur={handleBlur("CVC")}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{borderWidth:1,backgroundColor:colors.palette.neutral200trans}}/>
        <Spacer size="small"/>


<TextField
        label="Expiry"
        placeholder="YYYY-MM-DD"
        value={values.Expiry}
        onChangeText={handleChange("Expiry")}
        status={errors.Expiry ? "error" : null}
        helper={errors.Expiry}
        onBlur={handleBlur("Expiry")}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{borderWidth:1,backgroundColor:colors.palette.neutral200trans}}/>

<Spacer size="small"/>

<Button text="Confirm" preset="filled" onPress={submitForm}/>
</View>
 )}
          </Formik>

      </Modalize>





      <Spacer size="small" />

      {!user?.IsSubscribed && <>

        <View style={{ padding: spacing.small, backgroundColor: colors.error, borderRadius: spacing.small }}>
          <Text preset="h2" text="You are currently not subscribed, Please subscribe to access all features" />
          <Spacer size="small" />
          <Button text="Subscribe" onPress={() => handleSubscription()} />
        </View>
        <Spacer size="small" />
      </>
      }

      <View style={$listContainerStyle}>


        {Actions.map((item, index) => {
          return (
            <TouchableOpacity key={item.id} disabled={item.isSubs && !user?.IsSubscribed} onPress={() => navigate(item.navigationKey, { monitor: item?.name == "Workout Monitoring" ? true : false })} >

              <LinearGradient  // Background Linear Gradient
                colors={['rgba(0,0,0,0.4)', 'transparent']}
                start={[0.1, 0]}
                end={[0, 1]}
                style={[styles.card, item.isSubs && !user?.IsSubscribed && { backgroundColor: 'grey' }]}>

                <Text text={item.name} preset="h3bold" style={$titleStyle} />
                <DynamicIcon iconName={item.icon} iconSize={calculateRelativeHeight(50)} iconColor={colors.palette.neutral100} />
              </LinearGradient>
            </TouchableOpacity>

          )
        })}
      </View>





      {/* <View style={[styles.card, styles.activityContainer,]}>
        <Text style={styles.cardTitle}>Recent Activity</Text>
        <FlatList
          data={dummyActivityData}
          renderItem={({ item }) => (
            <View style={styles.activityItem}>
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>{item.title}</Text>
                <Text>{item.duration}</Text>
              </View>
              <Text style={styles.activityType}>{item.type}</Text>
            </View>
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.activityList}
        />
        <Button text="View All" onPress={() => console.log("View All pressed")} />
      </View> */}
    </Screen>
  );
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    paddingHorizontal: spacing.medium,
    marginTop: spacing.medium,
  },
  card: {
    borderRadius: 8,
    marginBottom: spacing.medium,
    paddingVertical: spacing.extraMedium,
    paddingHorizontal: spacing.small,
    width: calculateRelativeWidth(160),

    height: calculateRelativeHeight(150),
    backgroundColor: '#6b99f5',
    alignItems: 'center',
    justifyContent: 'space-evenly'

  },
  cardTitle: {
    fontSize: spacing.large,
    fontWeight: "bold",
    marginBottom: spacing.medium,
  },
  activityContainer: {
    // backgroundColor: colors.palette.neutral100,
    // paddingHorizontal: spacing.medium,
    paddingVertical: spacing.medium,
    // marginHorizontal: spacing.medium,
  },
  activityList: {
    flexGrow: 1,
    marginBottom: spacing.medium,
  },
  activityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.small,
  },
  activityInfo: {
    flex: 1,
    marginRight: spacing.small,
  },
  activityTitle: {
    fontWeight: "bold",
    marginBottom: spacing.extraSmall,
  },
  activityType: {
    color: colors.textLight,
  },
});

export default DashboardScreen;


const $listContainerStyle: ViewStyle = { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }

const $titleStyle: TextStyle = {
  color: colors.palette.neutral100
}