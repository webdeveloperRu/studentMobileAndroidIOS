// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {View, Text, Alert, StyleSheet} from 'react-native';
import {
  Thumbnail,
  ListItem,
  List,
  Left
} from 'native-base'
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CustomSidebarMenu = (props) => {
  return (
    <View style={stylesSidebar.sideMenuContainer}>
      <View style={stylesSidebar.profileHeader}>
        <List>
          <ListItem avatar>
            <Left>
              <Thumbnail source={require("../assets/images/profile.jpg")}  />
            </Left>
          </ListItem>
        </List>
        <Text style={stylesSidebar.profileHeaderText}>
          AboutReact
        </Text>
      </View>
      <DrawerContentScrollView {...props} >
        <DrawerItemList {...props} 
          labelStyle={{color: '#0099ff',}}
          itemStyle={stylesSidebar.sideMenuItem}
        />
        <DrawerItem
          label={({color}) => 
          <View style={{flex:1, flexDirection: "row"}}>
            <Icon name="logout" size={30} color="#0099ff" style={{marginRight: 30}}></Icon>
            <Text style={{color: '#0099ff', alignSelf: "center", fontSize: 15}}>
              Logout
            </Text>
          </View>
          }
          onPress={() => {
            props.navigation.toggleDrawer();
            Alert.alert(
              'Logout',
              'Are you sure? You want to logout?',
              [
                {
                  text: 'Cancel',
                  onPress: () => {
                    return null;
                  },
                },
                {
                  text: 'Confirm',
                  onPress: () => {
                    AsyncStorage.clear();
                    props.navigation.replace('Auth');
                  },
                },
              ],
              {cancelable: false},
            );
          }}
        />
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomSidebarMenu;

const stylesSidebar = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    color: 'black',

  },
  profileHeader: {
    paddingTop: 40,
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    padding: 15,
    textAlign: 'center',
  },
  profileHeaderText: {
    color: 'black',
    alignSelf: 'center',
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  sideMenuItem: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
  },
 
});