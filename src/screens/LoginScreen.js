import React, {Component} from 'react';
import { StyleSheet, View, Text,TouchableOpacity} from 'react-native';
import { Container, Content, Button, Input, Item, Icon, Toast} from 'native-base';
import {APIService} from '../service'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loginUser} from '../redux/actions/userActions';
import * as Progress from 'react-native-progress';
class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      showPassword: true,
      showToast: false,
      errorMessage: "",
      logging: false,
    };
    this.navigation = props.navigation;
  }
  logIn = () => {
    let user ={
      email: this.state.email,
      password: this.state.password
    }
    this.setState({logging: true})
    APIService.loginUser(user)
    .then(res=>res.json())
    .then(res=>{
      this.setState({logging: false})
      if (res.success == true) {
        this.props.loginUser(res)
        this.navigation.replace('DrawerNavigationRoutes');
      }
      else {
        Toast.show({
          text: res.message,
          style: {
            backgroundColor: "#ff5500"
           }
        })
      } 
    })
    .catch(err=>{
      this.setState({logging: false})
      console.log(err)
    })
  };
  setShowPassword=()=> {
    if(this.state.showPassword) {
      this.setState({showPassword: false})
    }
    else {
      this.setState({showPassword: true})
    }
  }
  render(){
    return (
      <Container >
        <Content style={styles.container}>
          <View style={styles.signUpLayout}>
            <Text style={styles.questionText}>Don't have a account?</Text>
            <Button 
              rounded
              info 
              style={styles.signUpButton}
              onPress={() => this.navigation.navigate('RegisterScreen')}
              >
              <Text style={styles.signUpText}>Sign Up</Text>
            </Button>
          </View>
          <View style={styles.descriptionLayout}>
            <Text style={styles.welcomeText}>
              Welcome to the Academy.app
            </Text>
            <Text style={styles.descriptionText}>
              Enter your email address and password to access your account
            </Text>
          </View>
          <View style={styles.loginFormLayout}>
            <Item regular style={styles.emailInput}>
              <Input 
                placeholder='Email' 
                onChangeText={(email) => {
                  this.setState({email: email});
                }}
                value={this.state.email}
                />
            </Item>
            <Item regular style={styles.passwordInput}>
              <Input  
                placeholder='Password' 
                secureTextEntry={this.state.showPassword} 
                onChangeText={(password) => {
                  this.setState({password: password});
                }}
                vlaue={this.state.password}
                />
                <TouchableOpacity 
                  onPress={this.setShowPassword}                  
                  >
                  {!this.state.showPassword && <Icon type="FontAwesome" name="eye" style={{fontSize: 20, color: 'black'}}  />}
                  {this.state.showPassword && <Icon type="FontAwesome" name="eye" style={{fontSize: 20, color: '#bbbbbb'}} />}
                </TouchableOpacity>
            </Item>
            <Button 
              info
              full
              style={styles.logInButton}
              onPress={this.logIn}>
              {this.state.logging && <Progress.Circle  size={30} indeterminate={true} thickness={3} color={"white"}/>}
              {!this.state.logging && <Text style={styles.logInText}>Log In</Text>}              
            </Button>
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
    marginVertical: 30
  },
  signUpLayout: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  questionText: {
    color: "#0099ff",
    fontSize: 15,
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
    marginTop: "25%",
  },
  welcomeText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#333333"
  },
  descriptionText: {
    marginTop: "5%",
    fontSize: 18
  },
  loginFormLayout: {
    marginTop: "20%"
  },
  emailInput: {
    borderColor: "#bbbbbb",
    borderWidth: 2,
    borderRadius: 5,
    paddingLeft: 15,
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
  logInText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

});
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({loginUser}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
