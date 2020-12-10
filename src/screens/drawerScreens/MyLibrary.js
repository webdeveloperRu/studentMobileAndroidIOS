import React,{Component} from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {APIService} from '../../service'
import {bindActionCreators} from 'redux';
import {registerProducts} from '../../redux/actions/libraryActions';
import {setCurrentProduct} from '../../redux/actions/libraryActions'
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
class MyLibraryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      isLoading: false,
    };
    this.navigation = props.navigation;
    if(props.user.token != null) {
      this.getMyProducts()
    }
    else{ 
      this.navigation.navigate('LoginScreen')
    }
    // this.getMyProducts();
  }
  getMyProducts = () => {
    APIService.getMyProducts(this.props.user.token)
    .then(res=>res.json())
      .then(res=>{
        this.state.productList = res.data
        this.props.registerProducts(this.state.productList)
      })
      .catch(err=>{
        console.log(err);
      })
  }
  viewCategory=(product)=>{
    this.props.setCurrentProduct(product)
    this.navigation.navigate('CourseScreen')
  }
  render() {
    let products = []
    let productList = this.props.library.productList
    for(let i = 0; i <productList.length; i++){
      products.push(
        <Card style={styles.libraryCard} key={i}>
          <CardItem cardBody>
            <ImageOverlay
              source={require("../../assets/images/background3.jpg")} 
              style={styles.libraryCardBody}>
                <TouchableOpacity 
                  style={styles.playButton}
                  onPress={() => this.viewCategory(productList[i])}
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
                <Thumbnail source={require("../../assets/images/background3.jpg")} style={styles.libraryCardDescriptionThumbNail}/>
              </TouchableOpacity>
              <View style={styles.descriptionPart}>
                <Text style={styles.descriptionTitle}>
                  {productList[i].description.substring(0, 200)}...
                </Text>
                <Text style={styles.productTitle}>
                  {productList[i].title}
                </Text>
              </View>
            </Body>
          </CardItem>
        </Card>
      )
    }
    return (
      <Container style={styles.container}>        
          <ScrollView>
            {products}
          </ScrollView>
        </Container>
    );
  }
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
    // alignItems: "center",
    borderTopColor: "black",
  },
  descriptionPart: {
    flex: 1,
    flexDirection: "column"
  },
  descriptionTitle: {
    fontSize: 16,
  },
  productTitle: {
    fontSize: 18,
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
const mapStateToProps = (state) => {
  return {
    user: state.user,
    library: state.library
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({registerProducts,setCurrentProduct}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(MyLibraryScreen);
// export default MyLibraryScreen;