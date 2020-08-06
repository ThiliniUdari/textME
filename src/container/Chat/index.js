import React,{ useLayoutEffect, useState, useEffect } from "react";
import {View,Text , SafeAreaView, FlatList, StyleSheet, ImagePickerIOS} from 'react-native'
import { color, appStyle } from "../../utility";
import { InputField } from "../../component";
import Styles from './styles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ChatBox from "../../component/chatBox";
import firebase from '../../firebase/config'
import { senderMsg ,receiverMsg} from "../../network";

const Chat =({route , navigation}) =>{
    const {params}=route;
    const {name,img,imgText,guestUserId,currentUserId}=params;
  
    const [msgValue,setMsgValue]=useState('');
    const [messages,setMessages] =useState([]);

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle:<Text>{name}</Text>
        })
    },[navigation])

    useEffect(()=>{
        try{
           firebase
           .database() 
           .ref('messages')
           .child(currentUserId)
           .child(guestUserId)
           .on('value',(dataSnapshot)=>{
               let msgs=[];
               dataSnapshot.forEach((child)=>{
                   msgs.push({
                       sendBy:child.val().message.sender,
                       recievedBy:child.val().message.receiver,
                       msg:child.val().message.msg,
                       img:child.val().message.img
                   });
               });
               setMessages(msgs.reverse())
           })
        }catch(err){
            alert(err)
        }
    },[])

    const handleSend=()=>{
        setMsgValue('');
        if(msgValue){
            senderMsg(msgValue,currentUserId,guestUserId,'')
            .then(()=>{})
            .catch((err)=>alert(err))

            receiverMsg(msgValue,currentUserId,guestUserId,'')
            .then(()=>{})
            .catch((err)=>alert(err))

        }
     

    }
    const handleCamera=()=>{
        // const option={
        //     storageOptions:{
        //         skipBackup:true
        //     }
        // };

        // ImagePickerIOS, showImagePicker(option,(response)=>{
        //     if(response.didCancel){
        //         console.log('User cancel imagee picker');
        //     }else if(response.error){
        //         console.log('image picker error',response.error);
        //     }else{
        //         //Base Id
        //     }
        // })

    }
    const handleOnChange=(text)=>{
        setMsgValue(text)
    }
    return(
        <SafeAreaView style={{flex:1,backgroundColor:color.LIGHT_BLUE}}>
            <FlatList
                inverted={true}
                data={messages}
                keyExtractor={(_,index)=>index.toString()}
                renderItem={({item})=>(
                    <ChatBox
                        msg={item.msg}
                        userId ={item.sendBy}
                        img={item.img}
                        onImgTap={()=>imgTap(item.img)}
                    />
                    )
                
            }
            />
            {/* Send Message */}
            <View style={Styles.sendMessageContainer}>
                <InputField
                    placeholder ="Type here"
                    numberOfLines={1}
                    inputStyle={Styles.input}
                    value={msgValue}
                    onChangeText={(text)=>handleOnChange(text)}
                />
                <View style={Styles.sendBtnContainer}>
                    <MaterialCommunityIcons
                        name='camera'
                        color={color.WHITE}
                        size={appStyle.fieldHeight}
                        onPress={()=>handleCamera()}
                    />
                    <MaterialCommunityIcons
                        name='send-circle'
                        color={color.WHITE}
                        size={appStyle.fieldHeight}
                        onPress={()=>handleSend()}
                />
                </View>
            </View>
            
        </SafeAreaView>
    )
}
export default Chat;
