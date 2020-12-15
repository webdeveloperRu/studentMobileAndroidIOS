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
// import Video from 'react-native-af-video-player'
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
  componentDidMount() {
    this.setFullScreen();
  }
  setFullScreen(){
    if(this.props.library.fullscreen){
      this.navigation.setOptions({headerShown: false});
    }
    else {
      this.navigation.setOptions({headerShown: true});
    }
  }
  render() {
     let comments =[];
     let commentsData = this.props.library.comments;
     this.setFullScreen()
    //  if(commentsData != []) {
    //   for (let i = 0; i < commentsData.length; i++) {
    //     comments.push(
    //       <ListItem avatar key={commentsData[i].id}>
    //         <Left>
    //         <Thumbnail source={require("../assets/images/avatar.png")}  />
    //         </Left>
    //         <Body>
    //           <Text style={styles.reviewerText}>{commentsData[i].author_name}</Text>
    //           <Rating
    //             ratingCount={5}
    //             imageSize={15}
    //             readonly={true}
    //             type='custom'
    //             tintColor='#fff'
    //             ratingColor='#5f5f5f'
    //             ratingBackgroundColor='#c8c7c8'
    //             style={styles.starRating}
    //           />
    //           <Text style={styles.reviewText}>{commentsData[i].comment}</Text>
    //         </Body>
    //         <Right>
    //           <TouchableOpacity >
    //             <Icon name='reply' size={30} color="grey" />
    //           </TouchableOpacity>
    //         </Right>
    //       </ListItem>  
    //     )
    //   }
    // }
    
    return (
      <Container style={styles.container}>
          { !this.props.library.fullscreen &&
           <Header noShadow style={{backgroundColor: "#008fd6", height:40, borderBottomWidth:0,}}>
            <Left>
              <TouchableOpacity onPress={()=>{this.navigation.navigate('MyLibraryScreen')}}>
                <Icon name='chevron-left' style={{color:"white"}} size={35} />
              </TouchableOpacity>
            </Left>
           
            <Right>
              <TouchableOpacity >
                <Icon name='search'  style={{color:"white"}} size={28} />
              </TouchableOpacity>
            </Right>
          </Header>            
          }
          { !this.props.library.fullscreen &&
            <Header noShadow style={styles.headerLayout}>
              <Body style={{justifyContent:'center', alignItems: "center"}}>
                <Title>{this.props.library.currentCategory.name}</Title>
              </Body>
            </Header>
          }
          <View style={[this.props.library.fullscreen? styles.fullScreenView:styles.normalScreenView]}>
            <VideoPlayer />
          </View>
          {!this.props.library.fullscreen && 
            <ScrollView>
             
              <View style={styles.videoPlayerLayout}>
                <View style={styles.descriptionLayout}>
                  <Text style={styles.descriptionTitle}>
                    {this.props.library.currentLesson.title}
                  </Text>
                  <Text style={styles.descrptionContent}>
                    {this.props.library.currentLesson.body.substring(0,200)}
                  </Text>
                  {!this.props.library.currentLesson.lessons_completed && <Button full style={styles.markDownButton}>
                      <Text style={styles.markDownTitle}>Mark as Done</Text>
                    </Button>
                  }
                  {this.props.library.currentLesson.lessons_completed  && 
                  <Button full success >
                    <Text style={styles.markDownTitle}>Completed</Text>
                  </Button>}
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
                  {comments}
                </List>
              </View>
            </ScrollView>
          }
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
    marginVertical:10,
    color: "#8f8f8f"
  },
  descriptionTitle: {
    fontSize: 20,
    color: "#5f5f5f"
  },
  markDownButton: {
    marginTop: 30,
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
  },
  fullScreenView:{
    flex:1,
  },
  normalScreenView: {
    backgroundColor:"#f2f2f2", 
    height: 250
  }

});
const mapStateToProps = (state) => {
  return {
    user: state.user,
    library: state.library
  };
};
export default connect(mapStateToProps)(ViewLessonScreen);

