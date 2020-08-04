/**
 * React Native App for communicate among frinds and co-workers
 */

import React from 'react'
import { Text,View } from "react-native";
import Nav from './src/navigation';
import { NavigationContainer } from '@react-navigation/native';

const App=()=>{
  return(
    <NavigationContainer>
      <Nav></Nav>
    </NavigationContainer>

  )
}
export default App;