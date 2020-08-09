import React, { useEffect } from 'react'
import {View} from 'react-native'
import {Logo} from '../../component'
import { globalStyle,color } from '../../utility'
import { getAsyncStorage, keys } from '../../asyncStorage'
import { setUniqueValue } from '../../utility/constants'
import { Text, Card } from 'native-base'

const Splash =({navigation})=>{
    useEffect(()=>{
        const redirect=setTimeout(()=>{
            getAsyncStorage(keys.uuid)
            .then((uuid)=>{
                if(uuid){
                    setUniqueValue(uuid)
                    navigation.replace('Dashboard')
                }else{
                    navigation.replace('Login')
                }
            })
            .catch((err)=>{
                console.log(err)
                navigation.replace('Login')
            })
        },5000)
        return()=>clearTimeout(redirect)
    },[navigation])
    return(
        <View style={ [{justifyContent: 'center',
        alignItems: 'center',
        flex: 1,backgroundColor:color.THEME_CLR}]}>
            <Logo/>
           <View style={{
                // alignContent:'flex-end',
                alignItems: 'center',
                justifyContent:'center',alignContent:'center',
                marginTop:400,
                marginBottom:10
           }}>
            <Text style={{
                // alignContent:'flex-end',
                color:color.LIGHT_BLUE,
                fontSize:30,
                fontWeight:'bold',
                
                }}>H.K.T.Udarika</Text> 
            <Text style={{ color:color.LIGHT_BLUE,
                fontSize:30,
                fontWeight:'bold',}}>17001803</Text>
            </View>
        </View>
    )
}

export default Splash;