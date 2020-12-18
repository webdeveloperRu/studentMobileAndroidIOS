// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React
import React from 'react';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

// Import Screens
import MyLibraryScreen from './drawerScreens/MyLibrary';
import CourseScreen from './drawerScreens/Course';
import SettingsScreen from './drawerScreens/SettingScreen';
import CustomSidebarMenu from '../components/CustomSidebarMenu';
import NavigationDrawerHeader from '../components//NavigationDrawerHeader';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DropDownMenu from '../components/DropDownMenu'
import { 
  TouchableOpacity , 
  View,
  StyleSheet } from 'react-native'
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const myLibraryScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="MyLibraryScreen">
      <Stack.Screen
        name="MyLibraryScreen"
        component={MyLibraryScreen}
        options={{
          title: 'Main', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerRight: () => (
            <View style={styles.myLibraryHeaderRightMenu}>
              <TouchableOpacity
              activeOpacity={0.7}
              style={{marginRight: 10,}}
              >
                <Icon name="search" size={25} color="white"></Icon>
              </TouchableOpacity>
              <DropDownMenu navigation={navigation}></DropDownMenu>
            </View>
          ),
          headerStyle: {
            backgroundColor: '#0099ff', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
        }}
      />
    </Stack.Navigator>
  );
};

const settingScreenStack = ({navigation:{ goBack }}) => {
  return (
    <Stack.Navigator
      initialRouteName="SettingsScreen"
      screenOptions={{
        headerLeft: () => (
          <TouchableOpacity onPress={ ()=>goBack()} >
            <Icon name="chevron-left"  size={40} color="white"/>
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: '#0099ff', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: 'Back to my library', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigatorRoutes = (props) => {
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false}}
      drawerContent={CustomSidebarMenu}>
      <Drawer.Screen
        name="myLibraryScreenStack"
        options={{
          drawerLabel: 'My Library',
          drawerIcon: () => (
            <Icon name="turned-in" size={30} color="#0099ff"></Icon>
          )
        }}
        component={myLibraryScreenStack}
      />
       <Drawer.Screen
        name="settingScreenStack"
        options={{
          drawerLabel: 'Settings',
          drawerIcon: () => (
            <Icon name="settings" size={30} color="#0099ff"></Icon>
          )
        }}
        component={settingScreenStack}
      />
    </Drawer.Navigator>
    
  );
};
const styles = StyleSheet.create({
  myLibraryHeaderRightMenu: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,

  }
  
});


export default DrawerNavigatorRoutes;