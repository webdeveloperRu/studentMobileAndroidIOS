import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Container, Content, Button, Input, Item} from 'native-base';
import {APIService} from '../service';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {registerEmailCode} from '../redux/actions/userActions';
import * as Progress from 'react-native-progress';
import Toast from 'react-native-tiny-toast';
class ForgotPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
    this.navigation = props.navigation;
  }

  logIn = () => {
    this.navigation.navigate('LoginScreen');
  };

  sendEmail = () => {
    this.props.registerEmailCode('');
    if (this.state.email === '') {
      Toast.show('Please input your email!', {
        position: 0,
        containerStyle: {padding: 30},
      });
    } else {
      APIService.forgotPassword(this.state.email)
        .then((res) => res.json())
        .then((res) => {
          if (res.resetcode === undefined) {
            if (res.message !== undefined) {
              Toast.show(res.message, {
                position: 0,
                containerStyle: {padding: 30},
              });
            }
            if (res.errors !== undefined) {
              Toast.show(res.errors, {
                position: 0,
                containerStyle: {padding: 30},
              });
            }
          } else {
            this.props.registerEmailCode(res.resetcode);
            this.navigation.navigate('ResetPasswordScreen');
          }
        });
    }
  };
  render() {
    return (
      <Container>
        <Content style={styles.container}>
          <View style={styles.loginFormLayout}>
            <View style={styles.descriptionLayout}>
              <Text style={styles.forgotPasswordText}>Forgot Passwrod</Text>
            </View>
            <Item regular style={styles.emailInput}>
              <Input
                placeholder="Email"
                onChangeText={(email) => {
                  this.setState({email: email});
                }}
                value={this.state.email}
              />
            </Item>
            <Button
              info
              full
              style={styles.logInButton}
              onPress={this.sendEmail}>
              {this.state.logging && (
                <Progress.Circle
                  size={30}
                  indeterminate={true}
                  thickness={3}
                  color={'white'}
                />
              )}
              {!this.state.logging && <Text style={styles.sendText}>Send</Text>}
            </Button>
            <View style={styles.backLoginLayout}>
              <Text style={styles.questionText}>Do you have an account?</Text>
              <TouchableOpacity onPress={this.logIn}>
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
    backgroundColor: '#f3f3f3',
  },
  signUpLayout: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  questionText: {
    color: '#333333',
    fontSize: 16,
    marginRight: 30,
  },
  signUpButton: {
    backgroundColor: '#0099ff',
    height: 30,
    width: 80,
    justifyContent: 'center',
  },
  signUpText: {
    color: 'white',
    fontSize: 15,
  },
  descriptionLayout: {
    marginBottom: '15%',
  },
  forgotPasswordText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333333',
  },

  loginFormLayout: {
    marginTop: '40%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: '15%',
    shadowColor: '#000',
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
    borderColor: '#bbbbbb',
    borderWidth: 2,
    borderRadius: 5,
    paddingLeft: 15,
    height: 50,
  },
  passwordInput: {
    height: 50,
    marginTop: 10,
    borderColor: '#bbbbbb',
    borderWidth: 2,
    borderRadius: 5,
    paddingLeft: 15,
  },

  logInButton: {
    marginTop: '15%',
    borderRadius: 5,
    height: 50,
    backgroundColor: '#0099ff',
    justifyContent: 'center',
  },
  sendText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  logInText: {
    color: '#0099ff',
    fontSize: 16,
    alignSelf: 'flex-end',
  },
  backLoginLayout: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-between',
  },
});
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({registerEmailCode}, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPasswordScreen);
