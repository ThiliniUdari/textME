import React, { useState, useContext } from 'react'
import { SafeAreaView,Text, View, TextInput } from 'react-native'
import {globalStyle,color} from '../../utility'
import {Logo, InputField, RoundCornerButton} from '../../component'
import { Store } from "../../context/store";
import {LOADING_START, LOADING_STOP} from '../../context/actions/types';
import { SignUpRequest, AddUser } from '../../network';
import {setAsyncStorage,keys } from '../../asyncStorage'
import { setUniqueValue} from '../../utility/constants';
import firebase from '../../firebase/config'

const SignUp =({navigation})=>{

    const globalState = useContext(Store);
    const { dispatchLoaderAction } = globalState;

    const [credentials,setCredentials,formData,setFormData] = useState({
        name:'',
        email:'',
        password:'',
        confPassword:''
    })
    const {name,email,password,confPassword}= credentials
    
    const onBtnPress=()=>{
        if(!name){
            alert("Name is required")
        }else if(!email){
            alert("Email is required")
        }else if(!password){
            alert("Password is required")
        }else if(password !== confPassword){
            alert("Password is not matched")
        }else{
            dispatchLoaderAction({
                type:LOADING_START
            })
            SignUpRequest(email,password)
            .then((res)=>{
                if(!res.additionalUserInfo){
                    dispatchLoaderAction({
                        type:LOADING_STOP
                    })
                    alert(res)
                    return;
                }
                let uid=firebase.auth().currentUser.uid;
                let profileImg='';
                AddUser(name,email,uid,profileImg)
                .then(()=>{
                    setAsyncStorage(keys.uuid,uid)
                    setUniqueValue(uid)
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
                <InputField  placeholder="Name" style={{backgroundColor:color.BLACK}} 
                value={name}
                onChangeText={(text)=>handleChange('name',text)}
                />
                <InputField  placeholder="Email" style={{backgroundColor:color.BLACK}} 
                value={email}
                onChangeText={(text)=>handleChange('email',text)}
                />
                <InputField  placeholder="Password" secureTextEntry={true} 
                value={password}
                onChangeText={(text)=>handleChange('password',text)}
                /> 
                <InputField  placeholder="Confirm Password" secureTextEntry={true} 
                value={confPassword}
                onChangeText={(text)=>handleChange('confPassword',text)}
                />

                <RoundCornerButton title="SignUp" onPress={()=>onBtnPress()}/>
                <Text 
                style={{fontSize:18,
                        fontWeight:"bold",
                        color:color.BLUE
                }}
                onPress={()=>navigation.navigate('Login')}
                >
                Login 
                </Text>           
            </View>
        </SafeAreaView>
    )
}
export default SignUp;

