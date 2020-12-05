import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {
  Container,
  Button, 
  Body, 
  Header, 
  Left,
  Right,
  Title,
  Card,
  CardItem,
  List, 
  ListItem, 
  Thumbnail
  } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
const CourseScreen = ({navigation}) =>{
    return (
      <Container style={styles.container}>
        <ScrollView>
          <View style={styles.selectedLessonLayout}>
            <Image source={require("../../assets/images/background1.jpg")} style={{height: 250, width: null, flex: 1}}/>
            <View style={styles.lessonDescriptionLayout}>
              {/* <TouchableOpacity                 
                style={styles.lessonPlayButton}
                onPress={() => navigation.navigate('ViewLessonScreen')}
                >
                  <Icon name='play-arrow' size={30} color="white"/>
              </TouchableOpacity> */}
              <Button   rounded              
                style={styles.lessonPlayButton}
                onPress={() => navigation.navigate('ViewLessonScreen')}
                >
                  <Icon name='play-arrow' size={30} color="white"/>
              </Button>
              <Text style={styles.lessonTitle}>
                Emma Hewitt
              </Text>
              <Text style={styles.libraryDataInfo}>
                5 categroy, 63 video lessons
              </Text>
            </View>
          </View>
          <List>
            <ListItem itemHeader first style={styles.categoryListItem}>
              <Text style={styles.categoryTitleText}>COMEDY</Text>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={require("../../assets/images/avatar.png")}  />
              </Left>
              <Body>
                <Text>Heaven (Fonzarelli Mix)</Text>
                <Text note numberOfLines={1}>3:49</Text>
              </Body>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={require("../../assets/images/avatar.png")}  />
              </Left>
              <Body>
                <Text>Heaven (Fonzarelli Mix)</Text>
                <Text note numberOfLines={1}>3:49</Text>
              </Body>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={require("../../assets/images/avatar.png")}  />
              </Left>
              <Body>
                <Text>Heaven (Fonzarelli Mix)</Text>
                <Text note numberOfLines={1}>3:49</Text>
              </Body>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={require("../../assets/images/avatar.png")}  />
              </Left>
              <Body>
                <Text>Heaven (Fonzarelli Mix)</Text>
                <Text note numberOfLines={1}>3:49</Text>
              </Body>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={require("../../assets/images/avatar.png")}  />
              </Left>
              <Body>
                <Text>Heaven (Fonzarelli Mix)</Text>
                <Text note numberOfLines={1}>3:49</Text>
              </Body>
            </ListItem>

            <ListItem itemHeader first style={styles.categoryListItem}>
              <Text style={styles.categoryTitleText}>COMEDY</Text>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={require("../../assets/images/avatar.png")}  />
              </Left>
              <Body>
                <Text>Heaven (Fonzarelli Mix)</Text>
                <Text note numberOfLines={1}>3:49</Text>
              </Body>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={require("../../assets/images/avatar.png")}  />
              </Left>
              <Body>
                <Text>Heaven (Fonzarelli Mix)</Text>
                <Text note numberOfLines={1}>3:49</Text>
              </Body>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={require("../../assets/images/avatar.png")}  />
              </Left>
              <Body>
                <Text>Heaven (Fonzarelli Mix)</Text>
                <Text note numberOfLines={1}>3:49</Text>
              </Body>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={require("../../assets/images/avatar.png")}  />
              </Left>
              <Body>
                <Text>Heaven (Fonzarelli Mix)</Text>
                <Text note numberOfLines={1}>3:49</Text>
              </Body>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={require("../../assets/images/avatar.png")}  />
              </Left>
              <Body>
                <Text>Heaven (Fonzarelli Mix)</Text>
                <Text note numberOfLines={1}>3:49</Text>
              </Body>
            </ListItem>
          </List>
          <View style={styles.biographyLayout}>
            <Text style={styles.biographyTitle}>Biography</Text>
            <CardItem style={styles.biographyContextCard}>
              <Text style={styles.biographyText}>
              Few voices are as instantly recognizable as that of Australian born songstress, Emma Hewitt.
              Hewitt’s haunting melodies, yearning lyrics and distinctive style have earned her a legion of passionate fans around the world as she continues to write and release music with some of the world’s most respected names in electronic dance music. The journey began back in the Australian town of Geelong, Victoria where Emma would perform acoustically around.
              </Text>
            </CardItem>
          </View>
        </ScrollView>
      </Container>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerLayout: {
    backgroundColor: "#8f8f8f"
  },
  headerTitle: {
    fontSize: 20,
    color: "white"
  },
  selectedLessonLayout: {
    height: 300,
  },
  lessonDescriptionLayout: {
    backgroundColor: "#5f5f5f",
    height: 90,  
  },
  lessonPlayButton: {
    position: "absolute",
    justifyContent: "center",
    backgroundColor: "#0099ff",
    alignSelf: "flex-end",
    alignItems: "center",
    top : -30,
    right: 15,
    width: 60,
    height: 60,
  },
  lessonTitle: {
    color: "white",
    marginTop: 10,
    marginLeft: 10,
    fontSize: 30,
  },
  libraryDataInfo: {
    color: "white",
    marginLeft: 10,
    marginTop: 5,
  },
  categoryListItem: {
    backgroundColor: "#dddddd",
    alignItems: "center",
  },
  categoryTitleText: {
    color: "#5f5f5f"
  },
  biographyLayout: {
    backgroundColor: "#dddddd"
  },
  biographyContextCard: {
    marginTop: 15,
    marginBottom: 40,
    marginHorizontal: 10,
  },
  biographyTitle: {
    marginLeft: 10,
    marginTop: 10,
  },
  biographyText: {
    color: "#5f5f5f",
    fontSize: 14,
  },



});

export default CourseScreen;
