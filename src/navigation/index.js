import * as React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import {Login,SignUp,Dashboard, Splash} from'../container'
import {color} from '../utility'
import Chat from '../container/Chat'

const Stack = createStackNavigator();

function NavContainer(){
    return(
        <NavigationContainer>
            <Stack.Navigator 
            initialRouteName ='Splash'
            screenOptions= {{
                headerShown:true,
                headerStyle:{backgroundColor:color.THEME_CLR},
                headerTintColor:color.WHITE,
                headerTitleAlign:'center',
                headerTitleStyle:{
                    fontWeight:'bold',
                    fontSize:20
                }
            }}
            >
                <Stack.Screen name='Splash' component={Splash} options={{headerShown:false}}/>
                <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
                <Stack.Screen name='SignUp' component={SignUp} options={{headerShown:false}}/>
                <Stack.Screen name='Dashboard' component={Dashboard} options={{headerTitle:'textME',headerLeft:null,headerShown:true }}/>
                <Stack.Screen name='Chat' component={Chat} options={{headerBackTitle:null,}}/>
            </Stack.Navigator>
            </NavigationContainer>
    );
}
export default NavContainer;
