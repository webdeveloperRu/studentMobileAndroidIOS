import React,  {Component}from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {
  Container,
  Button, 
  Body, 
  Header, 
  Left,
  Right,
  Title,
  List,
  ListItem,
  Thumbnail
  } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { Rating} from 'react-native-ratings';
import VideoPlayer from '../components/VideoPlayer1'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';

class ViewLessonScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    this.navigation = props.navigation;
  }
  render() {
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
                {this.props.library.currentLesson.title}
              </Text>
              <Text style={styles.descrptionContent}>
                {this.props.library.currentLesson.body.substring(0,200)}
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
                <Right>
                  <TouchableOpacity >
                    <Icon name='file-download' size={30} color="grey" />
                  </TouchableOpacity>
                </Right>
              </ListItem>
            </List>
          </View>
          <View style={styles.reviewsLayout}>
            <View style={styles.reviewTitleLayout}>
              <Text style={styles.reviewTitle}>Reviews</Text>
              <TouchableOpacity >
                <Icon style={styles.reivewButton} name='keyboard-arrow-down' size={40} color="grey" />
              </TouchableOpacity>
            </View>
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
                  <TouchableOpacity >
                    <Icon name='reply' size={30} color="grey" />
                  </TouchableOpacity>
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
                  <TouchableOpacity >
                    <Icon name='reply' size={30} color="grey" />
                  </TouchableOpacity>
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
                  <TouchableOpacity >
                    <Icon name='reply' size={30} color="grey" />
                  </TouchableOpacity>
                </Right>
              </ListItem>
            </List>
          </View>
        </ScrollView>
    </Container>
    );
  }
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
  },
  reviewTitleLayout: {
    flex: 1,
    flexDirection :"row",
    alignItems: "center",
    alignContent: "space-between"
  },

  reviewTitle: {
    marginLeft: 20,
    flex:1,
    color: "grey",
    fontSize: 16,
  },
  reivewButton: {
    flex:1,
    marginRight:10
  }

});
const mapStateToProps = (state) => {
  return {
    user: state.user,
    library: state.library
  };
};
export default connect(mapStateToProps)(ViewLessonScreen);

