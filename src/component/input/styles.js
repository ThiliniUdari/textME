import {StyleSheet} from "react-native"
import {appStyle, color} from '../../utility'

export default StyleSheet.create({
    input:{
        paddingLeft:16,
        backgroundColor :color.SILVER,
        width:"90%",
        color:color.BLACK,
        height:appStyle.fieldHieght,
        alignSelf:"center",
        marginVertical: appStyle.fieldMarginVertical,
        fontSize : 18
            }
})