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
  Separator,
  Thumbnail
  } from 'native-base';
import {connect} from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { APIService } from '../../service';
import {bindActionCreators} from 'redux';
import {registerCategories} from '../../redux/actions/libraryActions';
import {registerLessons} from '../../redux/actions/libraryActions';
import {registerTotalLessons} from '../../redux/actions/libraryActions';
import {setCurrentCategory} from '../../redux/actions/libraryActions';
import {setCurrentLesson} from '../../redux/actions/libraryActions';
import {registerComments} from '../../redux/actions/libraryActions';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Bullets  }from "react-native-easy-content-loader"
import { ImageOverlay } from "../../components/image-overlay";
import * as Progress from 'react-native-progress';

// import {bindActionCreators} from 'redux';
  class CourseScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
        categoryList: [],
        loading: true,
        progress: 0,
        lessonsCount: 0,
        categories: [],
        lesssons:[],
        completedLessonsCount: 0,
        completedProgress: 0,
      };
      this.navigation = props.navigation;
    }
    componentDidMount() {
      if(this.props.user.token != null) {
        this.getCategories(this.props.library.currentProduct.id, this.props.user.token)
        return true;

      }
      else{ 
        this.navigation.navigate('LoginScreen')
        return false;
      }
     
    }
   
  
    getCategories(product_id, token) {
      APIService.getCategories(product_id, token)
        .then(res=>res.json())
        .then(async (res)=>{
          this.setState({categoryList: res.data})
          this.props.registerCategories(res.data)
          let totalLessons = 0;     
          let progressValue = 0;   
          this.props.setCurrentCategory(this.state.categoryList[0])
          for (let i = 0; i < this.props.library.categoryList.length; i++) {
          // for (let i = 0; i <1; i++) {
            progressValue  = i/this.state.categoryList.length;
            // progressValue  = i/1;
            this.setState({progress: progressValue})
            await APIService.getLessons(this.state.categoryList[i].id, token)
            .then(res=>res.json())
            .then(res=>{
              totalLessons = totalLessons + res.data.length;
              this.props.registerLessons(res.data, this.state.categoryList[i].id);
            })
            .catch(err=>{
              console.log(err)
            })
          }
          let currentLesson=this.props.library.lessonList[this.state.categoryList[0].id][0];
          this.props.setCurrentLesson(currentLesson)
          this.setState({loading: false})
          this.props.registerTotalLessons(totalLessons)
          this.setState({lessonsCount: totalLessons})
          this.prepareComponent()
          
        })
        .catch(err=>{
          console.log(err);
        })

    }
    playVideo() {
      APIService.getComments(this.props.library.currentLesson.id, this.props.user.token)
        .then(res=>res.json())
        .then(res=>{
          this.props.setCurrentCategory(this.props.library.categoryList[0]);
          if(res.data != undefined){
          } else{
            this.props.registerComments(res.data);
          }
          this.navigation.navigate('ViewLessonScreen');
        })
        .catch(err=>{
          console.log(err);
        })
    }
   
    viewLesson(category_id, lesson) {
      this.props.setCurrentLesson(lesson);
      APIService.getComments(lesson.id, this.props.user.token)
        .then(res=>res.json())
        .then(res=>{
          this.props.registerComments(res.data)
          for (let i = 0; i < this.props.library.categoryList.length; i++) {
            if ( this.props.library.categoryList[i].id == category_id) {
              this.props.setCurrentCategory(this.props.library.categoryList[i])
              this.navigation.navigate('ViewLessonScreen')
            }
          }
        })
        .catch(err=>{
          console.log( err);
        })
    }
    prepareComponent() {
      let categories = [];
      let completedLessonsCount = 0;
      if(this.props.library.categoryList.length !=0){
        for (let i = 0; i < this.props.library.categoryList.length; i++) {
        // for (let i = 0; i < 1; i++) {
          /**
           * push lessons
           */
          let category_id = this.props.library.categoryList[i].id;
          let Lessons = [];
          if ( this.props.library.lessonList[category_id] != undefined) {
            for (let j = 0; j < this.props.library.lessonList[category_id].length; j++) {
              if (this.props.library.lessonList[category_id][j].lessons_completed) {
                completedLessonsCount = completedLessonsCount +1
              }

              Lessons.push(
                  // <ListItem thumbnail key={this.props.library.lessonList[category_id][j].id}>
                  //    <TouchableOpacity
                  //     activeOpacity={0.3}
                  //     style={styles.lessonItem}
                  //     onPress={() => {this.viewLesson(category_id, this.props.library.lessonList[category_id][j])}}
                  //     >
                  //       <Body style={{flex:1, flexDirection:"row", alignItems:"center"}}>
                  //         {this.props.library.lessonList[category_id][j].lessons_completed && <Icon name="check-circle" size={30} color="#2bad95"></Icon>}
                  //         <Text style={{fontSize:16}}>{this.props.library.lessonList[category_id][j].title}</Text> 
                  //       </Body>
                  //       <Right>
                  //         <TouchableOpacity style={{borderColor: "red", width:30, height:30 }}>
                  //         {this.props.library.lessonList[category_id][j].lessons_completed && <Icon name="check" size={15} color="#2bad95"></Icon>}
                  //         </TouchableOpacity>
                  //       </Right>
                  //   </TouchableOpacity>
                  // </ListItem>
                   <ListItem key={this.props.library.lessonList[category_id][j].id}>
                     <TouchableOpacity
                      activeOpacity={0.3}
                      style={styles.lessonItem}
                      onPress={() => {this.viewLesson(category_id, this.props.library.lessonList[category_id][j])}}
                      >
                        <Left style={{flex:1, flexDirection:"row", alignItems:"center"}}>
                          {this.props.library.lessonList[category_id][j].lessons_completed && <Icon name="check-circle" size={25} color="#2bad95"></Icon>}
                          {!this.props.library.lessonList[category_id][j].lessons_completed && <Icon name="play-circle-fill" size={25} color="grey"></Icon>}
                          <View style={{marginLeft:10}}>
                            <Text style={{fontSize:16}}>{this.props.library.lessonList[category_id][j].title}</Text> 
                            <Text style={{fontSize:12, color:'grey'}}>5:40</Text> 
                          </View>
                        </Left>
                        <Right>
                          <TouchableOpacity >
                          {this.props.library.lessonList[category_id][j].lessons_completed && <Icon name="check-circle-outline" size={20} color="#2bad95"></Icon>}
                          {!this.props.library.lessonList[category_id][j].lessons_completed && <Icon name="arrow-circle-down" size={20} color="#2bad95"></Icon>}
                          </TouchableOpacity>
                        </Right>
                    </TouchableOpacity>
                  </ListItem>
              )
            }
          }
          /**
           *  push categories
           */
          categories.push(
            // <Collapse 
            //   key={this.props.library.categoryList[i].id}  
            //   >           
            //   <CollapseHeader>
            //     {/* <Separator bordered> */}
            //       <View style={{height: 60, paddingHorizontal: 15, justifyContent: "space-between", alignItems: "center", borderBottomWidth: 1, borderBottomColor:"#bbbbbb", flex:1, flexDirection:"row", }}>
            //         <Text style={styles.categoryTitleText}>{this.props.library.categoryList[i].name}</Text>
            //         <Icon name="chevron-right"  size={30} color="grey"/>
            //       </View>
            //     {/* </Separator> */}
            //   </CollapseHeader>
            //   <CollapseBody>
            //     {Lessons}
            //   </CollapseBody>
            // </Collapse>
            <View 
            key={this.props.library.categoryList[i].id}  
            >           
              {/* <Separator bordered> */}
                <View style={styles.categoryTitleItem}>
                  <Text style={styles.categoryTitleText}>{this.props.library.categoryList[i].name}</Text>
                </View>
              {/* </Separator> */}
              {Lessons}
          </View>
          )
        }
      }
      console.log('compoleted count', completedLessonsCount)
      this.setState({categories: categories})
      this.setState({completedLessonsCount: completedLessonsCount})

      if(this.state.lessonsCount !=0){
        let progress = this.state.completedLessonsCount/this.state.lessonsCount;
        this.setState({completedProgress: progress})
      }
      else {
        this.setState({completedProgress: 0})
      }
    }
    render() {
      return (
        <Container style={styles.container}>
          <Header style={{backgroundColor: "#0099ff"}}>
            <Left>
              <TouchableOpacity onPress={()=>{this.navigation.navigate('MyLibraryScreen')}}>
                <Icon name='chevron-left' style={{color:"white"}} size={35} />
              </TouchableOpacity>
            </Left>
            <Body>
              <Title>{this.props.library.currentProduct.title}</Title>
            </Body>
            <Right>
              <TouchableOpacity >
                <Icon name='info-outline'  style={{color:"white"}} size={28} />
              </TouchableOpacity>
            </Right>
          </Header>
          { this.state.loading && <Progress.Bar width={null} height={2} borderRadius = {0} progress={this.state.progress} color={'#6100e5'} borderWidth={0}/>
              }
          <ScrollView>
              <ImageOverlay style={styles.selectedLessonLayout}
                source={{uri:this.props.library.currentProduct.thumbnail}} 
                >
                {!this.state.loading &&
                  <View style={{flex:1, flexDirection:"column", justifyContent:"flex-end", marginBottom: 20}}>
                    <View style={{justifyContent: 'space-between', flexDirection:"row"}}>
                      <Text style={{color:"grey", height:30, marginLeft:10}}> {Math.floor(this.state.completedProgress*100)}% complete</Text>
                      <Text style={{color:"grey", height:30, marginRight:10}}> {this.state.completedLessonsCount}/{this.state.lessonsCount} lessons</Text>
                    </View>
                    <Progress.Bar width={null} height={4} borderRadius = {0} progress={this.state.completedProgress} color={'#6100e5'} borderWidth={0} unfilledColor="#e3e3e3" style={{marginHorizontal:10}} />
                  </View>   
                }
              </ImageOverlay>
            <View >
              {/* <Image source={{uri:this.props.library.currentProduct.thumbnail}} style={{height: 250, width: null, flex: 1,}}/> */}
              {/* <View style={styles.lessonDescriptionLayout}> 
                 {!this.state.loading &&
                  <TouchableOpacity                 
                    style={styles.lessonPlayButton}
                    onPress={() => this.playVideo()}
                    >
                      <Icon name='play-arrow' size={30} color="white"/>
                  </TouchableOpacity>
                } */}
                {/* <Button   rounded              
                  style={styles.lessonPlayButton}
                  onPress={() => this.playVideo()}
                  >
                    <Icon name='play-arrow' size={30} color="white"/>
                </Button> */}
                {/* <Text style={styles.lessonTitle}>
                  {this.props.library.currentProduct.title}
                </Text>
                {!this.state.loading &&
                  <Text style={styles.libraryDataInfo}>
                    {this.props.library.categoryList.length} categroies, {this.props.library.totalLessons} video lessons
                  </Text>
                }
              </View> */}
            </View>
              {/* <View style={{justifyContent: "cetner"}}> */}
              
              
              {this.state.loading && 
                <Bullets active listSize={15} containerStyles={{flex:1, alignSelf:"center", width: '100%', marginLeft:'10%'}}/>
               }
             
            {/* </View> */}
            {!this.state.loading && this.state.categories}
            <View style={styles.biographyLayout}>
              <Text style={styles.biographyTitle}>Instructor</Text>
              <View style={{margin: 10}}>
                <Card>
                  <CardItem style={{marginHorizontal:10}}>
                    <Body style={styles.biographyContextCard} >
                    <View
                      style={{marginRight:10}}
                      >
                      <Thumbnail source={{uri:this.props.library.currentProduct.instructor.headshot}} style={styles.instructorThumbnail}/>
                    </View>
                    <View style={styles.instructorDscriptionPart}>
                      <Text style={styles.instructorName}>{this.props.library.currentProduct.instructor.name}</Text>
                      <Text style={styles.biographyText}>
                        {this.props.library.currentProduct.instructor.description}
                      </Text>
                    </View>
                    </Body>
                  </CardItem>
                </Card>
              </View>
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
    backgroundColor: "#8f8f8f"
  },
  headerTitle: {
    fontSize: 20,
    color: "white"
  },
  selectedLessonLayout: {
    flex:1,
    justifyContent:"flex-end",
    height: 250,
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
    borderRadius: 30,
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
    flex: 1,
    marginBottom: 2,
    flexDirection: "row",
  },
  categoryTitleText: {
    color: "#5f5f5f",
    fontSize: 18,
  },
  biographyLayout: {
    backgroundColor: "#dddddd"
  },
  biographyContextCard: {
    flex: 1,
    flexDirection: "row",
  },
  biographyTitle: {
    marginLeft: 10,
    marginTop: 10,
    fontSize: 18,
  },
  biographyText: {
    color: "#5f5f5f",
    fontSize: 14,
  },
  lessonItem: {
    flex: 1,
    flexDirection: 'row',
  },
  instructorThumbnail: {
    width: 60,
    height: 60,
  },
  instructorName: {
    flex:1,
    color: "#2577f2",
    fontSize: 18,
  },
  instructorDscriptionPart: {
    flex:1,
    flexDirection: "column"
  },
  categoryTitleItem: {
    height: 60, 
    paddingHorizontal: 15, 
    justifyContent: "space-between", 
    alignItems: "center", 
    borderBottomWidth: 1, 
    borderBottomColor:"#eeeeee", 
    flex:1, 
    flexDirection:"row",
    backgroundColor: "#eeeeee"
  }

});

const mapStateToProps = (state) => {
  return {
    user: state.user,
    library: state.library
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({registerCategories,registerLessons,registerTotalLessons,setCurrentCategory, setCurrentLesson, registerComments}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(CourseScreen);
// export default CourseScreen;
