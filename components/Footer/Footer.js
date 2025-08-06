import { AntDesign, Foundation } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Footer = () => {
  const route = useRoute();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => navigation.navigate("Home")}
      >
        <AntDesign
          name="home"
          style={[styles.icon, route.name === "Home" && styles.activeIcon]}
        />
        <Text
          style={[
            styles.iconText,
            route.name === "Home" && styles.activeIconTxt,
          ]}
        >
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => navigation.navigate("Videos")}
      >
        <Foundation
          name="play-video"
          style={[styles.icon, route.name === "Videos" && styles.activeIcon]}
        />
        <Text
          style={[
            styles.iconText,
            route.name === "Videos" && styles.activeIconTxt,
          ]}
        >
          Videos
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => navigation.navigate("Profile")}
      >
        <AntDesign
          name="user"
          style={[styles.icon, route.name === "Profile" && styles.activeIcon]}
        />
        <Text
          style={[
            styles.iconText,
            route.name === "Profile" && styles.activeIconTxt,
          ]}
        >
          Account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 15,
  },
  menuContainer: {
    alignItems: "center",
    flex: 1,
  },
  icon: {
    fontSize: 24,
    color: "#666666",
    marginBottom: 4,
  },
  activeIcon: {
    color: "#007AFF",
  },
  iconText: {
    fontSize: 12,
    color: "#666666",
    fontWeight: "500",
  },
  activeIconTxt: {
    color: "#007AFF",
    fontWeight: "bold",
  },
});

export default Footer;
