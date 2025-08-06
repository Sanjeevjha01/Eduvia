import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import student from "../../assets/LoginImg/student.png";
import InputBox from "../../components/Form/InputBox";

const UserLogin = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    navigation.navigate("UserRegister");
  };

  // faculty login
  const handleFacLogin = () => {
    navigation.navigate("FacultyLogin");
  };

  // admin login
  const handleAdminLogin = () => {
    navigation.navigate("AdminLogin");
  };

  return (
    <View style={styles.container}>
      <View>
        <Image source={student} style={styles.img} />
      </View>
      <InputBox
        placeholder={"Username"}
        autoComplete={"Email"}
        value={email}
        setValue={setEmail}
      />
      <InputBox
        placeholder={"Password"}
        secureTextEntry={true}
        value={password}
        setValue={setPassword}
      />
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => navigation.navigate("MainTabs")}
      >
        <Text style={styles.loginBtnText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.registerTextCont}>
        Don't have an account ?
        <Text style={styles.registerText} onPress={handleRegister}>
          {" "}
          Sign Up
        </Text>
      </Text>
      <View style={styles.authorizeBtn}>
        <View style={styles.facBtn}>
          <TouchableOpacity onPress={handleFacLogin}>
            <Text style={styles.loginBtnText}>Faculty Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.facBtn}>
          <TouchableOpacity onPress={handleAdminLogin}>
            <Text style={styles.loginBtnText}>Admin Login</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  registerTextCont: {
    alignSelf: "center",
    marginTop: 10,
  },
  registerText: {
    color: "blue",
    textDecorationLine: "underline",
  },
  authorizeBtn: {
    flexDirection: "row",
  },
  facBtn: {
    backgroundColor: "#24a1ef",
    width: "30%",
    height: 30,
    marginTop: 20,
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: 50,
  },
});

export default UserLogin;
