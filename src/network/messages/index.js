import firbase from '../../firebase/config'

export const senderMsg = async(msgValue,currentUserId,guestUserId,img)=>{
    try{
        return await firbase
        .database()
        .ref('messages/'+currentUserId)
        .child(guestUserId)
        .push({
            message:{
                sender:currentUserId,
                reciever:guestUserId,
                msg:msgValue,
                img:img
            }
           
        })
        
    }catch(err){
        return(err)
    }
}

export const receiverMsg = async(msgValue,currentUserId,guestUserId,img)=>{
    try{
        return await firbase
            .database()
            .ref('messages/'+guestUserId)
            .child(currentUserId)
            .push({
                message:{
                    sender:currentUserId,
                    reciever:guestUserId,
                    msg:msgValue,
                    img:img
                }
               
            })

        
    }catch(err){
        return(err)
    }
}

