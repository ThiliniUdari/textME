import React, { useLayoutEffect, useContext, useState, useEffect } from 'react'
import { View,Text, Alert, SafeAreaView, FlatList } from 'react-native'
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons'
import { color } from '../../utility'
import { LogOutUser } from '../../network'
import { clearAsyncStorage } from '../../asyncStorage'
import firebase from '../../firebase/config'
import {Store} from '../../context/store'
import {LOADING_START,LOADING_STOP} from '../../context/actions/types'
import {uuid} from '../../utility/constants'
import {Profile, ShowUsers} from '../../component'

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

    return(
        <SafeAreaView style={[{flex:1,backgroundColor:color.WHITE}]}>
            <FlatList
            alwaysBounceVertical={false}
            data={allUsers}
            keyExtractor={(_,index)=> index.toString()}
            ListHeaderComponent ={
                <Profile 
                    img={profileImg}
                    name={name}
                />
            }
            renderItem={({item})=>(
                <ShowUsers 
                name={item.name} 
                img={item.profileImg}/>
            )}
            />

                {/* <Text >This is App Dashboard</Text> */}
        </SafeAreaView>
        
    )

}
export default Dashboard;
