import { StyleSheet } from "react-native";
import { color } from "../../utility";

export default StyleSheet.create({
  cardStyle: {
    backgroundColor: color.WHITE,
    borderBottomWidth: 1,
    borderColor: color.BLUE,
  },
  cardItemStyle: {
    backgroundColor: color.WHITE,
  },

  logoContainer: {
    height: 60,
    width: 60,
    borderColor: color.THEME_CLR,
    borderWidth: 2,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.THEME_CLR,
  },
  thumbnailName: { fontSize: 30, color: color.WHITE, fontWeight: "bold" },
  profileName: { fontSize: 20, color: color.THEME_CLR, fontWeight: "bold" },
});