// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/
import 'react-native-gesture-handler';
// Import React and Component
import React from 'react';

// Import Navigators from React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Import Screens
import SplashScreen from './screens/SplashScreen';
import RegisterScreen from './screens/RegisterScreen';
import DrawerNavigatorRoutes from './screens/DrawerNavigationRoutes';
import LoginScreen from './screens/LoginScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import ViewLessonScreen from './screens/ViewLesson';
import CourseScreen from './screens/drawerScreens/Course';
import TwoFactorAuthScreen from './screens/TwoFactorAuthScreen';
const Stack = createStackNavigator();

const Auth = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TwoFactorAuthScreen"
        component={TwoFactorAuthScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" headerMode="none">
        {/* SplashScreen which will come once for 5 Seconds */}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{headerShown: false}}
        />
        {/* Auth Navigator: Include Login and Signup */}
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        {/* Navigation Drawer as a landing page */}
        <Stack.Screen
          name="DrawerNavigationRoutes"
          component={DrawerNavigatorRoutes}
          // Hiding header for Navigation Drawer
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ViewLessonScreen"
          component={ViewLessonScreen}
          options={{
            headerShown: false,
          }}

          // Hiding header for Navigation Drawer
        />
        <Stack.Screen
          name="CourseScreen"
          component={CourseScreen}
          // Hiding header for Navigation Drawer
          options={{
            headerShown: false,
            headerTitleContainerStyle: {
              color: 'white',
            },
            title: '',
            headerTitleStyle: {color: 'white'},
            headerStyle: {
              backgroundColor: '#0099ff',
            },
            headerTintColor: 'white',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
