import { StyleSheet } from "react-native";
import { color, appStyle } from "../../utility";

export default StyleSheet.create({
  chatContainer: { 
      backgroundColor: color.THEME_CLR, 
      borderTopRightRadius: 20 ,
    borderBottomRightRadius:20},
  chatTxt: {
    color: color.BLACK,
    fontSize: 18,
    marginVertical: 5,
    fontWeight: "500",
    padding: 8,
  },
});