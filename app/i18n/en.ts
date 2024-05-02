const en = {
  common: {
    ok: "OK!",
    firstName:"First Name",
    lastName:"Last Name",
    skip:"Skip",
    cancel: "Cancel",
    confirm: "Confirm",
    apply: "Apply",
    location: "Location",
    back: "Back",
    login: "Login",
    join:'Join',
    email: "Email",
    username:"Username",
    password: "Password",
    healthCare: "Health Care",
    member: "Member",
    artist: "Artist",
    fullName:"Full Name",
    phoneNumber:"Phone Number",
    or: "or continue with",
    next: "Next",
    confirmAccountSetup: "Confirm Account Setup",
    loading: "Loading...",
    search: "Search",
    edit: "Edit",
    save: "Save",
    sampleEmail: "email@enail.com",
    end: "End",
    resubscribe: "Resubscribe",
    delete: "Delete",
    addCard: "Add Card",
    backToDashboard: "Back To Dashboard",
    success: "success",
    message: "Message",
    follow: "Follow",
    unfollow: "Unfollow",
    invite:"Invite",
    friends:"Friends",
    conversation:"Conversations",
    notifications:"Notifications"
  },

  placeholders: {
    email: "Enter email",
    relationWithSchool:"Relationship with school",
    password: "Enter password",
    name: "Full Name",
    businessName: "Business Name",
    location: "Location",
    bio: "Bio",
    artistCategories: "Artist Categories",
    experience: "Experience: What year did you start?",
    title: "Title",
    price: "Price ($)",
    description: "Description",
    duration: "Duration",
    serviceTag: "Service Tag",
    cancelWithin: "Cancel within...",
    charge: "$",
    search:'Search'
  },
  welcomeScreen: {
    postscript:
      "psst  — This probably isn't what your app looks like. (Unless your designer handed you these screens, and in that case, ship it!)",
    readyForLaunch: "Your app, almost ready for launch!",
    exciting: "(ohh, this is exciting!)",
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RESET APP",
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },
  // healthCare
  loggedInNavigator: {
    Home: "Home",
    Notifications: "Appointments",
    Jobs: "Jobs",
    Spaces: "Spaces",
    Menu:"Menu",
    People:"People"
  },
  auth: {
    signup: {
      join: "JOIN OUR\nCOMMUNITY",
      createAccountBelow: "Create Your Account Below.",
      signupEmail: "Sign Up With Email",
      signupFacebook: "Sign up with Facebook",
      alreadyHaveAccount: "Already have an account?",
      joinWithEmail: "Create an account",
      enterInformation:
        "Enter your email to sing up for this app",
      firstName: "First Name",
      lastName: "Last Name",
      mobileNumber: "Mobile Number",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      createAccount: "Create Account",
    },
    signIn: {
      getStarted: "Log In",
      signUpFacebook: "Sign up with Facebook",
      loginFacebook: "Login with Facebook",
      forgotPassword: "Forgot Password?",
      noAccount: "Don't have an account?",
      signUpNow: "Sign Up Now",
    },
    forgotPassword: {
      forgotpassword: "FORGOT YOUR\nPASSWORD?",
      enterEmail: "Enter the email associated with your account below.",
      resetPassword: "Reset Password",
      thankYou: "THANK YOU!",
      receiveEmail: "Please enter the OTP received in your email below.",
      backToLogin: "Back To Login",
      verifyOtp: "Verify OTP",
    },
    resetPassword: {
      Email:"Email",
      resetYourPassword: "RESET YOUR\nPASSWORD",
      create:
        "Please create a new password. Passwords must be at least 8 character long and include a special character.",
      newPassword: "New Password",
      confirmNewPassword: "Confirm New Password",
    OldPassword:"Old Password",
      confirm: "Confirm Password",
      success: "SUCCESS!\nYOUR PASSWORD\nHAS BEEN RESET.",
    },
  },


  changePassword: {
    title: "Change Password",
    disclaimer:
      "Please create a new password. Passwords must be at least 8 character long and include a special character.",
    currentPassword: "Current Password",
    newPassword: "New Password",
    confirmNewPassword: "Confirm New Password",
    logoutOnAll: "Log out account on all devices",
    successDisclaimer: "Your password has successfully been reset.",
    successButton: "Back To Account",
    success: "SUCCESS!",
  },
   notification:{
    noNotificationDesc:"You have currently no notifications. We will notify you when something new arrives",
    noNitificationTitle:"No notifications found"
   },
   message:{
    filterTitle:"Filter your conversations"
   },
   dashboard:{
    noFeedDesc:'Currently there is no feed',
    noFeedTitle:"No Feed Found"
   },
   space:{
    noSpaceDesc:'Currently there is no spaces',
    noSpaceTitle:"No Space Found"
   },
   people:{
    noPeopleDesc:'Currently there is no users',
    noPeopleTitle:"No People Found"
   },
   myprofile:{
    noPostTitle:'Currently there is no posts',
    noPostDesc:"No Posts Found"
   }


}

export default en
export type Translations = typeof en
