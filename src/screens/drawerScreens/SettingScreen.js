// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React,{Component}  from 'react';
import {View, Text, SafeAreaView,StyleSheet, TouchableOpacity} from 'react-native';
import {
  Container,
  Content,
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
  TabHeading,
  } from 'native-base';
  import {connect} from 'react-redux';
  import timezone from '../../data/timezone';
  import Icon from 'react-native-vector-icons/Feather';
  import DropDownPicker from 'react-native-dropdown-picker';
  import {APIService} from '../../service';
  import Toast from 'react-native-tiny-toast';
  import ImagePicker from 'react-native-image-crop-picker';
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
      avatar: null,
      avatar_url: "",
    };
    this.navigation = props.navigation;   
    this.controller; 
    
  }  
 
  componentDidMount() {
    this.setState({fullname: this.props.user.data.name, email: this.props.user.data.email, timezone: timezone.time_zones,selectedTimezone: this.props.user.data.time_zone, avatar_url: this.props.user.data.avatar})
  }
  changePassword=()=>{
    let password={
      current_password: this.state.currentPassword,
      new_password: this.state.newPassword,
      verify_password: this.state.confirmPassword,
    }
    APIService.changePassword(password, this.props.user.token)
    .then( res=>res.json())
    .then(res=>{
      if(res.success==true) {
        Toast.showSuccess('Password successfully changed!', 
        {
          containerStyle: {
            backgroundColor: "rgba(0, 120, 0, 0.8)"
          }
        })
      } else{
        Toast.show(res.message, {
          // position: Toast.position.center,
          position: 0,
          containerStyle:{            
            backgroundColor: "rgba(255, 52, 0, 0.8)",
            width: "60%",
            height: 80,
          },
          textStyle: {
            color: "white",
            fontSize: 18,
          },
          mask: true,
        })
      }
    })

  }
  selectAvatar=()=>{
    ImagePicker.openPicker({
      width: 100,
      height: 100,
      cropping: true
    }).then(image => {
      this.setState({avatar: image})
      this.setState({avatar_url: image.path})
    });
  }

  removeAvatar=()=>{
    APIService.removeAvatar(this.props.user.token)
    .then(res=>res.json())
    .then(res=>{
      console.log(res);
    })
  }
  saveProfile=()=> {
    let user={
      email: this.state.email,
      name: this.state.fullname,
      time_zone: this.state.selectedTimezone,
      avatar: this.state.avatar,
    }
    APIService.saveProfile(user, this.props.user.token)
    .then(res=>res.json())
    .then(res=>{
      Toast.showSuccess('Profile successfully updated!', 
      {
        containerStyle: {
          backgroundColor: "rgba(0, 120, 0, 0.8)"
        }
      })
    })
  }
  render() {
    const userImage = this.state.avatar_url == null? require('../../assets/images/profile.png'): {uri: this.state.avatar_url}
    return (
      <Container style={styles.container}> 
      <Content>
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
            <Thumbnail source={userImage} style={styles.avatarThumbnail}/>
              {/* {this.getAvatar() !=-1 && this.getAvatar() ==null && <Thumbnail source={require('../../assets/images/profile.png')} style={styles.avatarThumbnail}/>}
              {this.getAvatar() !=-1 && this.getAvatar() !=null && <Thumbnail source={{uri: this.state.avatar_url}} style={styles.avatarThumbnail}/>} */}
              <View style={styles.selectAvatarForm}>
                <Text style={styles.recommendAvatarText}>Recommended dimensions of 100 × 100</Text>
                <TouchableOpacity  onPress={this.selectAvatar}>
                  <View style={styles.selectAvatarButton}>
                    <Text style={{color: "blue"}}>Select Image</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity  style={styles.removeAvatarButton} onPress={this.removeAvatar}>
                  <Text style={{color:"red"}}>Remove Image</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Button style={styles.saveProfilebutton} onPress={this.saveProfile} >
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
            <Button style={styles.changePasswordButton} onPress={this.changePassword}>
              <Text style={{fontSize:16, color:"white"}}>Change Password</Text>
            </Button>
         </View>
        </Tab>
      </Tabs>
      </Content>       
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