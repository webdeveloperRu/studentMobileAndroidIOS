// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image
} from 'react-native';
import {Text} from 'native-base';
import {store} from '../redux/store';
import {APIService} from '../service'

const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      const state = store.getState();
      if(state.user.token != null){
        APIService.getSettings(state.user.token)
        .then(res=>res.json())
        .then(res=>{
          if(res.message =='apikey is invalid') {
            navigation.replace('Auth')            
          } else{
            navigation.replace('DrawerNavigationRoutes')
          }
        })
      } else{
        navigation.replace('Auth')
      }
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      {/* <Image
        source={require('../assets/images/aboutreact.png')}
        style={{width: '90%', resizeMode: 'contain', margin: 30}}
      /> */}
      <Text style={styles.logoTitle}>
        Academy
      </Text>
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0099ff',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
  logoTitle: {
    fontSize: 40,
    color: "white",
  }
});