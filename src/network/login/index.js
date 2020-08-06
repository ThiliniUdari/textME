import firbase from '../../firebase/config'

const loginRequest = async(email,password)=>{
    try{
        return await firbase.auth().signInWithEmailAndPassword(email,password)
        
    }catch(err){
        return(err)
    }
}

export default loginRequest