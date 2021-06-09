import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Platform, ImageBackground, Image, Dimensions} from 'react-native';
import {Button} from 'native-base';
var myBackground = require('../assets/landing.jpg')

const isDesktop = Dimensions.get('window').width > 600;

class Landing extends React.Component {
    render(){
        return(
            <View style={styles.container}>
                <ImageBackground source={myBackground} 
                  style={styles.backgroundStyle} imageStyle={isDesktop ?{resizeMode: 'contain'}: {}}>
                    <View style={styles.viewStyle}>
                    <Text 
                        style={styles.titleStyle}
                    >Welcome to PokéDex!</Text>
                    <Button 
                        block={true}
                        style={styles.buttonStyle}
                        onPress={()=>this.props.switchScreen("search")}>
                        <Text style={styles.buttonText}>Find Pokémon</Text>
                    </Button>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: Platform.OS === "ios" ? 0 : 24
    },
    viewStyle: {
      flex:1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    backgroundStyle: {
      width: "100%",
      height: "100%"
      },
    titleStyle: {
      fontSize: 30,
      color: 'blue',
      alignItems: 'center'
    },
    buttonStyle: {
      margin: 10,
      backgroundColor: '#3F51B5'
    },
    buttonText: {
      color: 'white'
    }
  });

export default Landing;