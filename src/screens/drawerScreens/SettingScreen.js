// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React,{Component,createRef}  from 'react';
import {View, Text, SafeAreaView,StyleSheet, TouchableOpacity,Image,TextInput } from 'react-native';
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
  Card,
  CardItem,
  Item,
  Input,
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
import { ScrollView } from 'react-native-gesture-handler';

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
      qrcodeUrl: '',
      twofaKey: "",
      otpCode1: "",
      otpCode2: "",
      otpCode3: "",
      otpCode4: "",
      otpCode5: "",
      otpCode6: "",
      currentInput: 1,
      disableTwofa: false,
    };
    this.navigation = props.navigation;   
    this.otpCodeRef1=React.createRef();
    this.otpCodeRef2=React.createRef();
    this.otpCodeRef3=React.createRef();
    this.otpCodeRef4=React.createRef();
    this.otpCodeRef5=React.createRef();
    this.otpCodeRef6=React.createRef();
    this.controller; 
    if(props.user.data.twoFALoggedin) 
      this.setState({disableTwofa: true}) 
    else
      this.setState({disableTwofa: false}) 
  }
  componentDidMount() {
    APIService.getTwofaKey(this.props.user.token)
    .then( res=>res.json())
    .then(res=>{
      if(res.twoFAKey !=''){
        const fullUrl = 'https://chart.googleapis.com/chart?cht=qr&chs=' + 400 + 'x' + 400 + "&chl=" +  encodeURIComponent(this.state.twofaKey)
        this.setState({twofaKey: res.twoFAKey, qrcodeUrl: fullUrl})
      }    
    })
    this.showSettings();
  }
  backNavigationInput=(event, inputNo)=>{
     if(event.key=="Backspace"){

      switch (inputNo) {
        case 6:
          if(this.state.otpCode6==''){
            this.otpCodeRef5.focus();
            this.setState({otpCode5:''})
          }
          break;
        case 5:
          if(this.state.otpCode5==''){
            this.otpCodeRef4.focus();
            this.setState({otpCode4:''})
          }
          break;
        case 4:
          if(this.state.otpCode4==''){
            this.otpCodeRef3.focus();
            this.setState({otpCode3:''})
          }
          break;
        case 3:
          if(this.state.otpCode3==''){
            this.otpCodeRef2.focus();
            this.setState({otpCode2:''})
          }
          break;
        case 2:
          if(this.state.otpCode2==''){
            this.otpCodeRef1.focus();
            this.setState({otpCode1:''})
          }
          break;
        
        default:
          break;
      }
    }
  }
  navigateNextInput=(otpCode, inputNo)=>{
    switch (inputNo) {
      case 1:
        if(otpCode!=''){
          this.setState({currentInput: 2})
          this.otpCodeRef2.focus();
        }
        break;
      case 2:
        if(otpCode!=''){
          this.setState({currentInput: 3})
          this.otpCodeRef3.focus();
        }
        break;
      case 3:
        if(otpCode!=''){
          this.setState({currentInput: 4})
          this.otpCodeRef4.focus();
        }
        break;
      case 4:
        if(otpCode!=''){
          this.setState({currentInput: 5})
          this.otpCodeRef5.focus();
        }
        break;
      case 5:
        if(otpCode!=''){
          this.setState({currentInput: 6})
          this.otpCodeRef6.focus();
        }
        break;
      default:
        break;
    }
   
  }
  searchCurrentInput = () =>  {
    if(this.state.otpCode1 =='')  {
      this.otpCodeRef1.focus();
      return;
    }
    if(this.state.otpCode2 =='')  {
      this.otpCodeRef2.focus();
      return;
    }
    if(this.state.otpCode3 =='')  {
      this.otpCodeRef3.focus();
      return;
    }
    if(this.state.otpCode4 =='')  {
      this.otpCodeRef4.focus();
      return;
    }
    if(this.state.otpCode5 =='')  {
      this.otpCodeRef5.focus();
      return;
    }
    if(this.state.otpCode6 =='')  {
      this.otpCodeRef6.focus();
      return;
    }
  }
  disableTwofa =()=>{
    const otpCode = this.state.otpCode1 + this.state.otpCode2 + this.state.otpCode3 + this.state.otpCode4 + this.state.otpCode5 + this.state.otpCode6;
    APIService.disableTwoFaKey(otpCode,this.props.user.token)
    .then( res=>res.json())
    .then(res=>{
      this.setState({otpCode1: '', otpCode2: '',otpCode3: '', otpCode4: '',otpCode5: '', otpCode6: ''})
      if(res.success!=undefined){
        if(this.state.disableTwofa)
          this.setState({disableTwofa: false}) 
        else
          this.setState({disableTwofa: true}) 
        Toast.showSuccess('Disable Two Factor Success!',
        {
          containerStyle: {
            backgroundColor: "rgba(0, 120, 0, 0.8)"
          }
        })
      } else{
        Toast.show(res.message, {
          position: 0,
          containerStyle:{  
            padding:30,          
          },
          textStyle: {
            fontSize: 18,
          },
          mask: true,
        })
      }
    })
  }
  setupTwofaKey =()=> {
    const otpCode = this.state.otpCode1 + this.state.otpCode2 + this.state.otpCode3 + this.state.otpCode4 + this.state.otpCode5 + this.state.otpCode6;
    APIService.setTwofaKey(otpCode, this.props.user.token)
    .then( res=>res.json())
    .then(res=>{
      this.setState({otpCode1: '', otpCode2: '',otpCode3: '', otpCode4: '',otpCode5: '', otpCode6: ''})
      if(res.success!=undefined){
        if(this.state.disableTwofa)
          this.setState({disableTwofa: false}) 
        else
          this.setState({disableTwofa: true}) 
        Toast.showSuccess('Setup Two Factor Success!',
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
            padding:30,          
          },
          textStyle: {
            fontSize: 18,
          },
          mask: true,
        })
      }
    })
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
  showSettings=()=> {
    APIService.getSettings(this.props.user.token)
    .then(res=>res.json())
    .then(res=>{
      this.setState({fullname: res.name, email: res.email, timezone: timezone.time_zones,selectedTimezone: res.time_zone, avatar_url: res.avatar});        
    }) 
  }
 

  removeAvatar=()=>{
    APIService.removeAvatar(this.props.user.token)
    .then(res=>res.json())
    .then(res=>{
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
      if(res.email!=undefined) {
        Toast.showSuccess('Profile successfully updated!', 
        {
          containerStyle: {
            backgroundColor: "rgba(0, 120, 0, 0.8)"
          }
        })
        this.showSettings();
      } else {
        Toast.show(res.message, {
          position: 0,
          containerStyle:{            
            padding: 20,
          },
          textStyle: {
            fontSize: 18,
          },
        })
      }
    })
  }
  render() {
    const userImage = this.state.avatar_url == null? require('../../assets/images/profile.png'): {uri: this.state.avatar_url}
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
        <Tab heading="Two Factor Setup"  tabStyle={{backgroundColor: 'white'}} textStyle={{color: 'grey'}} activeTabStyle={{backgroundColor: 'white'}} activeTextStyle={{color: '#0099ff', fontWeight: 'normal'}}>
          <ScrollView>
            <Text style={styles.profileText}>Two Factor Authentication</Text>
            <Text style={styles.followStepText}>Follow these step to login with extra security</Text>
            <View >
              <View style={styles.stepTitleLayout}>
                <Text style={styles.circleNumber}>1</Text>
                <Text style={styles.firstStepTitle}>Install a Two-Factor Authentication app on your phone</Text>
              </View>
              <View style={styles.firstStepBodyLayout}>
                <Text style={styles.installAuthAppDescription}>Get the Google Authenticator app from App Store for iOS or Google Play for Android.</Text>
                <View style={styles.appStoreLayout}>
                  <TouchableOpacity>
                    <Image
                        style={styles.appStoreImage}
                        source={require('../../assets/images/google-play-badge.png')}
                      />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                        style={styles.appStoreImage}
                        source={require('../../assets/images/app-store-badge.png')}
                      />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.stepTitleLayout}>
                <Text style={styles.circleNumber}>2</Text>
                <Text style={styles.firstStepTitle}>Open the app and scan the QR code below.</Text>
              </View>
              <View style={styles.stepBodyLayout}>              
                <View style={styles.qrCodeLayout}>
                  <Image
                      style={styles.qrCodeImage}
                      source={{uri:this.state.qrcodeUrl}}
                    />
                  <Text style={{fontSize: 20, textAlign: "center"}}>Use manual entry key</Text>
                  <Text style={styles.twofaKeyText}>{this.state.twofaKey}</Text>
                  <TouchableOpacity>
                    <Text style={styles.clickToCopy}>click to copy</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
           
            <View style={styles.stepTitleLayout}>
              <Text style={styles.circleNumber}>3</Text>
              <Text style={styles.firstStepTitle}>Enter the 6 numbers displayed in the Authenticator App in the boxes below.</Text>
            </View>
           
            <View style={{marginVertical:10, marginHorizontal:20,flexDirection: "row", justifyContent:"space-between"}}>
              <TextInput
                style={styles.inputOtpCode}
                value={this.state.otpCode1}
                ref={input=>this.otpCodeRef1=input}
                maxLength={1}
                onFocus={ () => this.searchCurrentInput()}
                // onKeyPress={({ nativeEvent }) => this.backNavigationInput(nativeEvent, 1)}
                keyboardType="numeric"
                onChangeText={(otpCode1) => {
                  this.setState({otpCode1: otpCode1});
                  this.navigateNextInput(otpCode1, 1)
                }}
              />
              <TextInput
                style={styles.inputOtpCode}
                value={this.state.otpCode2}
                onFocus={ () => this.searchCurrentInput()}
                ref={input=>this.otpCodeRef2=input}
                maxLength={1}
                keyboardType="numeric"
                onKeyPress={({ nativeEvent }) => this.backNavigationInput(nativeEvent,2)}
                onChangeText={(otpCode2) => {
                  this.setState({otpCode2: otpCode2});
                  this.navigateNextInput(otpCode2, 2)
                }}
              />
              <TextInput
                style={styles.inputOtpCode}
                value={this.state.otpCode3}
                onKeyPress={({ nativeEvent }) => this.backNavigationInput(nativeEvent,3)}
                onFocus={ () => this.searchCurrentInput()}
                ref={input=>this.otpCodeRef3=input}
                maxLength={1}
                keyboardType="numeric"
                onChangeText={(otpCode3) => {
                  this.navigateNextInput(otpCode3, 3)
                  this.setState({otpCode3: otpCode3});
                }}
              />
              <TextInput
                style={styles.inputOtpCode}
                value={this.state.otpCode4}
                onKeyPress={({ nativeEvent }) => this.backNavigationInput(nativeEvent,4)}
                onFocus={ () => this.searchCurrentInput()}
                ref={input=>this.otpCodeRef4=input}
                maxLength={1}
                keyboardType="numeric"
                onChangeText={(otpCode4) => {
                  this.setState({otpCode4: otpCode4});
                  this.navigateNextInput(otpCode4, 4)
                }}
              />
              <TextInput
                style={styles.inputOtpCode}
                value={this.state.otpCode5}
                onKeyPress={({ nativeEvent }) => this.backNavigationInput(nativeEvent,5)}
                onFocus={ () => this.searchCurrentInput()}
                ref={input=>this.otpCodeRef5=input}
                maxLength={1}
                keyboardType="numeric"
                onChangeText={(otpCode5) => {
                  this.setState({otpCode5: otpCode5});
                  this.navigateNextInput(otpCode5, 5)
                }}
              />
              <TextInput
                style={styles.inputOtpCode}
                value={this.state.otpCode6}
                onKeyPress={({ nativeEvent }) => this.backNavigationInput(nativeEvent,6)}
                onFocus={ () => this.searchCurrentInput()}
                ref={input=>this.otpCodeRef6=input}
                maxLength={1}
                keyboardType="numeric"
                onChangeText={(otpCode6) => {
                  this.setState({otpCode6: otpCode6});
                }}
              />
            </View>    
            <View style={{flexDirection: 'row',justifyContent:"space-between"}}>
             {this.state.disableTwofa && <TouchableOpacity
                onPress={this.disableTwofa}>
                  <Text style={{backgroundColor: "white", color:"red", paddingHorizontal: 20, paddingVertical:10, borderRadius: 5, fontSize: 18, alignSelf: "flex-end", marginHorizontal:20, marginVertical:10, }}>Disabe</Text>
             </TouchableOpacity>}
             {!this.state.disableTwofa && 
                <TouchableOpacity>
                  <Text style={{backgroundColor: "white", color:"white", paddingHorizontal: 20, paddingVertical:10, borderRadius: 5, fontSize: 18, alignSelf: "flex-end", marginHorizontal:20, marginVertical:10, }}></Text>
                </TouchableOpacity>}
              <TouchableOpacity
                onPress={this.setupTwofaKey}>
                  <Text style={{backgroundColor: "#0088ff", color:"white", paddingHorizontal: 20, paddingVertical:10, borderRadius: 5, fontSize: 18, alignSelf: "flex-end", marginHorizontal:20, marginVertical:10, }}>Log In</Text>
              </TouchableOpacity>
              </View>
          </ScrollView>
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

  },
  followStepText: {
    margin: 20,
  },
  stepTitleLayout: {
    marginLeft: 20,
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

  },
  firstStepTitle: {
    fontSize: 20,
    marginHorizontal: 20,
  },
  circleNumber: {
    backgroundColor: "green",
    fontSize: 20,
    fontWeight: "bold",
    width: 30,
    height: 30,
    color: "white",
    justifyContent: "center",
    borderRadius: 20,
    textAlign: "center",
    marginLeft: 10,
  },
  firstStepBodyLayout: {
    marginHorizontal:30,
    marginTop: 10,
  },
  installAuthAppDescription: {
    fontSize: 16,
  },
  appStoreImage: {
    width: 120,
    height: 40,
  },
  appStoreLayout: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  qrCodeImage: {
    width: 250,
    height: 250,
  },
  stepBodyLayout: {
    flexDirection:'column',
    alignItems:"center",
    justifyContent: "center"
  },
  twofaKeyText: {
    fontSize: 18, 
    borderColor: "green", 
    borderWidth:1, 
    textAlign: "center", 
    paddingVertical: 5, 
    paddingHorizontal: 10,
    borderRadius:5, 
    marginTop: 20,
  },
  clickToCopy: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
  },
  inputOtpCode: {
    fontSize: 20,
    borderColor: "grey",
    width: '13%',
    aspectRatio: 1,
    borderWidth:1,
    marginHorizontal: 5,
    textAlign: "center"

  },
  loginButton:{
    alignSelf: "flex-end", 
    margin: 20, 
    width: 120, 
    justifyContent: 'center', 
    backgroundColor: "#0088ff"
  }



})
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(SettingsScreen);