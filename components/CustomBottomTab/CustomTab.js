import { BottomTabBar } from "@react-navigation/bottom-tabs";
import { StyleSheet, View } from "react-native";

const CustomTab = ({ props }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.background} />
      <BottomTabBar {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default CustomTab;
