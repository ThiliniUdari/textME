import React, { useLayoutEffect, useContext, useState, useEffect } from 'react'
import { View,Text, Alert, SafeAreaView, FlatList } from 'react-native'
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { color } from '../../utility'
import { LogOutUser, UpdateUser } from '../../network'
import { clearAsyncStorage } from '../../asyncStorage'
import firebase from '../../firebase/config'
import {Store} from '../../context/store'
import {LOADING_START,LOADING_STOP} from '../../context/actions/types'
import {uuid} from '../../utility/constants'
import {Profile, ShowUsers} from '../../component'
import ImagePicker from 'react-native-image-picker'

const Dashboard =({navigation})=>{

    const globalState = useContext(Store);
    const { dispatchLoaderAction } = globalState;
    
    const [userDetails,setUserDetails]=useState({
        id:'',
        name:'',
        profileImg:''
    });

    const {name,profileImg} = userDetails;
    const [allUsers,setAllUsers] = useState([]);

    useLayoutEffect(()=> {
        navigation.setOptions({
            headerRight:()=>(
                <SimpleLineIcon
                name="logout"
                size={26}
                color={color.WHITE}
                style={{right:10}}
                onPress={()=> Alert.alert('Logout','Are you sure you want to leave ?'
                ,[
                    {
                        text:'Yes',
                        onPress:() => logout(),
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
            // headerLeft:()=>(
            //     <FontAwesome5
            //     name="user-edit"
            //     style={{left:10}}
            //     size={20}
            //     color={color.WHITE}
            //     onPress={navigation.navigate('EditProfile',{
            //         name,
            //         imgText:name.charAt(0),
            //         currentUserId:uuid
            //     })}
            //   />
            // )
        });
    },[navigation]);

    useEffect(()=>{
        dispatchLoaderAction({
            type:LOADING_START
        });
        try{
            firebase
            .database()
            .ref("users")
            .on('value',(dataSnapshot)=>{
                let users=[];
                let currentUser={
                    id:'',
                    name:'',
                    profileImg:''
                };
                dataSnapshot.forEach((child)=>{
                    if(uuid === child.val().uuid){
                        currentUser.id=uuid;
                        currentUser.name=child.val().name;
                        currentUser.profileImg=child.val().profileImg;
                    }else{
                        users.push({
                            id:child.val().uuid,
                            name:child.val().name,
                            profileImg:child.val().profileImg
                        });
                    }
                });
                setUserDetails(currentUser);
                setAllUsers(users);
                dispatchLoaderAction({
                    type:LOADING_STOP
                })
            })
        }catch(err){
            dispatchLoaderAction({
                type:LOADING_STOP
            })
            alert(err)
        }
    },[])
 
    /* Profile Edit Tapped*/
    const selectImgTapped =()=>{
        const option ={
            storageOption:{
                skipBackup:true
            }
        }
        ImagePicker.showImagePicker(option,(response)=>{
            if(response.didCancel){
                console.log("User cancel Image Picker");
            }else if(response.error){
                console.log("Image Picker error",response.error)
            }else{
                let source = "data:image/jpeg;base64," + response.data;
   
                dispatchLoaderAction({
                  type: LOADING_START,
                });     
                UpdateUser(uuid,source)
                .then(()=>{
                    setUserDetails({
                        ...userDetails,
                        profileImg:source
                    });
                    dispatchLoaderAction({
                        type: LOADING_STOP,
                      });
                    //   clearAsyncStorage()
                })
                .catch((err)=>{
                    dispatchLoaderAction({
                        type: LOADING_STOP,
                      });  
                      alert(err)
                })       
            
            }
        })
    }

    /*User Logout */
    const logout =()=>{
        LogOutUser()
        .then(()=>{
            clearAsyncStorage()
            .then(()=>{
                navigation.replace('Splash')
            })
            .catch((err)=>{alert(err)})
        })
        .catch((err)=>{alert(err)})

    }
    /* on image tap */
    const imgTap =(profileImg,name)=>{
        if(!profileImg){
            navigation.navigate('ShowProfile',{
                name,
                imgText:name.charAt(0)
            })
        }else{
            navigation.navigate('ShowProfile',{
                name,
                img:profileImg
            })
        }
    }
    /* on name tap */

    const nameTap =(profileImg,name,guestUserId)=>{
        if(!profileImg){
            navigation.navigate('Chat',{
                name,
                imgText:name.charAt(0),
                guestUserId,
                currentUserId:uuid
            })
        }else{
            navigation.navigate('Chat',{
                name,
                img:profileImg,
                guestUserId,
                currentUserId:uuid
            })
        }
    }

    return(
        <SafeAreaView style={[{flex:1,backgroundColor:color.LIGHT_BLUE}]}>
            <FlatList
            alwaysBounceVertical={false}
            data={allUsers}
            keyExtractor={(_,index)=> index.toString()}
            ListHeaderComponent ={
                <Profile 
                    img={profileImg}
                    onImgTap={() => imgTap(profileImg, name)}
                    name={name}
                    onEditImgTap={()=>selectImgTapped()}

                    
                />

            }
            renderItem={({item})=>(
                <ShowUsers 
                name={item.name} 
                img={item.profileImg}
                onNameTap={()=>nameTap(item.profileImg,item.name,item.id)}
                onImgTap={() => imgTap(item.profileImg, item.name)}

                />
            )}
            />

                {/* <Text >This is App Dashboard</Text> */}
        </SafeAreaView>
        
    )

}
export default Dashboard;
