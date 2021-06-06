import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackNavigator from './src/navigators/StackNavigation'


export default function App() {
  return (
      <SafeAreaProvider>
          <StackNavigator />
      </SafeAreaProvider>
  );
}

// const navigator = createStackNavigator(
//   {
//     Search: Search,
//     SearchBody: SearchBody,
//     Landing: Landing
//   }, 
//   {
//     initialRouteName: 'Landing',
//     defaultNavigationOptions: {
//       title:'PokeDex',
//     },
//   }
// );

// export default createAppContainer(navigator);