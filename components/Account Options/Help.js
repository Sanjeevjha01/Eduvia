import { useNavigation } from "@react-navigation/native";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const Help = () => {
  const navigation = useNavigation();

  const handleSaveBtn = () => {
    alert("Your complain have been applied, it will be resolved soon");
    setTimeout(() => {
      navigation.goBack();
    }, 1500);
  };

  return (
    <View className="mx-4 mt-6">
      <View className="bg-white rounded-xl shadow-sm border border-gray-100">
        <View className="px-6 py-4">
          <Text className="text-sm font-medium text-gray-700 mb-2">
            Please write your complain
          </Text>
          <TextInput
            className="text-base text-gray-800"
            placeholder="Please write your complain here..."
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            style={{ minHeight: 80 }}
          />
        </View>
      </View>
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
    </View>
  );
};

export default Help;
