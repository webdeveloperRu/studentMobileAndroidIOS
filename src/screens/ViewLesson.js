import React,  {Component}from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal} from 'react-native';
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
  Textarea, 
  Form,
  commentText,
  Thumbnail
  } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { Rating} from 'react-native-ratings';
import VideoPlayer from '../components/VideoPlayer1'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import DropDownMenu from '../components/DropDownMenu'
import {APIService} from '../service';
import Toast from 'react-native-tiny-toast';

class ViewLessonScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      showCommentModal: false,
    };
    this.navigation = props.navigation;
  }
  componentDidMount() {
    this.setFullScreen();
    this.getDownLoadFiles();
  }
  setFullScreen = () => {
    if(this.props.library.fullscreen){
      this.navigation.setOptions({headerShown: false});
    }
    else {
      this.navigation.setOptions({headerShown: true});
    }
  }
  markAsDone = () =>  {
    // console.log(this.props.user.token);
    APIService.markAsDone('true', this.props.library.currentLesson.id, this.props.user.token)
    .then(res=>res.json())
    .then(res=>{
      if(res.message != undefined) {
        Toast.show(res.message, {
          // position: Toast.position.center,
          position: 0,
          containerStyle:{            
            marginHorizontal: 10,
            padding: 20
          },
          textStyle: {
            fontSize: 14,
          },
        })
      }
    })
  }
  addComment = () => {
    this.setState({showCommentModal: false})
    APIService.addComment(this.state.commentText, this.props.library.currentLesson.id, this.props.user.token)
      .then(res=>res.json())
      .then(res=>{
        if(res.message != undefined) {
          Toast.show(res.message, {
            // position: Toast.position.center,
            position: 0,
            containerStyle:{            
              marginHorizontal: 10,
              padding: 20
            },
            textStyle: {
              fontSize: 14,
            },
          })
        }
      })
  }
  getDownLoadFiles = () =>{
    APIService.getDownloadFiles(this.props.library.currentLesson.id, this.props.user.token)
    .then(res=>res.json())
    .then(res=>{
      if(res.message != undefined) {
        Toast.show(res.message, {
          // position: Toast.position.center,
          position: 0,
          containerStyle:{            
            marginHorizontal: 10,
            padding: 20
          },
          textStyle: {
            fontSize: 14,
          },
        })
      }
      if(res.total !=undefined ){
        if(res.total == 0){
          Toast.show('No download files', {
            // position: Toast.position.center,
            position: 0,
            containerStyle:{            
              marginHorizontal: 10,
              padding: 20
            },
            textStyle: {
              fontSize: 14,
            },
          })
        }
      }
    })
  }
  markAsIncomplete = () => {
    APIService.markAsDone('false', this.props.library.currentLesson.id, this.props.user.token)
    .then(res=>res.json())
    .then(res=>{
      if(res.message != undefined) {
        Toast.show(res.message, {
          // position: Toast.position.center,
          position: 0,
          containerStyle:{            
            marginHorizontal: 10,
            padding: 20
          },
          textStyle: {
            fontSize: 14,
          },
        })
      }
    })
  }
  render() {
     let comments =[];
     this.setFullScreen()
     if(this.props.library.comments != undefined) {
       let commentsData = this.props.library.comments;
      for (let i = 0; i < commentsData.length; i++) {
        comments.push(
          <ListItem avatar key={commentsData[i].id}>
            <Left>
            <Thumbnail source={require("../assets/images/avatar.png")}  />
            </Left>
            <Body>
              <Text style={styles.reviewerText}>{commentsData[i].author_name}</Text>
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
              <Text style={styles.reviewText}>{commentsData[i].comment}</Text>
            </Body>
            <Right>
              <TouchableOpacity >
                <Icon name='reply' size={30} color="grey" />
              </TouchableOpacity>
            </Right>
          </ListItem>  
        )
      }
    }
    
    return (
      
      <Container style={styles.container}>      
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.showCommentModal}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={{marginTop: "60%", marginHorizontal: 20,backgroundColor:"#8fbcdb", borderRadius: 5}} >
            <Form style={{backgroundColor: 'white', margin: 10, borderRadius:5}}>
              <Textarea 
                rowSpan={5} 
                placeholder="type something"
                onChangeText={(text)=>{this.setState({commentText: text})}}
              />
            </Form>
            <TouchableOpacity
              style={{alignSelf: "flex-end", marginRight: 20}}
              onPress={() => {
                this.addComment();                
              }}
              >
              <View
                style={{paddingHorizontal: 10, alignSelf:"center", borderRadius: 30, backgroundColor: "#0099ff", width: 40, aspectRatio:1, justifyContent: 'center', marginBottom:10}}
              >
                <Icon name="add-comment" size={20}></Icon>
              </View>         
            </TouchableOpacity>
          </View>
        </Modal>
        { !this.props.library.fullscreen &&
          <Header noShadow style={{backgroundColor: "#008fd6", height:40, borderBottomWidth:0,}}>
          <Left >
            <TouchableOpacity onPress={()=>{this.navigation.navigate('CourseScreen')}}>
              <Icon name='chevron-left' style={{color:"white"}} size={35} />
            </TouchableOpacity>
          </Left>
          
          <Right>
            {/* <TouchableOpacity  style={{marginRight: 10}}>
              <Icon name='search'  style={{color:"white"}} size={28} />
            </TouchableOpacity> */}
            <DropDownMenu navigation={this.navigation}></DropDownMenu>
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
                {!this.props.library.currentLesson.lessons_completed && <Button full style={styles.markDownButton} onPress={this.markAsDone}>
                    <Text style={styles.markDownTitle}>Mark as Done</Text>
                  </Button>
                }
                {this.props.library.currentLesson.lessons_completed  && 
                <Button full success onPress={this.markAsIncomplete}>
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
            <View style={{alignItems: "flex-end", marginRight: 20}}>
              <TouchableOpacity onPress={() => this.setState({showCommentModal: true})}>
                <View style={{width: 50, aspectRatio: 1, backgroundColor: "#0099ff", alignItems: "center", justifyContent: 'center', borderRadius: 25}}>
                  <Icon name='add' size={35} color="black" />
                </View>
              </TouchableOpacity>
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

