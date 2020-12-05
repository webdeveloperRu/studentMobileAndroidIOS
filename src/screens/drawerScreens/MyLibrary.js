import React from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Container,
  Button, 
  Body, 
  Header, 
  Left,
  Right,
  Title,
  Thumbnail,
  Card,
  CardItem,
  } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { ImageOverlay } from "../../components/image-overlay";
import Icon from 'react-native-vector-icons/MaterialIcons';
const MyLibraryScreen = ({navigation}) => {
  return (
    <Container style={styles.container}>        
        <ScrollView>
           <Card style={styles.libraryCard}>
              <CardItem cardBody>
                <ImageOverlay
                  source={require("../../assets/images/profile.jpg")} 
                  style={styles.libraryCardBody}>
                    <TouchableOpacity 
                      style={styles.playButton}
                      onPress={() => navigation.navigate('ViewLessonScreen')}
                      >
                      <Icon name="play-circle-outline" size={40} style={styles.playIcon} ></Icon>
                    </TouchableOpacity>
                </ImageOverlay>
              </CardItem>
            <CardItem>
              <Body style={styles.libraryCardDescription}>
                <TouchableOpacity
                activeOpacity={0.7}
                style={styles.libraryCardDescriptionButton}
                >
                  <Thumbnail source={require("../../assets/images/profile.jpg")} style={styles.libraryCardDescriptionThumbNail}/>
                </TouchableOpacity>
                <View style={styles.descriptionPart}>
                  <Text style={styles.descriptionTitle}>
                    Beautiful Animation Shows what It's like
                  </Text>
                  <Text style={styles.nationalGeoText}>
                    National Geographic
                  </Text>
                </View>
              </Body>
            </CardItem>
          </Card>

          <Card style={styles.libraryCard}>
              <CardItem cardBody>
                <ImageOverlay
                  source={require("../../assets/images/background1.jpg")} 
                  style={styles.libraryCardBody}>
                    <TouchableOpacity 
                      style={styles.playButton}
                      onPress={() => navigation.navigate('ViewLessonScreen')}
                      >
                      <Icon name="play-circle-outline" size={40} style={styles.playIcon} ></Icon>
                    </TouchableOpacity>
                </ImageOverlay>
              </CardItem>
            <CardItem>
              <Body style={styles.libraryCardDescription}>
                <TouchableOpacity
                activeOpacity={0.7}
                style={styles.libraryCardDescriptionButton}
                >
                  <Thumbnail source={require("../../assets/images/background1.jpg")} style={styles.libraryCardDescriptionThumbNail}/>
                </TouchableOpacity>
                <View style={styles.descriptionPart}>
                  <Text style={styles.descriptionTitle}>
                    Beautiful Animation Shows what It's like
                  </Text>
                  <Text style={styles.nationalGeoText}>
                    National Geographic
                  </Text>
                </View>
              </Body>
            </CardItem>
          </Card>

          <Card style={styles.libraryCard}>
              <CardItem cardBody>
                <ImageOverlay
                  source={require("../../assets/images/background2.jpg")} 
                  style={styles.libraryCardBody}>
                    <TouchableOpacity 
                      style={styles.playButton}
                      onPress={() => navigation.navigate('ViewLessonScreen')}
                      >
                      <Icon name="play-circle-outline" size={40} style={styles.playIcon} ></Icon>
                    </TouchableOpacity>
                </ImageOverlay>
              </CardItem>
            <CardItem>
              <Body style={styles.libraryCardDescription}>
                <TouchableOpacity
                activeOpacity={0.7}
                style={styles.libraryCardDescriptionButton}
                >
                  <Thumbnail source={require("../../assets/images/background2.jpg")} style={styles.libraryCardDescriptionThumbNail}/>
                </TouchableOpacity>
                <View style={styles.descriptionPart}>
                  <Text style={styles.descriptionTitle}>
                    Beautiful Animation Shows what It's like
                  </Text>
                  <Text style={styles.nationalGeoText}>
                    National Geographic
                  </Text>
                </View>
              </Body>
            </CardItem>
          </Card>

          <Card style={styles.libraryCard}>
              <CardItem cardBody>
                <ImageOverlay
                  source={require("../../assets/images/background3.jpg")} 
                  style={styles.libraryCardBody}>
                    <TouchableOpacity 
                      style={styles.playButton}
                      onPress={() => navigation.navigate('ViewLessonScreen')}
                      >
                      <Icon name="play-circle-outline" style={styles.playIcon} ></Icon>
                    </TouchableOpacity>
                </ImageOverlay>
              </CardItem>
            <CardItem>
              <Body style={styles.libraryCardDescription}>
                <TouchableOpacity
                activeOpacity={0.7}
                style={styles.libraryCardDescriptionButton}
                >
                  <Thumbnail source={require("../../assets/images/background3.jpg")} style={styles.libraryCardDescriptionThumbNail}/>
                </TouchableOpacity>
                <View style={styles.descriptionPart}>
                  <Text style={styles.descriptionTitle}>
                    Beautiful Animation Shows what It's like
                  </Text>
                  <Text style={styles.nationalGeoText}>
                    National Geographic
                  </Text>
                </View>
              </Body>
            </CardItem>
          </Card>

          




        </ScrollView>
      </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerLayout: {
    backgroundColor: "#0099ff"
  },
  headerTitle: {
    fontSize: 20,
    color: "white"
  },
  libraryCard: {
    marginLeft: 10,
    marginTop: 10,
    marginRight: 10,
  },
  libraryCardDescription: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderTopColor: "black",
  },
  descriptionPart: {
    flex: 1,
    flexDirection: "column"
  },
  descriptionTitle: {
    fontSize: 16,
  },
  nationalGeoText: {
    fontSize: 12,
    color: "#999999"
  },
  libraryCardDescriptionButton: {
    marginRight: 10,
  },
  libraryCardDescriptionThumbNail: {
    width: 45,
    height: 45,
  },
  libraryCardBody: {
    height: 200, 
    width: null, 
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  playButton: {
    alignSelf: "center",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  playIcon: {
    color: "white",
    fontSize: 50,
  }

});

export default MyLibraryScreen;