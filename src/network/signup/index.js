import firbase from '../../firebase/config'

const signupRequest = async(email,password)=>{
    try{
        return await firbase
        .auth()
        .createUserWithEmailAndPassword(email,password)
        
    }catch(err){
        return(err)
    }
}
export default signupRequest