import { useCustomHook } from "@/Hook/customHook";
import {
  getFacultyData,
  logoutFaculty,
} from "@/redux/features/auth/userAction";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Profile from "../../assets/Eduvia App Icon/appIcon.png";

const FacultyProfileCard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Get faculty data from Redux state
  const { faculty, isAuth } = useSelector((state) => state.user);

  const loading = useCustomHook(navigation, "FacultyLogin");

  useEffect(() => {
    if (isAuth) {
      dispatch(getFacultyData());
    }
  }, [dispatch, isAuth]);

  const handleLogout = () => {
    dispatch(logoutFaculty());
  };

  const profileOptions = [
    {
      icon: <Ionicons name="person-outline" size={24} color="#6B7280" />,
      title: "Edit Profile",
      subtitle: "Update your faculty information",
      action: () => navigation.navigate("EditProfile"),
    },
    {
      icon: <Ionicons name="book-outline" size={24} color="#6B7280" />,
      title: "My Courses",
      subtitle: "Manage your teaching courses",
      action: () => navigation.navigate("FacultyCourses"),
    },
    {
      icon: <Ionicons name="notifications-outline" size={24} color="#6B7280" />,
      title: "Notifications",
      subtitle: "Manage your notification preferences",
      action: () => navigation.navigate("Notification"),
    },
    {
      icon: <Ionicons name="shield-outline" size={24} color="#6B7280" />,
      title: "Privacy & Security",
      subtitle: "Control your privacy settings",
      action: () => navigation.navigate("Privacy"),
    },
    {
      icon: <Ionicons name="help-circle-outline" size={24} color="#6B7280" />,
      title: "Help & Support",
      subtitle: "Get help and contact support",
      action: () => navigation.navigate("Help"),
    },
    {
      icon: <Ionicons name="settings-outline" size={24} color="#6B7280" />,
      title: "Settings",
      subtitle: "App preferences and configuration",
      action: () => navigation.navigate("Settings"),
    },
    {
      icon: <MaterialIcons name="logout" size={24} color="#EF4444" />,
      title: "Logout",
      subtitle: "Sign out of your faculty account",
      action: handleLogout,
      isDestructive: true,
    },
  ];

  return (
    <ScrollView
      className="flex-1 h-full w-full bg-gray-50"
      style={{ height: "100%" }}
    >
      {/* Profile Header */}
      <View
        className="bg-white shadow-sm border-b border-gray-200 "
        style={{ marginTop: 50 }}
      >
        <View className="px-6 py-8">
          <View className="items-center">
            <View className="relative">
              <Image source={Profile} style={styles.img} />
            </View>

            <View className="items-center mt-4">
              <Text className="text-2xl font-bold text-gray-800">
                {user?.name || "Faculty Member"}
              </Text>
              <Text className="text-gray-600 text-base mt-1">
                {user?.email || "faculty@example.com"}
              </Text>
              <Text className="text-blue-600 text-sm mt-2 font-medium">
                Faculty
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Faculty Stats Section */}
      <View className="bg-white mx-4 mt-6 rounded-xl shadow-sm border border-gray-100 items-center ">
        <View className="flex-row py-6 px-4 ">
          <View
            className="flex-1 items-center border-r border-gray-200 mx-2"
            style={{ marginRight: 20 }}
          >
            <Text className="text-2xl font-bold text-gray-800">8</Text>
            <Text className="text-gray-600 text-sm mt-1">Courses Teaching</Text>
          </View>
          <View
            className="flex-1 items-center border-r border-gray-200 mx-2"
            style={{ marginRight: 20 }}
          >
            <Text className="text-2xl font-bold text-gray-800">156</Text>
            <Text className="text-gray-600 text-sm">Students</Text>
          </View>
          <View className="flex-1 items-center mx-2">
            <Text className="text-2xl font-bold text-gray-800">4.8</Text>
            <Text className="text-gray-600 text-sm mt-1">Rating</Text>
          </View>
        </View>
      </View>

      {/* Options Section */}
      <View className="mt-10 mx-4">
        <Text className="text-lg font-bold text-gray-800 mb-3 px-1">
          Faculty Options
        </Text>
        <View className="bg-white rounded-xl shadow-sm border border-gray-100">
          {profileOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={option.action}
              className={`flex-row items-center px-4 py-4 ${
                index !== profileOptions.length - 1
                  ? "border-b border-gray-100"
                  : ""
              }`}
            >
              <View className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center mr-4">
                {option.icon}
              </View>
              <View className="flex-1">
                <Text
                  className={`text-base font-medium ${
                    option.isDestructive ? "text-red-500" : "text-gray-800"
                  }`}
                >
                  {option.title}
                </Text>
                <Text className="text-gray-500 text-sm mt-1">
                  {option.subtitle}
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={option.isDestructive ? "#EF4444" : "#9CA3AF"}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* App Info */}
      <View className="mt-10 mx-4 mb-8">
        <View className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-gray-800 font-medium">Eduvia Learning</Text>
              <Text className="text-gray-500 text-sm">Version 1.0.0</Text>
            </View>
            <View className="bg-blue-100 px-3 py-1 rounded-full">
              <Text className="text-blue-600 text-xs font-medium">Latest</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 100,
    height: 100,
  },
});

export default FacultyProfileCard;
