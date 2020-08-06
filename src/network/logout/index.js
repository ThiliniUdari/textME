import firebase from '../../firebase/config'

const LogOutUser =async()=>{
   try{
       return await firebase.auth().signOut()
       
   }catch(err){
       return err
   }
}

export default LogOutUser