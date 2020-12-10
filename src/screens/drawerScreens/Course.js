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
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Bullets  }from "react-native-easy-content-loader"
import * as Progress from 'react-native-progress';

// import {bindActionCreators} from 'redux';
  class CourseScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
        categoryList: [],
        loading: true,
        progress: 0,
      };
      this.navigation = props.navigation;
      if(props.user.token != null) {
        this.getCategories(props.library.currentProduct.id, props.user.token)
      }
      else{ 
        this.navigation.navigate('LoginScreen')
      }      
    }
    getCategories(product_id, token) {
      APIService.getCategories(product_id, token)
        .then(res=>res.json())
        .then(async (res)=>{
          this.setState({categoryList: res.data})
          this.props.registerCategories(this.state.categoryList)
          let totalLessons = 0;     
          let progressValue = 0;   
          this.props.setCurrentCategory(this.state.categoryList[0])
          for (let i = 0; i < this.state.categoryList.length; i++) {
            progressValue  = i/this.state.categoryList.length;
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
          this.setState({loading: false})
          this.props.registerTotalLessons(totalLessons)
        })
        .catch(err=>{
          console.log(err);
        })
    }

    viewLesson(category_id, lesson) {
      this.props.setCurrentLesson(lesson);
      for (let i = 0; i < this.props.library.categoryList.length; i++) {
        if ( this.props.library.categoryList[i].id == category_id) {
          this.props.setCurrentCategory(this.props.library.categoryList[i])
          this.navigation.navigate('ViewLessonScreen')
        }
      }
    }
    render() {
      let Categories = [];
      for (let i = 0; i < this.props.library.categoryList.length; i++) {
        /**
         * push lessons
         */
        let category_id = this.props.library.categoryList[i].id;
        let Lessons = [];
        if ( this.props.library.lessonList[category_id] != undefined) {
          for (let j = 0; j < this.props.library.lessonList[category_id].length; j++) {
            Lessons.push(
                <ListItem thumbnail key={this.props.library.lessonList[category_id][j].id}>
                   <TouchableOpacity
                    activeOpacity={0.3}
                    style={styles.lessonItem}
                    onPress={() => {this.viewLesson(category_id, this.props.library.lessonList[category_id][j])}}
                    >
                      <Left>
                        <Thumbnail square source={require("../../assets/images/avatar.png")}  />
                      </Left>
                      <Body>
                        <Text style={{fontSize:16}}>{this.props.library.lessonList[category_id][j].title}</Text>                        
                      </Body>
                      <Right>
                        <Text note numberOfLines={1} style={{color: "grey"}}>3:43</Text>
                      </Right>
                  </TouchableOpacity>
                </ListItem>
            )
          }
        }
        /**
         *  push categories
         */
        Categories.push(
          <Collapse 
            key={this.props.library.categoryList[i].id}  
            >           
            <CollapseHeader>
              {/* <Separator bordered> */}
                <View style={{height: 60, paddingHorizontal: 15, justifyContent: "space-between", alignItems: "center", borderBottomWidth: 1, borderBottomColor:"#bbbbbb", flex:1, flexDirection:"row", }}>
                  <Text style={styles.categoryTitleText}>{this.props.library.categoryList[i].name}</Text>
                  <Icon name="chevron-right"  size={30} color="grey"/>
                </View>
              {/* </Separator> */}
            </CollapseHeader>
            <CollapseBody>
              {Lessons}
            </CollapseBody>
          </Collapse>
          // <List key={this.props.library.categoryList[i].id}>
          //   <ListItem itemHeader first style={styles.categoryListItem}>
          //     <Text style={styles.categoryTitleText}>{this.props.library.categoryList[i].name}</Text>
              // <Body></Body>
              //   <TouchableOpacity
              //     activeOpacity={0.3}
              //     >
              //     <Right>
              //       <Icon name="chevron-right"  size={30} color="grey"/>
              //     </Right>
              //   </TouchableOpacity>
          //   </ListItem>
          //   {Lessons}
          // </List>
        )
      }
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
                  onPress={() => this.navigation.navigate('ViewLessonScreen')}
                  >
                    <Icon name='play-arrow' size={30} color="white"/>
                </Button>
                <Text style={styles.lessonTitle}>
                  {this.props.library.currentProduct.title}
                </Text>
                {!this.state.loading &&
                  <Text style={styles.libraryDataInfo}>
                    {this.props.library.categoryList.length} categroies, {this.props.library.totalLessons} video lessons
                  </Text>
                }
              </View>
            </View>
            {/* <View style={{justifyContent: "cetner"}}> */}
            
            { this.state.loading && <Progress.Bar width={null} height={2} borderRadius = {0} progress={this.state.progress} color={'#6100e5'} borderWidth={0}/>
            }
            {this.state.loading &&  <Bullets active listSize={15} />}
             
            {/* </View> */}
            {!this.state.loading && Categories}
            <View style={styles.biographyLayout}>
              <Text style={styles.biographyTitle}>Description</Text>
              <CardItem style={styles.biographyContextCard}>
                <Text style={styles.biographyText}>
                  {this.props.library.currentProduct.description}
                </Text>
              </CardItem>
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
  lessonItem: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
  }

});

const mapStateToProps = (state) => {
  return {
    user: state.user,
    library: state.library
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({registerCategories,registerLessons,registerTotalLessons,setCurrentCategory, setCurrentLesson}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(CourseScreen);
// export default CourseScreen;
