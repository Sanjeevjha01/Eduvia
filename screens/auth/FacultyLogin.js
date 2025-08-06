import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import faculty from "../../assets/LoginImg/faculty.png";
import InputBox from "../../components/Form/InputBox";

const UserLogin = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <View>
        <Image source={faculty} style={styles.img} />
      </View>
      <InputBox
        placeholder={"Faculty Username"}
        autoComplete={"Email"}
        value={email}
        setValue={setEmail}
      />
      <InputBox
        placeholder={"Faculty Password"}
        secureTextEntry={true}
        value={password}
        setValue={setPassword}
      />
      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginBtnText}>Faculty Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  img: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
  },
  loginBtn: {
    backgroundColor: "#24a1ef",
    width: "80%",
    height: 30,
    marginTop: 20,
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 10,
  },
  loginBtnText: {
    color: "#ffffff",
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "500",
  },
});

export default UserLogin;
