import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

const Settings = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Ionicons name="settings-outline" size={100} color="#6B7280" />
      <Text style={{ fontSize: 12, fontWeight: 600 }}>
        Settings will be provided soon! till then keep learning and keep growing
      </Text>
    </View>
  );
};

export default Settings;
