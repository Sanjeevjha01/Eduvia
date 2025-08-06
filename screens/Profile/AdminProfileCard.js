import { useCustomHook } from "@/Hook/customHook";
import { getAdminData, logoutAdmin } from "@/redux/features/auth/userAction";
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

const AdminProfileCard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Get admin data from Redux state
  const { admin, isAuth } = useSelector((state) => state.user);

  const loading = useCustomHook(navigation, "AdminLogin");

  // fetch admin data when component mounts
  useEffect(() => {
    if (isAuth) {
      dispatch(getAdminData());
    }
  }, [dispatch, isAuth]);

  const handleLogout = () => {
    dispatch(logoutAdmin());
  };

  const profileOptions = [
    {
      icon: <Ionicons name="person-outline" size={24} color="#6B7280" />,
      title: "Edit Profile",
      subtitle: "Update your admin information",
      action: () => navigation.navigate("EditProfile"),
    },
    {
      icon: <Ionicons name="people-outline" size={24} color="#6B7280" />,
      title: "Manage Users",
      subtitle: "Manage students and faculty accounts",
      action: () => navigation.navigate("ManageUsers"),
    },
    {
      icon: <Ionicons name="school-outline" size={24} color="#6B7280" />,
      title: "Manage Courses",
      subtitle: "Add, edit, or remove courses",
      action: () => navigation.navigate("ManageCourses"),
    },
    {
      icon: <Ionicons name="analytics-outline" size={24} color="#6B7280" />,
      title: "Analytics",
      subtitle: "View platform statistics and reports",
      action: () => navigation.navigate("Analytics"),
    },
    {
      icon: <Ionicons name="notifications-outline" size={24} color="#6B7280" />,
      title: "Notifications",
      subtitle: "Manage system notifications",
      action: () => navigation.navigate("Notification"),
    },
    {
      icon: <Ionicons name="shield-outline" size={24} color="#6B7280" />,
      title: "Privacy & Security",
      subtitle: "Control security settings",
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
      subtitle: "Sign out of your admin account",
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
                {admin?.name || "Administrator"}
              </Text>
              <Text className="text-gray-600 text-base mt-1">
                {admin?.email || "admin@example.com"}
              </Text>
              <Text className="text-blue-600 text-sm mt-2 font-medium">
                Administrator
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Admin Stats Section */}
      <View className="bg-white mx-4 mt-6 rounded-xl shadow-sm border border-gray-100 items-center ">
        <View className="flex-row py-6 px-4 ">
          <View
            className="flex-1 items-center border-r border-gray-200 mx-2"
            style={{ marginRight: 20 }}
          >
            <Text className="text-2xl font-bold text-gray-800">1,245</Text>
            <Text className="text-gray-600 text-sm mt-1">Total Users</Text>
          </View>
          <View
            className="flex-1 items-center border-r border-gray-200 mx-2"
            style={{ marginRight: 20 }}
          >
            <Text className="text-2xl font-bold text-gray-800">89</Text>
            <Text className="text-gray-600 text-sm">Active Courses</Text>
          </View>
          <View className="flex-1 items-center mx-2">
            <Text className="text-2xl font-bold text-gray-800">98%</Text>
            <Text className="text-gray-600 text-sm mt-1">Uptime</Text>
          </View>
        </View>
      </View>

      {/* Options Section */}
      <View className="mt-10 mx-4">
        <Text className="text-lg font-bold text-gray-800 mb-3 px-1">
          Admin Options
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

export default AdminProfileCard;
