import React, {Component} from 'react';
import { StyleSheet, View, Text,TouchableOpacity} from 'react-native';
import { Container, Content, Button, Input, Item, Icon} from 'native-base';
import {APIService} from '../service'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loginUser} from '../redux/actions/userActions';
import * as Progress from 'react-native-progress';
import Toast from 'react-native-tiny-toast';
class ResetPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      emailCode: this.props.user.emailCode,
      showPassword: true,
      showConfirmPassword: true,
    };
    this.navigation = props.navigation;
  }
  
  logIn = () => {
    this.navigation.navigate("LoginScreen")
  }

  resetPassword=()=>{
    if(this.state.email =="") {
      Toast.show('email empty!', 
      {
        position: 0,
        containerStyle: {
          padding: 30
        }
      })
      return;
    }
    if(this.state.password == "") {
      Toast.show('password empty!', 
      {
        position: 0,
        containerStyle: {
          padding: 30
        }
      })
      return;
    }
    if(this.state.confirmPassword == "") {
      Toast.show('confirmPassword empty!', 
      {
        position: 0,
        containerStyle: {
          padding: 30
        }
      })
      return;
    }
    if(this.state.confirmPassword != this.state.password) {
      Toast.show('Password must be same with confirm password!', {
        position: 0,
        containerStyle: {
          width: '90%',
          height: 80,
        }
      })
      return;
    }
    let resetInformation = {
      email: this.state.email,
      password: this.state.password,
      emailCode: this.state.emailCode,
    }
    APIService.resetPassword(resetInformation)
    .then(res=>res.json())
    .then(res=>{
      if(res.success == true){
        Toast.showSuccess('Password successfully reset!',
        {
          containerStyle: {
            backgroundColor: "rgba(0, 120, 0, 0.8)"
          }
        })
        this.navigation.navigate('LoginScreen')
      }
      console.log(res)
      console.log(res.errors)
      if(res.errors != undefined) {
        Toast.show(res.errors, { position :0, containerStyle: {padding : 30,}})
        return;
      }
      if(res.message != undefined){
        Toast.show(res.message, { position :0, containerStyle: {padding : 30,}})
        return;
      }
      
    })


  }

  setShowPassword=()=> {
    if(this.state.showPassword) {
      this.setState({showPassword: false})
    }
    else {
      this.setState({showPassword: true})
    }
  }
  setShowConfirmPassword=()=>{
    if(this.state.showConfirmPassword) {
      this.setState({showConfirmPassword: false})
    }
    else {
      this.setState({showConfirmPassword: true})
    }
  }
  render(){
    return (
      <Container >
        <Content style={styles.container}>
          <View style={styles.loginFormLayout}>
            <View style={styles.descriptionLayout}>
              <Text style={styles.forgotPasswordText}>
                Reset Password
              </Text>
            </View>
            <Item regular style={styles.emailInput}>
              <Input 
                placeholder='Email' 
                onChangeText={(email) => {
                  this.setState({email: email});
                }}
                value={this.state.email}
                />
            </Item>
            <Item regular style={styles.emailInput}>
              <Input 
                placeholder='Password' 
                secureTextEntry={this.state.showPassword} 
                onChangeText={(password) => {
                  this.setState({password: password});
                }}
                value={this.state.password}
                />
                <TouchableOpacity 
                  onPress={this.setShowPassword}                  
                  >
                  {!this.state.showPassword && <Icon type="FontAwesome" name="eye" style={{fontSize: 20, color: 'black'}}  />}
                  {this.state.showPassword && <Icon type="FontAwesome" name="eye" style={{fontSize: 20, color: '#bbbbbb'}} />}
                </TouchableOpacity> 
            </Item>
            <Item regular style={styles.emailInput}>
              <Input 
                placeholder='Confirm Password' 
                secureTextEntry={this.state.showConfirmPassword} 
                onChangeText={(confirmPassword) => {
                  this.setState({confirmPassword: confirmPassword});
                }}
                value={this.state.confirmPassword}
                />
                <TouchableOpacity 
                onPress={this.setShowConfirmPassword}                  
                >
                {!this.state.showConfirmPassword && <Icon type="FontAwesome" name="eye" style={{fontSize: 20, color: 'black'}}  />}
                {this.state.showConfirmPassword && <Icon type="FontAwesome" name="eye" style={{fontSize: 20, color: '#bbbbbb'}} />}
              </TouchableOpacity> 
            </Item>
            <Item regular style={styles.emailInput}>
              <Input 
                placeholder='Email Code' 
                onChangeText={(emailCode) => {
                  this.setState({emailCode: emailCode});
                }}
                value={this.state.emailCode}
                />
            </Item>
            <Button 
              info
              full
              style={styles.logInButton}
              onPress={this.resetPassword}>
              {this.state.logging && <Progress.Circle  size={30} indeterminate={true} thickness={3} color={"white"}/>}
              {!this.state.logging && <Text style={styles.sendText}>Reset Password</Text>}              
            </Button>
            <View style={styles.backLoginLayout}>
              <Text style={styles.questionText}>Do you have an account?</Text>
              <TouchableOpacity 
                onPress={this.logIn}
                >
                <Text style={styles.logInText}> Log In</Text>
              </TouchableOpacity>
            </View>
          </View>        
        </Content>
        
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 30,
    backgroundColor : "#f3f3f3"
  },
  signUpLayout: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  questionText: {
    color: "#333333",
    fontSize: 16,
    marginRight: 30
  },
  signUpButton: {
    backgroundColor: "#0099ff",
    height: 30,
    width: 80,
    justifyContent: "center"
  },
  signUpText: {
    color: "white",
    fontSize: 15,
  },
  descriptionLayout: {
    marginBottom: "15%"
  },
  forgotPasswordText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333333"
  },

  loginFormLayout: {
    marginTop: "10%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: "15%",
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
  emailInput: {
    borderColor: "#bbbbbb",
    borderWidth: 2,
    borderRadius: 5,
    paddingLeft: 15,
    marginVertical: 10,
    height: 50,
  },
  passwordInput: {
    height: 50,
    marginTop: 10,
    borderColor: "#bbbbbb",
    borderWidth: 2,
    borderRadius: 5,
    paddingLeft: 15,
  },

  logInButton: {
    marginTop: "15%",
    borderRadius: 5,
    height: 50,
    backgroundColor: "#0099ff",
    justifyContent: "center"
  },
  sendText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  logInText: {
    color: "#0099ff",
    fontSize: 16,
    alignSelf : "flex-end",
  },
  backLoginLayout: {
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center", 
    marginTop: 20, 
    justifyContent: 'space-between'
  }

});
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({loginUser}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordScreen);
