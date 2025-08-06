import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { server } from "../../store";

// Configure axios to include credentials by default
axios.defaults.withCredentials = true;

// action for user login
export const userLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "loginRequest",
    });
    // hitting node login api request
    const { data } = await axios.post(
      `${server}/user/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "loginSuccess",
      payload: data,
    });
    await AsyncStorage.setItem("@token", data?.token);
  } catch (error) {
    dispatch({
      type: "loginFail",
      payload: error.response.data.message,
    });
  }
};

// action for faculty login
export const facLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "loginRequest",
    });

    // hitting api for faculty login
    const { data } = await axios.post(
      `${server}/faculty/fac-login`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "loginSuccess",
      payload: data,
    });
    await AsyncStorage.setItem("@token", data?.token);
  } catch (error) {
    dispatch({
      type: "loginFail",
      payload: error.response.data.message,
    });
  }
};

// action for admin login
export const admingLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "loginRequest",
    });

    // hitting api for admin login
    const { data } = await axios.post(
      `${server}/admin/admin-login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "loginSuccess",
      payload: data,
    });
    await AsyncStorage.setItem("@token");
  } catch (error) {
    dispatch({
      type: "loginFail",
      payload: error.response.data.message,
    });
  }
};

// get user data action
export const getuserData = () => async (dispatch) => {
  try {
    dispatch({
      type: "getUserDataRequest",
    });
    const { data } = await axios.get(`${server}/user/profile`, {
      withCredentials: true,
    });
    dispatch({
      type: "getUserDataSuccess",
      payload: { ...data?.user, role: "user" },
    });
  } catch (error) {
    dispatch({
      type: "getUserDataFail",
      payload: error.response?.data?.message || "Failed to get user data",
    });
  }
};

// get faculty data action
export const getFacultyData = () => async (dispatch) => {
  try {
    dispatch({
      type: "getUserDataRequest",
    });
    const { data } = await axios.get(`${server}/faculty/fac-profile`, {
      withCredentials: true,
    });
    dispatch({
      type: "getUserDataSuccess",
      payload: { ...data?.faculty, role: "faculty" },
    });
  } catch (error) {
    dispatch({
      type: "getUserDataFail",
      payload: error.response?.data?.message || "Failed to get faculty data",
    });
  }
};

// get admin data action
export const getAdminData = () => async (dispatch) => {
  try {
    dispatch({
      type: "getUserDataRequest",
    });
    const { data } = await axios.get(`${server}/admin/admin-profile`, {
      withCredentials: true,
    });
    dispatch({
      type: "getUserDataSuccess",
      payload: { ...data?.admin, role: "admin" },
    });
  } catch (error) {
    dispatch({
      type: "getUserDataFail",
      payload: error.response?.data?.message || "Failed to get admin data",
    });
  }
};

// logout user action
export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "logoutRequest",
    });
    // hitting api
    const { data } = await axios.get(`${server}/user/logout`, {
      withCredentials: true,
    });
    dispatch({
      type: "logoutSuccess",
      payload: data?.message,
    });
  } catch (error) {
    dispatch({
      type: "logoutFail",
      payload: error.response.data.message,
    });
  }
};

// logout faculty action
export const logoutFaculty = () => async (dispatch) => {
  try {
    dispatch({
      type: "logoutRequest",
    });
    const { data } = await axios.get(`${server}/faculty/fac-logout`, {
      withCredentials: true,
    });
    dispatch({
      type: "logoutSuccess",
      payload: data?.message,
    });
  } catch (error) {
    dispatch({
      type: "logoutFail",
      payload: error.response.data.message,
    });
  }
};

// logout admin
export const logoutAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: "logoutRequest",
    });
    const { data } = await axios.get(`${server}/admin/admin-logout`, {
      withCredentials: true,
    });
    dispatch({
      type: "logoutSuccess",
      payload: data?.message,
    });
  } catch (error) {
    dispatch({
      type: "logoutFail",
      payload: error.response.data.message,
    });
  }
};
