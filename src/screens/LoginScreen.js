import React, {Component} from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { Container, Content, Button, Input, Item, Icon} from 'native-base';

const LoginScreen = ({navigation}) => {
  const handleSubmitPress = () => {
    navigation.replace('DrawerNavigationRoutes');
  };
  return (
    <Container >
      <Content style={styles.container}>
        <View style={styles.signUpLayout}>
          <Text style={styles.questionText}>Don't have a account?</Text>
          <Button 
            rounded
            info 
            style={styles.signUpButton}
            onPress={() => navigation.navigate('RegisterScreen')}
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
            <Input placeholder='Email' />
          </Item>
          <Item regular style={styles.passwordInput}>
            <Input  placeholder='Password' />
            <Icon type="FontAwesome" name="eye" style={{fontSize: 20, color: '#bbbbbb'}} />
          </Item>
          <Button 
            info
            full
            style={styles.logInButton}
            onPress={handleSubmitPress}>
            <Text style={styles.logInText}>Log In</Text>
          </Button>
        </View>
      </Content>
    </Container>
  );
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

export default LoginScreen;
