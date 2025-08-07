import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { server } from "../../store";

// Configure axios to include credentials by default
axios.defaults.withCredentials = true;

// Add request interceptor to include token in headers
axios.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("@token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // Also set cookie header for server compatibility
      config.headers.Cookie = `token=${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
      payload: { ...data, userType: "user" },
    });
    await AsyncStorage.setItem("@token", data?.token);
    await AsyncStorage.setItem("@userType", "user");
  } catch (error) {
    dispatch({
      type: "loginFail",
      payload: error.response.data.message || "Login Failed",
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
      payload: { ...data, userType: "faculty" },
    });
    await AsyncStorage.setItem("@token", data?.token);
    await AsyncStorage.setItem("@userType", "faculty");
  } catch (error) {
    dispatch({
      type: "loginFail",
      payload: error.response.data.message || "Faculty login failed",
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
      payload: {
        ...data,
        userType: "admin",
      },
    });
    await AsyncStorage.setItem("@token");
    await AsyncStorage.setItem("@userType", "admin");
  } catch (error) {
    dispatch({
      type: "loginFail",
      payload: error.response.data.message || "Admin login failed",
    });
  }
};

// IMPROVED: Unified profile data fetching
export const getUserProfile = () => async (dispatch) => {
  try {
    dispatch({ type: "getUserDataRequest" });

    const userType = (await AsyncStorage.getItem("@userType")) || "user";
    let endpoint, dataKey;

    switch (userType) {
      case "faculty":
        endpoint = `${server}/faculty/fac-profile`;
        dataKey = "faculty";
        break;
      case "admin":
        endpoint = `${server}/admin/admin-profile`;
        dataKey = "admin";
        break;
      default:
        endpoint = `${server}/user/profile`;
        dataKey = "user";
    }

    const { data } = await axios.get(endpoint);

    dispatch({
      type: "getUserDataSuccess",
      payload: {
        ...data[dataKey],
        role: userType,
      },
    });
  } catch (error) {
    dispatch({
      type: "getUserDataFail",
      payload: error.response?.data?.message || "Failed to get profile data",
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

// IMPROVED: Unified logout
export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: "logoutRequest" });

    const userType = (await AsyncStorage.getItem("@userType")) || "user";
    let endpoint;

    switch (userType) {
      case "faculty":
        endpoint = `${server}/faculty/fac-logout`;
        break;
      case "admin":
        endpoint = `${server}/admin/admin-logout`;
        break;
      default:
        endpoint = `${server}/user/logout`;
    }

    const { data } = await axios.get(endpoint);

    // Clear stored data
    await AsyncStorage.removeItem("@token");
    await AsyncStorage.removeItem("@userType");

    dispatch({
      type: "logoutSuccess",
      payload: data?.message,
    });
  } catch (error) {
    dispatch({
      type: "logoutFail",
      payload: error.response?.data?.message || "Logout failed",
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
    const { data } = await axios.get(`${server}/user/logout`);
    await AsyncStorage.removeItem("@token");
    await AsyncStorage.removeItem("@userType");
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
    const { data } = await axios.get(`${server}/faculty/fac-logout`);
    await AsyncStorage.removeItem("@token");
    await AsyncStorage.removeItem("@userType");
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
    const { data } = await axios.get(`${server}/admin/admin-logout`);
    await AsyncStorage.removeItem("@token");
    await AsyncStorage.removeItem("@userType");
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
