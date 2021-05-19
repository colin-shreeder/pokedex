import React from 'react';
import {View, Text, ScrollView, StyleSheet, Image, Dimensions, ImageBackground, FlatList, TouchableWithoutFeedback} from 'react-native'
import {ListItem, List} from 'native-base'
var ballBackground = require('../assets/Background.png')

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

class SearchBody extends React.Component{
    
    render(){
        var pokemon = this.props.data;
        if(!pokemon){
            return <View/>}
        
        return(
            <ImageBackground 
                style={styles.backgroundImage}
                source={ballBackground}
            >
                <ScrollView style={{flex: 1}}> 
                    <Text style={styles.header}> {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}  - #{pokemon.id}  </Text>
                    <View style={styles.viewStyle}>
                        <Image 
                            source={{uri: pokemon.sprites.front_default}}
                            style={styles.img}
                        />
                        <Image 
                            source={{uri: pokemon.sprites.back_default}}
                            style={styles.img}
                        />
                        
                    </View>
                    <View style={styles.info}>

                        <ListItem itemDivider>
                            <Text style={{fontWeight:'bold'}}>Types</Text>
                        </ListItem>

                        <List
                            dataArray={pokemon.types}
                            renderRow={(item)=>
                                <ListItem>
                                    <Text>{item.type.name.charAt(0).toUpperCase() + item.type.name.slice(1)}</Text>
                                </ListItem>
                            }
                        ></List>


                        
                        <ListItem itemDivider>
                            <Text style={{fontWeight:'bold'}}>Size</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Weight - {pokemon.weight}kg</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Height - {pokemon.height/10}m</Text>
                        </ListItem>
                        
                        <ListItem itemDivider>
                            <Text style={{fontWeight:'bold'}}>Abilities</Text>
                        </ListItem>

                        <List
                            dataArray={pokemon.abilities}
                            renderRow={(item)=>
                                <ListItem>
                                    <Text>{item.ability.name.charAt(0).toUpperCase() + item.ability.name.slice(1)}</Text>
                                </ListItem>
                            }
                        ></List>
                        
                        <ListItem itemDivider>
                            <Text style={{fontWeight:'bold'}}>Moves</Text>
                        </ListItem>

                        <List
                            dataArray={pokemon.moves}
                            renderRow={(item)=>
                                <ListItem>
                                    <Text>{item.move.name.charAt(0).toUpperCase() + item.move.name.slice(1)}</Text>
                                </ListItem>
                            }
                        ></List>
                    </View>
                </ScrollView>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    header: {
      fontSize: 30,
      color: 'white',
      textAlign: 'center'
    },
    viewStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        // borderColor: 'pink',
        // borderWidth: 1
    },
    img: {
        height: 200,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        // borderColor: 'white',
        // borderWidth: 1
    },
    info: {
        flex: 1,
        backgroundColor: 'white',
        opacity: 0.8
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        height: height,
        width: width,
        opacity: 1
    }
  });

export default SearchBody;