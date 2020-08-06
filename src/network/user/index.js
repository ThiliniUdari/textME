import firbase from '../../firebase/config'

const AddUser = async(name,email,uid,profileImg)=>{
    try{
        return await firbase
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
export default AddUser