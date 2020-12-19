import React, {Component}from 'react';

import { View, Text, Alert } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import {  TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import {store} from '../redux/store';
import * as libraryActions from '../redux/actions/libraryActions';
import * as userActions from '../redux/actions/userActions';

class DropdownMenu extends Component {

  _menu = null;
  setMenuRef = ref => {
    this._menu = ref;
  };
  showMenu = () =>{
    this._menu.show();
  }

  gotoSettings = (navigation) => {
    this._menu.hide();
    navigation.navigate('settingScreenStack')
  };

  logOut = (navigation) => {
    this._menu.hide();
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
            store.dispatch(libraryActions.clearAll());
            store.dispatch(userActions.logOut());
            navigation.replace('Auth');
          },
        },
      ],
      {cancelable: false},
    );

  };

  render() {
    return (
      <View >
        <Menu
          ref={this.setMenuRef}
          button={
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={this.showMenu}
              >
              <Icon name="more-vert" size={25} color="white"></Icon>
            </TouchableOpacity>
          }
        >
          <MenuItem
            onPress={()=>{this.gotoSettings(this.props.navigation)}}
            >
              <View style={{alignItems:"center",flexDirection: "row"}}>
                <Icon name="settings" size={20} color="#0099ff" ></Icon>
                <Text style={{color: "#0099ff", marginLeft:10,}}> Settings</Text>
              </View>
          </MenuItem>
          <MenuDivider />
          <MenuItem onPress={()=>{this.logOut(this.props.navigation)}}>
            <View style={{alignItems:"center",flexDirection: "row"}}>
              <Icon name="logout" size={20} color="#0099ff"></Icon>
              <Text style={{color: "#0099ff", marginLeft:10,}}>Log out</Text>
            </View>
          </MenuItem>
        </Menu>
      </View>
    );
  }
}

export default DropdownMenu;