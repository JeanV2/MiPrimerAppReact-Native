import React from 'react'
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './Src/Screens/Navigator';



export const App = () => {
  return (
    <NavigationContainer>
       <Navigator/>

      </NavigationContainer>
  )
}

export default App;