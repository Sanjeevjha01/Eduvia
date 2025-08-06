import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import AppIcon from "../../assets/Eduvia App Icon/appIcon.png";

const Header = () => {
  const navigation = useNavigation();
  return (
    <View className="bg-white shadow-lg border-b border-gray-200">
      <View className="flex-row items-center justify-between px-6 py-2 mt-2">
        <View className="flex-row items-center space-x-3">
          <View className="bg-blue-50 rounded-xl p-2 shadow-sm">
            <Image source={AppIcon} className="w-10 h-10 rounded-lg" />
          </View>
          <View>
            <Text className="text-gray-800 text-2xl font-bold tracking-wide">
              Eduvia
            </Text>
            <Text className="text-gray-600 text-sm font-medium">
              Learning Platform
            </Text>
          </View>
        </View>

        <View className=" rounded-full w-8 h-8 items-center justify-center bg-red-700">
          <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
            <MaterialCommunityIcons name="bell-ring" size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Header;
