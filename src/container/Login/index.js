import React, { useState ,useContext} from 'react'
import { SafeAreaView,Text, View, TextInput } from 'react-native'
import {globalStyle,color} from '../../utility'
import {Logo, InputField, RoundCornerButton} from '../../component'
import { Store } from "../../context/store";
import {LOADING_START, LOADING_STOP} from '../../context/actions/types';
import { LoginRequest } from '../../network';
import { setAsyncStorage, keys } from '../../asyncStorage';
import { setUniqueValue } from '../../utility/constants';

const Login =({navigation})=>{

    const globalState = useContext(Store);
    const { dispatchLoaderAction } = globalState;

    const [credentials,setCredentials,formData,setFormData] = useState({
        email:'',
        password:''
    })
    const {email,password}= credentials
    
    const onBtnPress=()=>{
        if(!email){
            alert("Email is required")
        }else if(!password){
            alert("Password is required")
        }else{
            dispatchLoaderAction({
                type:LOADING_START
            })
            LoginRequest(email,password)
            .then((res)=>{
                setAsyncStorage(keys.uuid,res.user.uid)
                setUniqueValue(res.user.uid)
                dispatchLoaderAction({
                    type:LOADING_STOP
                })
                navigation.replace('Dashboard')
            })
            .catch((err)=>{
                dispatchLoaderAction({
                    type:LOADING_STOP
                })
                alert(err)
            })
        }
    }
    const handleChange=(name,value)=>{
        setCredentials({
            ...credentials,
            [name]:value
        })
    }

   
    return(
        <SafeAreaView
           style={{backgroundColor:color.THEME_CLR,flex:1}} 
        >
            <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
                <Logo/>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center',flex:2}}>
                <InputField  placeholder="Email" style={{backgroundColor:color.BLACK}} 
                value={email}
                onChangeText={(text)=>handleChange('email',text)}
                />
                <InputField  placeholder="Password" secureTextEntry={true} 
                value={password}
                onChangeText={(text)=>handleChange('password',text)}
                /> 

                <RoundCornerButton title="LOGIN" onPress={()=>onBtnPress()}/>
                <Text 
                style={{fontSize:18,
                        fontWeight:"bold",
                        color:color.BLUE
                }}
                onPress={()=>navigation.navigate('SignUp')}
                >
                Don't have an account yet? SignUp  
                </Text>           
            </View>
        </SafeAreaView>
    )
}
export default Login;

