import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Privacy = () => {
  const handleConfirmBtn = () => {
    alert("Pasword Changed");
  };
  return (
    <ScrollView>
      <View className="mx-4 mt-6">
        <View className="bg-white rounded-xl shadow-sm border border-gray-100">
          {/*Old Password Field */}
          <View className="px-6 py-4 border-b border-gray-100">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Current Password:
            </Text>
            <TextInput
              className="text-base text-gray-800"
              placeholder="Enter your current password"
              placeholderTextColor="#9CA3AF"
              keyboardType="visible-password"
            />
          </View>
          {/*New Password Field */}
          <View className="px-6 py-4 border-b border-gray-100">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              New Password:
            </Text>
            <TextInput
              className="text-base text-gray-800"
              placeholder="Enter your new password"
              placeholderTextColor="#9CA3AF"
              keyboardType="visible-password"
            />
          </View>
          {/*Confirm New Password Field */}
          <View className="px-6 py-4 border-b border-gray-100">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Confirm New Password:
            </Text>
            <TextInput
              className="text-base text-gray-800"
              placeholder="Enter your confirm new password"
              placeholderTextColor="#9CA3AF"
              keyboardType="visible-password"
            />
          </View>
        </View>
      </View>
      <View className="mx-4 mt-8 mb-8">
        <TouchableOpacity
          className="bg-blue-500 rounded-xl py-4 mb-3"
          onPress={handleConfirmBtn}
        >
          <Text className="text-white text-center font-semibold text-base">
            Save Changes
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Privacy;
