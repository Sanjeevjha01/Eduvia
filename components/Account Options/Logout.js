import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutAdmin,
  logoutFaculty,
  logoutUser,
} from "../../redux/features/auth/userAction";

const Logout = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Get user data from Redux state
  const { user } = useSelector((state) => state.user);

  // Determine user type and appropriate logout action
  const getUserType = () => {
    if (user?.role === "faculty") return "faculty";
    if (user?.role === "admin") return "admin";
    return "user"; // default to user
  };

  const handleLogout = () => {
    const userType = getUserType();
    let logoutAction;

    switch (userType) {
      case "faculty":
        logoutAction = logoutFaculty;
        break;
      case "admin":
        logoutAction = logoutAdmin;
        break;
      default:
        logoutAction = logoutUser;
        break;
    }

    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            dispatch(logoutAction());
            // Navigate to login screen after a short delay
            setTimeout(() => {
              navigation.reset({
                index: 0,
                routes: [{ name: "UserLogin" }],
              });
            }, 1000);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <View
        className="bg-white shadow-sm border-b border-gray-200"
        style={{ marginTop: 50 }}
      >
        <View className="px-6 py-4 flex-row items-center">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center mr-4"
          >
            <Ionicons name="arrow-back" size={20} color="#6B7280" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-800">Logout</Text>
        </View>
      </View>

      {/* Content */}
      <View className="mx-4 mt-6">
        <View className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <View className="items-center">
            <View className="w-20 h-20 bg-red-100 rounded-full items-center justify-center mb-4">
              <Ionicons name="log-out-outline" size={40} color="#EF4444" />
            </View>

            <Text className="text-xl font-bold text-gray-800 mb-2">
              Confirm Logout
            </Text>

            <Text className="text-gray-600 text-center mb-6">
              Are you sure you want to sign out of your account? You'll need to
              sign in again to access your profile.
            </Text>

            {/* User Info */}
            <View className="bg-gray-50 rounded-lg p-4 w-full mb-6">
              <Text className="text-sm text-gray-500 mb-1">Signed in as:</Text>
              <Text className="text-base font-medium text-gray-800">
                {user?.name || "User"}
              </Text>
              <Text className="text-sm text-gray-600">
                {user?.email || "user@example.com"}
              </Text>
              <Text className="text-xs text-blue-600 mt-1">
                {getUserType() === "faculty"
                  ? "Faculty"
                  : getUserType() === "admin"
                    ? "Administrator"
                    : "Student"}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="mx-4 mt-6 mb-8">
        <TouchableOpacity
          className="bg-red-500 rounded-xl py-4 mb-3"
          onPress={handleLogout}
        >
          <Text className="text-white text-center font-semibold text-base">
            Yes, Logout
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-gray-100 rounded-xl py-4"
          onPress={handleCancel}
        >
          <Text className="text-gray-600 text-center font-medium text-base">
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default Logout;
