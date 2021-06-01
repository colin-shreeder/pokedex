// import { StatusBar } from 'expo-status-bar';
// <StatusBar style="auto" />


import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Landing from './src/Landing';
import Search from './src/Search';
import SearchBody from './src/SearchBody';




const navigator = createStackNavigator(
  {
    Search: Search,
    SearchBody: SearchBody,
    Landing: Landing
  }, 
  {
    initialRouteName: 'Landing',
    defaultNavigationOptions: {
      title:'PokeDex',
    },
  }
);

export default createAppContainer(navigator);