
// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/
import 'react-native-gesture-handler';
import { Root } from "native-base";
// Import React and Component
import React from 'react';

// Import Navigators from React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import Screens
import SplashScreen from './screens/SplashScreen';
import RegisterScreen from './screens/RegisterScreen';
import ViewLessonScreen from './screens/ViewLesson'
import CourseScreen from './screens/drawerScreens/Course'
import MyLibraryScreen from './screens/drawerScreens/MyLibrary'
import SettingScreen from './screens/drawerScreens/SettingScreen'
import DrawerNavigationRoutes from './screens/DrawerNavigationRoutes';
import LoginScreen from './screens/LoginScreen'

const Stack = createStackNavigator();

const Auth = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <Root>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
          {/* SplashScreen which will come once for 5 Seconds */}
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            // Hiding header for Splash Screen
            options={{ headerShown: false }}
          />
          {/* Auth Navigator: Include Login and Signup */}
          <Stack.Screen
            name="Auth"
            component={Auth}
            options={{ headerShown: false }}
          />
          {/* Navigation Drawer as a landing page */}
          <Stack.Screen
            name="DrawerNavigationRoutes"
            component={DrawerNavigationRoutes}

            // Hiding header for Navigation Drawer
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ViewLessonScreen"
            component={ViewLessonScreen}

            // Hiding header for Navigation Drawer
            options={{
              headerShown: true,
              title: "",
              headerStyle: {
                height: 40,
                backgroundColor: "#008fd6",
              },
            }}
          />
          <Stack.Screen
            name="CourseScreen"
            component={CourseScreen}

            // Hiding header for Navigation Drawer
            options={{
              headerShown: true,
              title: "",
              headerStyle: {
                height: 40,
                backgroundColor: "#008fd6",
              },
            }}
          />
          <Stack.Screen
            name="SettingScreen"
            component={SettingScreen}

            // Hiding header for Navigation Drawer
            options={{
              headerShown: true,
              title: "",
              headerStyle: {
                height: 40,
                backgroundColor: "#008fd6",
              },
            }}
          />
          <Stack.Screen
            name="MyLibraryScreen"
            component={MyLibraryScreen}

            // Hiding header for Navigation Drawer
            options={{
              headerShown: true,
              title: "",
              headerStyle: {
                height: 40,
                backgroundColor: "#008fd6",
              },
            }}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}

            // Hiding header for Navigation Drawer
            options={{
              headerShown: false,
              title: "",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Root>
  );
};

export default App;