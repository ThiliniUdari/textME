import AsyncStorage from "@react-native-community/async-storage"

export const keys ={
    uuid:'uuid',
}

const setAsyncStorage = async(key,item)=>{
    try{
        await AsyncStorage.setItem(key, item);
    }catch(err){
        console.log(err)
    }
}

const getAsyncStorage = async(key)=>{
    try{
        const value = await AsyncStorage.getItem(key);
        if(value) return value;
        return null;
    }catch(err){
        console.log(err)
        return null;
    }
}

const clearAsyncStorage=()=>{
    try{
        await AsyncStorage.clear()
    }catch(err){
        console.log(err)
    }
}

export {setAsyncStorage,getAsyncStorage,clearAsyncStorage}