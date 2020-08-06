/**
 * React Native App for communicate among frinds and co-workers
 */

import React, { Fragment } from 'react'
import { Text,View } from "react-native";
import Nav from './src/navigation';
import { NavigationContainer } from '@react-navigation/native';
import { Loader } from './src/component';
import {StoreProvider} from './src/context/store'

const App=()=>{
  return(
    <StoreProvider>
      <Nav/>
      <Loader/>
    </StoreProvider>

  )
}
export default App;