import React, { useLayoutEffect } from 'react'
import { View,Text, Alert } from 'react-native'
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons'
import { color } from '../../utility'

const Dashboard =({navigation})=>{
    useLayoutEffect(()=> {
        navigation.setOptions({
            headerRight:()=>(
                <SimpleLineIcon
                name="logout"
                size={26}
                color={color.WHITE}
                style={{right:10}}
                onPress={()=> Alert.alert('Logout','Are you sure you want to leave ?',[
                    {
                        text:'Yes',
                        onPress:() => alert('Logged out'),
                    },
                    {
                        text:'No',
                    }
                ], {
                      cancelable:false,  
                    }
                    )}
                />
            ),
                });
    },[navigation]);
   
    return(
        <View>
            <Text >This is App Dashboard</Text>
        </View>
    )

}
export default Dashboard;
