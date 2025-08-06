import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

const Notification = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MaterialCommunityIcons name="bell-ring" size={100} />
      <Text style={{ fontSize: 15, color: "red" }}>
        OOPS! You don't have any notification
      </Text>
    </View>
  );
};

export default Notification;
