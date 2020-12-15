// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React,{Component}  from 'react';
import {View, Text, SafeAreaView,StyleSheet, TouchableOpacity} from 'react-native';
import {
  Container,
  Button, 
  Body, 
  Header, 
  Left,
  Right,
  Title,
  Thumbnail,
  Input,
  Card,
  CardItem,
  Item,
  Tab,
  Tabs,
  ScrollableTab,
  TabHeading 
  } from 'native-base';
  import {connect} from 'react-redux';
  import timezone from '../../data/timezone';
  import Icon from 'react-native-vector-icons/Feather';
  import DropDownPicker from 'react-native-dropdown-picker';
  
class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      isLoading: false,
      fullname: "",
      email: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      selectedTimezone: "",
      timezone: [],
    
      
    };
    this.navigation = props.navigation;   
    this.controller; 
    
  }  
 
  componentDidMount() {
    
    this.setState({fullname: this.props.user.data.name, email: this.props.user.data.email, timezone: timezone.time_zones, selectedTimezone: this.props.user.data.time_zone})
  }
  render() {
    return (
      <Container style={styles.container}>        
       <Tabs renderTabBar={()=> <ScrollableTab />} tabBarBackgroundColor= 'white' tabBarUnderlineStyle={{ backgroundColor: '#0099ff' }}>
        <Tab heading="Profile Setting" tabStyle={{backgroundColor: 'white'}} textStyle={{color: 'grey'}} activeTabStyle={{backgroundColor: 'white'}} activeTextStyle={{color: '#0099ff', fontWeight: 'normal'}}>
          <Text style={styles.profileText}>Profile Settings</Text>
          <View style={styles.profileContainer}>
            <Text style={styles.fullnameText}>
                Full Name
            </Text>
            <Item regular style={styles.fullnameInput}>
              <Input 
                onChangeText={(fullname) => {
                  this.setState({fullname: fullname});
                }}
                value={this.state.fullname}
              />
            </Item>

            <Text style={styles.fullnameText}>
                E-mail
            </Text>             
            <Item regular style={styles.fullnameInput}>
              <Input 
                onChangeText={(email) => {
                  this.setState({email: email});
                }}
                value={this.state.email}
              />
            </Item>

            <Text style={styles.fullnameText}>
                Time Zone
            </Text>               
            <DropDownPicker
                items={this.state.timezone}
                defaultValue={this.state.selectedTimezone}
                containerStyle={{height: 40}}
                style={{backgroundColor: '#fafafa'}}
                itemStyle={{
                  justifyContent: 'flex-start'
                }}
                searchable={true}
                searchablePlaceholder="Search for an item"
                searchablePlaceholderTextColor="gray"
                seachableStyle={{}}
                searchableError={() => <Text>Not Found</Text>}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                onChangeItem={item => this.setState({
                  selectedTimezone: item.value
                })}
            />
            <Text style={styles.avatarText}> Avatar</Text>
            <View style={styles.avatarContainer}>
              {/* <Thumbnail source={{uri:this.props.user.avatar}} style={styles.avatarThumbnail}/> */}
              <Thumbnail source={require('../../assets/images/profile.jpg')} style={styles.avatarThumbnail}/>
              <View style={styles.selectAvatarForm}>
                <Text style={styles.recommendAvatarText}>Recommended dimensions of 100 × 100</Text>
                <TouchableOpacity >
                  <View style={styles.selectAvatarButton}>
                    <Text style={{color: "blue"}}>Select Image</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity  style={styles.removeAvatarButton}>
                  <Text style={{color:"red"}}>Remove Image</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Button style={styles.saveProfilebutton}>
              <Text style={{fontSize:16, color:"white"}}>Save</Text>
            </Button>
          </View>
        </Tab>
        <Tab heading="Change Password"  tabStyle={{backgroundColor: 'white'}} textStyle={{color: 'grey'}} activeTabStyle={{backgroundColor: 'white'}} activeTextStyle={{color: '#0099ff', fontWeight: 'normal'}}>
        <Text style={styles.profileText}>Change Password</Text>
          <View style={styles.profileContainer}>
            <Text style={styles.fullnameText}>
                Current Password
            </Text>
            <Item regular style={styles.fullnameInput}>
              <Input 
                secureTextEntry={true}
                onChangeText={(currentPassword) => {
                  this.setState({currentPassword: currentPassword});
                }}
                value={this.state.currentPassword}
              />
            </Item>

            <Text style={styles.fullnameText}>
              New Password
            </Text>             
            <Item regular style={styles.fullnameInput}>
              <Input 
                secureTextEntry={true}
                onChangeText={(newPassword) => {
                  this.setState({newPassword: newPassword});
                }}
                value={this.state.newPassword}
              />
            </Item>


            <Text style={styles.fullnameText}>
              Confirm Password
            </Text>             
            <Item regular style={styles.fullnameInput}>
              <Input 
                secureTextEntry={true}
                onChangeText={(confirmPassword) => {
                  this.setState({confirmPassword: confirmPassword});
                }}
                value={this.state.confirmPassword}
              />
            </Item>
            <Button style={styles.changePasswordButton}>
              <Text style={{fontSize:16, color:"white"}}>Change Password</Text>
            </Button>
         </View>
        </Tab>
      </Tabs>
    </Container>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : "#f3f3f3",

  },
  profileContainer: {
    backgroundColor: "white",
    borderWidth : 1,
    borderColor : "#dddddd",
    margin:10,
    padding: 10,
  },
  profileText: {
    marginTop :30,
    margin: 10,
    fontSize: 25,
  },
  fullnameText: {
    marginLeft: 10,
    marginBottom: 10,
    fontSize: 14

  },
  fullnameInput: {
    height: 40,
    borderColor: "#bbbbbb",
    borderWidth: 2,
    borderRadius: 5,
    paddingLeft: 15,
    marginBottom: 25,
  },
  avatarText: {
    marginTop: 30,
    marginBottom: 10,
    fontSize: 16,
  },
  avatarContainer: {
    flexDirection : 'row',
    alignItems : "center",
    padding: 10,
  },
  avatarThumbnail: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  recommendAvatarText :{
    marginBottom: 10,

  },
  selectAvatarButton: {
    borderRadius: 5,
    width:  150,
    height : 40,
    borderWidth: 1,
    borderColor: "blue",
    alignItems :'center',
    justifyContent :"center"
  },
  removeAvatarButton: {
    borderRadius: 5,
    justifyContent :"center",
    alignItems :'center',
    width:  150,
    height : 40,
    borderColor: "blue",
  },
  selectAvatarForm: {
    flex:1,
    marginHorizontal:20,
    flexDirection :"column"
  },
  saveProfilebutton: {
    width : "100%",
    justifyContent : "center",
    borderRadius: 2,
    backgroundColor: "#0099ff"

  },
  changePasswordButton: {
    width : "100%",
    justifyContent : "center",
    borderRadius: 2,
    backgroundColor: "#0099ff"

  }
})
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(SettingsScreen);