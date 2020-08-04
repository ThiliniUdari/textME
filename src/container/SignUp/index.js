import React from 'react'
import { SafeAreaView,Text } from 'react-native'

const SignUp =({navigation})=>{
    return(
        <SafeAreaView>
            <Text onPress={() => navigation.navigate('Dashboard')}>This is App SignUp</Text>
        </SafeAreaView>
    )
}
export default SignUp;
