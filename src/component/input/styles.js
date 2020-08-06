import {StyleSheet} from "react-native"
import {appStyle, color} from '../../utility'

export default StyleSheet.create({
    input:{
        paddingLeft:16,
        backgroundColor :color.WHITE,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        width:"90%",
        color:color.BLACK,
        height:appStyle.fieldHieght,
        alignSelf:"center",
        marginVertical: appStyle.fieldMarginVertical,
        fontSize : 18
            }
})