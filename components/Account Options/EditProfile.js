import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Profile from "../../assets/Eduvia App Icon/appIcon.png";

const EditProfile = () => {
  const navigation = useNavigation();

  // handle save changes button
  const handleSaveBtn = () => {
    alert("Changes Saved");
    setTimeout(() => {
      navigation.goBack();
    }, 1000);
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Profile Picture Section */}
      <View className="bg-white mx-4 mt-6 rounded-xl shadow-sm border border-gray-100 p-6">
        <View className="items-center">
          <View className="relative">
            <Image source={Profile} style={styles.profileImage} />
            <TouchableOpacity className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full items-center justify-center border-2 border-white">
              <Ionicons name="camera" size={16} color="white" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity className="mt-3">
            <Text className="text-blue-500 font-medium">Change Photo</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Form Section */}
      <View className="mx-4 mt-6">
        <View className="bg-white rounded-xl shadow-sm border border-gray-100">
          {/* Username Field */}
          <View className="px-6 py-4 border-b border-gray-100">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Username
            </Text>
            <TextInput
              className="text-base text-gray-800"
              placeholder="Enter your username"
              placeholderTextColor="#9CA3AF"
              defaultValue="Anish Kumar"
            />
          </View>

          {/* Email Field */}
          <View className="px-6 py-4 border-b border-gray-100">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Email
            </Text>
            <TextInput
              className="text-base text-gray-800"
              placeholder="Enter your email"
              placeholderTextColor="#9CA3AF"
              defaultValue="anishjhs@dummy.com"
              keyboardType="email-address"
            />
          </View>
          {/* Full Name Field */}
          <View className="px-6 py-4 border-b border-gray-100">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Full Name
            </Text>
            <TextInput
              className="text-base text-gray-800"
              placeholder="Enter your full name"
              placeholderTextColor="#9CA3AF"
              defaultValue="Anish Kumar"
            />
          </View>
          {/* Address Field */}
          <View className="px-6 py-4 border-b border-gray-100">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Address
            </Text>
            <TextInput
              className="text-base text-gray-800"
              placeholder="Enter your address"
              placeholderTextColor="#9CA3AF"
            />
          </View>
          {/* City Field */}
          <View className="px-6 py-4 border-b border-gray-100">
            <Text className="text-sm font-medium text-gray-700 mb-2">City</Text>
            <TextInput
              className="text-base text-gray-800"
              placeholder="Enter your city"
              placeholderTextColor="#9CA3AF"
            />
          </View>
          {/* Country Field */}
          <View className="px-6 py-4 border-b border-gray-100">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Country
            </Text>
            <TextInput
              className="text-base text-gray-800"
              placeholder="Enter your country"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Phone Number Field */}
          <View className="px-6 py-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </Text>
            <TextInput
              className="text-base text-gray-800"
              placeholder="Enter your phone number"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
            />
          </View>
        </View>
      </View>

      {/* Bio Section */}
      <View className="mx-4 mt-6">
        <View className="bg-white rounded-xl shadow-sm border border-gray-100">
          <View className="px-6 py-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">Bio</Text>
            <TextInput
              className="text-base text-gray-800"
              placeholder="Tell us about yourself..."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              style={{ minHeight: 80 }}
            />
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="mx-4 mt-8 mb-8">
        <TouchableOpacity
          className="bg-blue-500 rounded-xl py-4 mb-3"
          onPress={handleSaveBtn}
        >
          <Text className="text-white text-center font-semibold text-base">
            Save Changes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-gray-100 rounded-xl py-4"
          onPress={() => navigation.goBack()}
        >
          <Text className="text-gray-600 text-center font-medium text-base">
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default EditProfile;
