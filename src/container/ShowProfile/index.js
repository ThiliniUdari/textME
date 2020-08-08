import React, { useLayoutEffect,Fragment } from 'react'
import {View, Text ,Image, StyleSheet} from 'react-native'
import { globalStyle,color } from '../../utility';

const ShowProfile=({route,navigation})=>{
    const {params}= route;
    const {name,img,imgText} =params;

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle:<Text>{name}</Text>
        })
    },[navigation])
    return(
        <Fragment>
            {img?(
                    <Image 
                        source={{uri:img}} 
                        style={{flex:2}}
                        resizeMode="cover"
                    />
                )
                :(
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex:1,
                        backgroundColor:color.LIGHT_BLUE}}>
                        <Text style={styles.text}>{imgText}</Text>
                    </View>
                )
            }
        </Fragment>
    )
}

const styles=StyleSheet.create({
    text:{color:color.WHITE,fontSize:200,fontWeight:"bold"},
    
})
export default ShowProfile;