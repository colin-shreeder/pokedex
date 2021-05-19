import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native'

class PokeLoader extends React.Component{
    render(){
        return(
            <View style={styles.parentDiv}>
                <Image
                    source={{uri: "https://media.tenor.com/images/39d6060576a516f1dd437eafccafbdb1/tenor.gif"}}
                    style={styles.img} 
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    img: {
        height: 400,
		width: 400,
		// justifyContent: 'center',
		// alignItems: 'center',
        // borderColor: 'black',
        // borderWidth: 1
    },
    parentDiv: {
        flex: 1,
        // borderColor: 'red',
        // borderWidth: 1,
        justifyContent: 'flex-end'
    }
  });

export default PokeLoader;