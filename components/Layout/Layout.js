import { StyleSheet, View } from "react-native";
import Header from "../Header/Header";

const Layout = ({ children }) => {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default Layout;
