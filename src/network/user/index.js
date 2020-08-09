import firebase from '../../firebase/config'

export const AddUser = async(name,email,uid,profileImg)=>{
    try{
        return await firebase
        .database()
        .ref("users/" + uid)
        .set({
            name:name,
            email:email,
            uuid:uid,
            profileImg:profileImg
        })
        
    }catch(err){
        return(err)
    }
}

export const UpdateUser = async(uuid,imgSource)=>{
    try{
        return await firebase
            .database()
            .ref("users/"+uuid)
            .update({
                profileImg:imgSource
            })
    }catch(err){
        console.log("image upload error",err)
        return (err)
        
    }

}
