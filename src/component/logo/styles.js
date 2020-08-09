import { StyleSheet } from "react-native";
import { color, appStyle } from "../../utility";
import { smallDeviceHeight } from "../../utility/constants";

const getDimensions = () => {
  if (appStyle.deviceHeight > smallDeviceHeight) {
    return {
      height: 100,
      width: 300,
      borderRadius: 50,
      logoFontSize: 70,
    };
  } else {
    return {
      height: 80,
      width: 200,
      borderRadius: 40,
      logoFontSize: 30,
    };
  }
};

export default StyleSheet.create({
  logo: {
    height: getDimensions().height,
    width: getDimensions().width,
    borderRadius:getDimensions().borderRadius,
    backgroundColor: color.WHITE,
    alignItems: "center",
    justifyContent: "center",
   
  },
  text: {
    fontSize: getDimensions().logoFontSize,
    fontWeight: "bold",
    color: color.THEME_CLR,
  },
});