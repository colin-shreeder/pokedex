import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Platform, ImageBackground, Image, TextInput, TouchableOpacity} from 'react-native';
import {Button, Header, Item, Icon, Input} from 'native-base';
import PokeLoader from './PokeLoader';
import SearchBody from './SearchBody';
import axios from 'axios';
import { Feather } from '@expo/vector-icons';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

class Search extends React.Component {
    state = {
        pokeSearch: "",
        onCall: true,
        data: {}
    }

    // ok so page runs. renderBody is called. render body says if it's the first time, run PokeLoader, otherwise, run SearchBody and the data to it. i'm not sure what on call means tbh... oh looks like it's literally just state i created. and the default setting is true. so if it's still true, we can assume this is the first time the page is getting rendered... as for the get request that happens to the pokemon api, that doesn't run until we're done editing the input box. so when the page first loads, that will NO get called. only after we edit some stuff. then pokeSearch will change based on on our textinput value, and then searchPoke() will run. NOTICE that searchPoke will make the get request with the search query and receive the data, and THEN change onCall to false, which should make it so that <SearchBody> gets rendered and the data gets passed down. but key part, the data will remain there after making this call. soooo if we do this.props.data.id we SHOULD get the pokemon's id. so on swipe, we could simply use setState to change pokeSearch to this.props.data.id + 1. then run searchPoke() so a new getrequest is made....but how do we get renderBody to rerender??? i guess we just call it?? but where does it get called when we call searchPoke()? will it just run again??

    // okay i got an error when i typed this in and re-rendered everything... it says "Can't find variable: config". Idk what that means...cause it's literally RIGHT THERE. oh lol jk, that wasn't specified above. my bad. fixed it. let's try it now. restarting server. ok it's saying onSwipe is not a function, cause clearly when we swipe right, it's trying to call that, but it actually isn't specified above like it's asking. that's what the switch is for... ok i'm getting it. oh wait no, yeah it is. it's saying that about onSwipe. whiiich is actually true. why tf do i have that even there? cause it's at top and it's any direction it'll always run... so what if i remove it?

    // ok i swiped right and got a new error. now it's saying undefined is not an object (evalutating 'pokemone.name.charAt'). ok i have no idea where this .charAt is coming from.... and why does it look like a string?? ok, so undefined is what's coming back when i try to setState?? ok so i'm just gonna change poksearch to 1 on rightswipe. no searching yet. ok so it's still saying, undefined is not an object.

    // gah i'm still getting undefined is not an object. wtf. oh it's referencing js:45... ok so what's there. so search body is trying to be rendered, with data={this.state.data}. is that the issue?
    
    searchPoke = () => {
       
            this.setState({onCall: true});
        var self = this;
        axios.get("http://pokeapi.co/api/v2/pokemon/"+this.state.pokeSearch.toLowerCase())
        .then(function(response){
            self.setState({data: response.data});
            self.setState({onCall: false});
            // console.log(response.data)
        })
        .catch(function(error){
            // console.log(error);
        })
    }

    // clearText = () =>{
    //     this.setState({pokeSearch: ""})
    // }

    renderBody = () => {
        if (this.state.onCall || !this.state.data){
            return(
                <PokeLoader/>
            )
        }else{
            // console.log('renderBody:', this.state.data.id)
            return(
                <SearchBody data={this.state.data}/>
            )
        }
    }

    // onSwipeLeft(gestureState) {
    //     this.setState({pokeSearch: this.state.data + 1});
    //     this.searchPoke();
    //     this.renderBody();
    //   }
    
    
    render(){

        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
          };

        return(
            <View style={{flex: 1}}>
                
                {/* <GestureRecognizer
                        onSwipeUp={(state) => this.onSwipeUp(state)}
                        onSwipeDown={(state) => this.onSwipeDown(state)}
                        onSwipeLeft={(state) => this.onSwipeLeft(state)}
                        onSwipeRight={(state) => this.onSwipeRight(state)}
                        config={config}
                        style={{
                        flex: 1,
                        backgroundColor: 'white'
                        }}
                    > */}

                    <Header
                        searchBar={true}
                        rounded={true}
                        style={styles.headerStyle} 
                    >
                        {/* */}
                        
                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={styles.inputStyle} 
                            placeholder="Search Pokémon (Name or #)"
                            value={this.state.pokeSearch}
                            onChangeText={(pokeSearch)=>this.setState({pokeSearch})}
                            onEndEditing={this.searchPoke}
                        />
                        {/* <TouchableOpacity style={styles.viewStyle} onPress={this.searchPoke}> */}
                            <Feather name='search' style={styles.iconStyle} onPress={this.searchPoke} />
                        {/* </TouchableOpacity> */}
                        
                        
                    </Header>
                    {this.renderBody()}
                    
                {/* </GestureRecognizer> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: Platform.OS === "ios" ? 0 : 24
    },
    inputStyle: {
        flex: 1,
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'white',
        height: 40,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        backgroundColor: 'white'
    },
    iconStyle: {
        fontSize: 30,
        alignSelf: 'center',
        justifyContent: 'flex-end',
        // marginHorizontal: 15,
        // borderWidth: 1,
        // borderColor: 'black',
        justifyContent: 'center',
        color: 'white'
    },
    headerStyle: {
        // borderWidth: 1,
        // borderColor: 'black',
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewStyle: {
        width: 80,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        borderWidth: 2,
        borderColor: 'white'
    }
  });

export default Search;