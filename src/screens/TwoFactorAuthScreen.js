import React, {Component, createRef} from 'react';
import { StyleSheet, View, Text,TouchableOpacity, TextInput} from 'react-native';
import { Container, Content} from 'native-base';
import {APIService} from '../service'
import {connect} from 'react-redux';
import Toast from 'react-native-tiny-toast';
import {clearAll} from '../redux/actions/libraryActions';
import {loginUser} from '../redux/actions/userActions';
import {bindActionCreators} from 'redux';

class TwoFactorAuthScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otpCode1: "",
      otpCode2: "",
      otpCode3: "",
      otpCode4: "",
      otpCode5: "",
      otpCode6: "",
      currentInput: 1,
    };
    this.navigation = props.navigation;
    this.otpCodeRef1=React.createRef();
    this.otpCodeRef2=React.createRef();
    this.otpCodeRef3=React.createRef();
    this.otpCodeRef4=React.createRef();
    this.otpCodeRef5=React.createRef();
    this.otpCodeRef6=React.createRef();
  }
  
  logIn = () => {
    const otpCode = this.state.otpCode1 + this.state.otpCode2 + this.state.otpCode3 + this.state.otpCode4 + this.state.otpCode5 + this.state.otpCode6;
    const user={
      email: this.props.user.loginUserEmail,
      password:  this.props.user.loginUserPassword,
      otp: otpCode,
    }
    APIService.loginUser(user)
    .then(res=>res.json())
    .then(res=>{
      this.setState({otpCode1:'',otpCode2:'',otpCode3:'',otpCode4:'',otpCode5:'',otpCode6:''})
      if (res.success == true) {
        this.props.clearAll();
        this.props.loginUser(res);
        this.navigation.replace('DrawerNavigationRoutes');
      } else{
        Toast.show(res.message, {
          position: 0,
          containerStyle:{            
            padding: 20,
          },
          textStyle: {
            fontSize: 18,
          },
        });
      }
     
    })
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

  render(){
    return (
      <Container >
        <Content style={styles.container}>
          <View style={styles.inputOtpLayout}>
            <Text style={{marginTop: 20, marginLeft: 10, fontSize: 25,}}> Two Factor Authentication</Text>
            <Text style={{marginTop: 20, marginLeft: 10, fontSize: 18, paddingHorizontal:10}}> Please enter the 2fa code from your mobile device below.</Text>
            <View style={{ marginHorizontal: 20,flexDirection: "row", justifyContent: 'space-between'}}>
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
            <TouchableOpacity
              onPress={this.logIn}>
                <Text style={styles.loginButton}>Log In</Text>
            </TouchableOpacity>
          </View>
        </Content>
        
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: '40%',
    backgroundColor : "#f3f3f3"
  },
  inputOtpLayout: {
    backgroundColor:'white',
    marginTop: "20%",
    marginHorizontal: 10,
    paddingBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    borderRadius: 3,
  },
  inputOtpCode: {
    marginTop:70,
    fontSize: 20,
    borderColor: "#00aaff",
    width: '13%',
    aspectRatio: 1,
    borderWidth:1,
    marginHorizontal: 3,
    textAlign: "center"

  },
  loginButton: {
    backgroundColor: "#0088ff", 
    color:"white", 
    paddingHorizontal: 20, 
    paddingVertical:10, 
    borderRadius: 5, 
    fontSize: 18, 
    alignSelf: "flex-end", 
    marginHorizontal:20, 
    marginTop: 40,
  }
  
  
});
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({loginUser, clearAll}, dispatch);
};
export default connect(mapStateToProps,mapDispatchToProps)(TwoFactorAuthScreen);
