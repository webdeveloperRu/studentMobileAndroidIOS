// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Thumbnail, ListItem, List, Left} from 'native-base';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import {store} from '../redux/store';
const CustomSidebarMenu = (props) => {
  const state = store.getState();

  return (
    <View style={stylesSidebar.sideMenuContainer}>
      <View style={stylesSidebar.profileHeader}>
        <List>
          <ListItem avatar>
            <Left>
              {state.user.data != null && state.user.data.avatar != null && (
                <Thumbnail source={{uri: state.user.data.avatar}} />
              )}
              {state.user.data != null && state.user.data.avatar == null && (
                <Thumbnail source={require('../assets/images/profile.png')} />
              )}
            </Left>
          </ListItem>
        </List>
        <Text style={stylesSidebar.profileHeaderText}>
          {state.user.data.name}
        </Text>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList
          {...props}
          labelStyle={stylesSidebar.drawerItemLabel}
          itemStyle={stylesSidebar.sideMenuItem}
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
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
  },
  drawerItemLabel: {
    color: '#0099ff',
  },
});
