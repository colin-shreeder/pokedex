import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Platform, ImageBackground, Image, TextInput, TouchableOpacity} from 'react-native';
import {Button, Header, Item, Icon, Input} from 'native-base';
import PokeLoader from './PokeLoader';
import SearchBody from './SearchBody';
import axios from 'axios';
import { Feather } from '@expo/vector-icons';

class Search extends React.Component {
    state = {
        pokeSearch: "",
        onCall: true,
        data: {}
    }

    
    searchPoke = () =>{
		this.setState({onCall: true});
		if(this.state.pokeSearch === ""){
			return;
		}
		var self = this;
		axios.get("https://pokeapi.co/api/v2/pokemon/"+this.state.pokeSearch.toLowerCase())
		.then(function(response){
			// console.log(response.data);
			self.setState({data: response.data});
			self.setState({onCall: false});
		})
		.catch(function(error){
			console.log(error);
		});
	}

    clearText = () =>{
        this.setState({pokeSearch: ""})
    }

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
    
    
    render(){

        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
          };

        return(
            <View style={{flex: 1, backgroundColor: 'white'}}>
                
               

                    <Header
                        searchBar={true}
                        rounded={true}
                        style={styles.headerStyle} 
                    >

                        
                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={styles.inputStyle} 
                            placeholder="Search Pokémon (Name or #)"
                            value={this.state.pokeSearch}
                            onChangeText={(pokeSearch)=>this.setState({pokeSearch})}
                            onEndEditing={()=>{this.searchPoke();this.clearText();}}
                        />
                        <TouchableOpacity style={styles.viewStyle} onPress={this.searchPoke}>
                            <Feather name='search' style={styles.iconStyle} onPress={()=>{this.searchPoke();this.clearText();}} />
                        </TouchableOpacity>
                        
                        
                    </Header>
                    {this.renderBody()}
                    
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
        backgroundColor: '#3F51B5',
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