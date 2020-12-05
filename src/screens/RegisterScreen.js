import React, {Component} from 'react';
import { StyleSheet, View, Text, Image} from 'react-native';
import { Container, Content, Button, Input, Item, Icon} from 'native-base';
const RegisterScreen = (props) => {
  const handleSubmitButton = () => {
    props.navigation.replace('DrawerNavigationRoutes');
  }
  return (
    <Container >
      <Content style={styles.container}>
        <View style={styles.signUpLayout}>
          <Text style={styles.questionText}>Already have a account?</Text>
          <Button 
            rounded 
            info 
            style={styles.logInButton}
            onPress={() => props.navigation.navigate('LoginScreen')}
            >
            <Text style={styles.logInText}>Log In</Text>
          </Button>
        </View>
        <View style={styles.descriptionLayout}>
          <Text style={styles.welcomeText}>
            Academy.app
          </Text>
          <Text style={styles.descriptionText}>
            There will be no more. We have reduced the prices of hundereds of products for the whole year!
          </Text>
        </View>
        <View style={styles.registerFormLayout}>
          <Item regular style={styles.userNameInput}>
            <Input placeholder='User Name' />
          </Item>
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
            style={styles.createAccountButton}
            onPress={handleSubmitButton}
          >
            <Text style={styles.createAccountText}>Create account</Text>
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
  logInButton: {
    backgroundColor: "#0099ff",
    height: 25,
    width: 65,
    justifyContent: "center"
  },
  logInText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold"
  },
  descriptionLayout: {
    marginTop: "25%",
  },
  welcomeText: {
    fontSize: 40,
    fontWeight: "bold",
  },
  descriptionText: {
    marginTop: 10,
    fontSize: 18,
    color: "#333333"
  },
  registerFormLayout: {
    marginTop: "10%"
  },
  userNameInput: {
    borderColor: "#dddddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 15,
    height: 50,
  },
  emailInput: {
    marginTop: 10,
    borderColor: "#dddddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 15,
    height: 50,
  },
  passwordInput: {
    height: 50,
    marginTop: 10,
    borderColor: "#dddddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 15,
  },

  createAccountButton: {
    marginTop: "15%",
    borderRadius: 5,
    height: 50,
    backgroundColor: "#0099ff",
    justifyContent: "center"
  },
  createAccountText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },

});

export default RegisterScreen;