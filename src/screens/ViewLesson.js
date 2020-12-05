import React from 'react';
import { StyleSheet, Text, View, Image, } from 'react-native';
import {
  Container,
  Button, 
  Icon, 
  Body, 
  Header, 
  Left,
  Right,
  Title,
  Card,
  List,
  ListItem,
  CardItem,
  Thumbnail
  } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { Rating, AirbnbRating } from 'react-native-ratings';
import VideoPlayer from '../components/VideoPlayer1'
const ViewLessonScreen = ({navigation}) =>  {
  return (
    <Container style={styles.container}>
      <ScrollView>
        <Header style={styles.headerLayout}>
          <Body>
            <Title>Electric Guitar</Title>
          </Body>
        </Header>        
        <View style={styles.videoPlayerLayout}>
          <View style={{paddingVertical: "15%", backgroundColor:"#f2f2f2", height:350}}>
            <VideoPlayer />
          </View>
          <View style={styles.descriptionLayout}>
            <Text style={styles.descriptionTitle}>
              Dean Zero Dave Mustaine Electric Guitar
            </Text>
            <Text style={styles.descrptionContent}>
              A must-have for any true Megadeth fan! This guitar features a solid Mahogany body and neck and Rosewood fingerboard
            </Text>
            <Button full style={styles.markDownButton}>
              <Text style={styles.markDownTitle}>Mark as Done</Text>
            </Button>
          </View>            
        </View>
        <View style={styles.downloadsLayout}>
          <List>
            <ListItem style={styles.downloadLayout}>
              <Body>
                <Text style={styles.downloadText}>Downloads</Text>
              </Body>
            </ListItem>
          </List>
        </View>
        <View style={styles.reviewsLayout}>
          <List>
            <ListItem avatar>
              <Left>
              <Thumbnail source={require("../assets/images/avatar.png")}  />
              </Left>
              <Body>
                <Text style={styles.reviewerText}>Kumar Pratik</Text>
                <Rating
                  ratingCount={5}
                  imageSize={15}
                  readonly={true}
                  type='custom'
                  tintColor='#fff'
                  ratingColor='#5f5f5f'
                  ratingBackgroundColor='#c8c7c8'
                  style={styles.starRating}
                />
                <Text style={styles.reviewText}>Just keep them coming! I love this series of books from Mia Madison. I really hope that it continues with a book about Beverly and Dazzle.</Text>
              </Body>
              <Right>
                <Button >
                  <Icon name='arrow-back' />
                </Button>
              </Right>
            </ListItem>
            <ListItem avatar>
              <Left>
              <Thumbnail source={require("../assets/images/avatar.png")}  />
              </Left>
              <Body>
                <Text style={styles.reviewerText}>Kumar Pratik</Text>
                <Rating
                  ratingCount={5}
                  imageSize={15}
                  readonly={true}
                  type='custom'
                  tintColor='#fff'
                  ratingColor='#5f5f5f'
                  ratingBackgroundColor='#c8c7c8'
                  style={styles.starRating}
                />
                <Text style={styles.reviewText}>Just keep them coming! I love this series of books from Mia Madison. I really hope that it continues with a book about Beverly and Dazzle.</Text>
              </Body>
              <Right>
                <Button >
                  <Icon name='arrow-back' />
                </Button>
              </Right>
            </ListItem>
            <ListItem avatar>
              <Left>
              <Thumbnail source={require("../assets/images/avatar.png")}  />
              </Left>
              <Body>
                <Text style={styles.reviewerText}>Kumar Pratik</Text>
                <Rating
                  ratingCount={5}
                  imageSize={15}
                  readonly={true}
                  type='custom'
                  tintColor='#fff'
                  ratingColor='#5f5f5f'
                  ratingBackgroundColor='#c8c7c8'
                  style={styles.starRating}
                />
                <Text style={styles.reviewText}>Just keep them coming! I love this series of books from Mia Madison. I really hope that it continues with a book about Beverly and Dazzle.</Text>
              </Body>
              <Right>
                <Button >
                  <Icon name='arrow-back' />
                </Button>
              </Right>
            </ListItem>
          </List>
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
    backgroundColor: "#0099ff"
  },
  headerTitle: {
    fontSize: 20,
    color: "white"
  },
  videoView: {
    height: 300,
    backgroundColor: "#eeeeee"
  },
  descriptionLayout: {
    padding: 10,
  },
  descrptionContent: {
    fontSize: 13,
    marginTop: 10,
    color: "#8f8f8f"
  },
  descriptionTitle: {
    fontSize: 20,
    color: "#5f5f5f"
  },
  markDownButton: {
    marginTop: 30,
    backgroundColor: "#0099ff",
    borderRadius: 5,

  },
  markDownTitle: {
    color: "white",
    fontSize: 16,
  },
  downloadText: {
    color: "#5f5f5f",
    fontSize: 16,
  },
  downloadsLayout: {
    borderColor: "#cccccc",
    borderWidth: 1,
  },
  reviewerText: {
  },
  reviewText: {
    color: "#5f5f5f",
    fontSize: 13,
    marginTop: 10,
  },
  starRating: {
    marginTop: 5,
    alignSelf: "flex-start",
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  videoPlayerView: {
    marginVertical: 50,
  }

});

export default ViewLessonScreen;
