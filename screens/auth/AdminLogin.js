import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import manager from "../../assets/LoginImg/manager.png";
import InputBox from "../../components/Form/InputBox";

import { useCustomHook } from "@/Hook/customHook";
import { useDispatch } from "react-redux";
import {
  adminLogin,
  getUserProfile,
} from "../../redux/features/auth/userAction";

const UserLogin = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const loading = useCustomHook(navigation, "MainTabs");

  // admin login button
  const handleAdminLogin = async () => {
    if (!email || !password) {
      alert("Please add email or password");
    }
    try {
      // First login the admin
      await dispatch(adminLogin(email, password));
      // Then fetch admin profile data using unified profile function
      dispatch(getUserProfile());
    } catch (error) {
      console.log("Admin login error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Image source={manager} style={styles.img} />
      </View>
      <InputBox
        placeholder={"Admin Username"}
        autoComplete={"Email"}
        value={email}
        setValue={setEmail}
      />
      <InputBox
        placeholder={"Admin Password"}
        secureTextEntry={true}
        value={password}
        setValue={setPassword}
      />
      <TouchableOpacity style={styles.loginBtn} onPress={handleAdminLogin}>
        <Text style={styles.loginBtnText}>Admin Login</Text>
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
