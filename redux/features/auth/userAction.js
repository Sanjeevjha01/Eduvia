import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { server } from "../../store";

// Configure axios to include credentials by default
axios.defaults.withCredentials = true;

// Add request interceptor to include token in headers
axios.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("@token");
    const userType = await AsyncStorage.getItem("@userType");

    console.log("📱 REQUEST DEBUG:", {
      url: config.url,
      token: token ? `${token.substring(0, 20)}...` : null,
      userType,
      hasToken: !!token,
    });

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // Also set cookie header for server compatibility
      config.headers.Cookie = `token=${token}`;
    }

    console.log("📤 Request headers:", {
      Authorization: config.headers.Authorization ? "Set" : "Not set",
      Cookie: config.headers.Cookie ? "Set" : "Not set",
    });

    return config;
  },
  (error) => {
    console.log("❌ Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
axios.interceptors.response.use(
  (response) => {
    console.log("✅ Response success:", {
      status: response.status,
      url: response.config.url,
      data: response.data?.success ? "Success" : "Failed",
    });
    return response;
  },
  (error) => {
    console.log("❌ Response error:", {
      status: error.response?.status,
      url: error.config?.url,
      message: error.response?.data?.message,
      error: error.message,
    });
    return Promise.reject(error);
  }
);

// action for user login
export const userLogin = (email, password) => async (dispatch) => {
  try {
    console.log("🔐 User login attempt:", { email });
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

    console.log("✅ User login success:", {
      hasToken: !!data?.token,
      hasUser: !!data?.user,
    });

    dispatch({
      type: "loginSuccess",
      payload: { ...data, userType: "user" },
    });
    await AsyncStorage.setItem("@token", data?.token);
    await AsyncStorage.setItem("@userType", "user");
  } catch (error) {
    console.log("❌ User login error:", error.response?.data?.message);
    dispatch({
      type: "loginFail",
      payload: error.response?.data?.message || "Login Failed",
    });
  }
};

// action for faculty login
export const facLogin = (email, password) => async (dispatch) => {
  try {
    console.log("🎓 Faculty login attempt:", { email });
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

    console.log("✅ Faculty login success:", {
      hasToken: !!data?.token,
      hasFaculty: !!data?.faculty,
      facultyName: data?.faculty?.name,
    });

    dispatch({
      type: "loginSuccess",
      payload: { ...data, userType: "faculty" },
    });
    await AsyncStorage.setItem("@token", data?.token);
    await AsyncStorage.setItem("@userType", "faculty");

    console.log("💾 Faculty login - stored in AsyncStorage:", {
      token: "Stored",
      userType: "faculty",
    });
  } catch (error) {
    console.log("❌ Faculty login error:", error.response?.data?.message);
    dispatch({
      type: "loginFail",
      payload: error.response?.data?.message || "Faculty login failed",
    });
  }
};

// action for admin login - corrected function name
export const adminLogin = (email, password) => async (dispatch) => {
  try {
    console.log("👑 Admin login attempt:", { email });
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

    console.log("✅ Admin login success:", {
      hasToken: !!data?.token,
      hasAdmin: !!data?.admin,
      adminName: data?.admin?.name,
    });

    dispatch({
      type: "loginSuccess",
      payload: {
        ...data,
        userType: "admin",
      },
    });

    await AsyncStorage.setItem("@token", data?.token);
    await AsyncStorage.setItem("@userType", "admin");

    console.log("💾 Admin login - stored in AsyncStorage:", {
      token: "Stored",
      userType: "admin",
    });
  } catch (error) {
    console.log("❌ Admin login error:", error.response?.data?.message);
    dispatch({
      type: "loginFail",
      payload: error.response?.data?.message || "Admin login failed",
    });
  }
};

// Unified profile data fetching - this should be the primary function
export const getUserProfile = () => async (dispatch) => {
  try {
    console.log("👤 Getting unified user profile...");
    dispatch({ type: "getUserDataRequest" });

    const userType = (await AsyncStorage.getItem("@userType")) || "user";
    const token = await AsyncStorage.getItem("@token");

    console.log("💾 Profile fetch - AsyncStorage check:", {
      userType,
      hasToken: !!token,
      tokenPreview: token ? `${token.substring(0, 20)}...` : null,
    });

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

    console.log("🔗 Making request to:", {
      endpoint,
      dataKey,
      userType,
    });

    const { data } = await axios.get(endpoint);

    console.log("✅ Profile data received:", {
      success: data?.success,
      hasUserData: !!data[dataKey],
      userName: data[dataKey]?.name,
    });

    dispatch({
      type: "getUserDataSuccess",
      payload: {
        ...data[dataKey],
        role: userType,
      },
    });
  } catch (error) {
    console.log("❌ Get profile error:", {
      status: error.response?.status,
      message: error.response?.data?.message,
      error: error.message,
    });
    dispatch({
      type: "getUserDataFail",
      payload: error.response?.data?.message || "Failed to get profile data",
    });
  }
};

// DEPRECATED: Use getUserProfile instead
export const getuserData = () => async (dispatch) => {
  try {
    console.log("👤 Getting user data...");
    dispatch({
      type: "getUserDataRequest",
    });
    const { data } = await axios.get(`${server}/user/profile`);

    console.log("✅ User data received:", {
      success: data?.success,
      hasUser: !!data?.user,
      userName: data?.user?.name,
    });

    dispatch({
      type: "getUserDataSuccess",
      payload: { ...data?.user, role: "user" },
    });
  } catch (error) {
    console.log("❌ Get user data error:", error.response?.data?.message);
    dispatch({
      type: "getUserDataFail",
      payload: error.response?.data?.message || "Failed to get user data",
    });
  }
};

// DEPRECATED: Use getUserProfile instead
export const getFacultyData = () => async (dispatch) => {
  try {
    console.log("🎓 Getting faculty data...");

    // Debug AsyncStorage before request
    const storedToken = await AsyncStorage.getItem("@token");
    const storedUserType = await AsyncStorage.getItem("@userType");

    console.log("💾 Faculty data - AsyncStorage check:", {
      hasToken: !!storedToken,
      tokenPreview: storedToken ? `${storedToken.substring(0, 20)}...` : null,
      userType: storedUserType,
    });

    dispatch({
      type: "getUserDataRequest",
    });

    const { data } = await axios.get(`${server}/faculty/fac-profile`);

    console.log("✅ Faculty data received:", {
      success: data?.success,
      hasFaculty: !!data?.faculty,
      facultyName: data?.faculty?.name,
      facultyId: data?.faculty?._id,
    });

    dispatch({
      type: "getUserDataSuccess",
      payload: { ...data?.faculty, role: "faculty" },
    });
  } catch (error) {
    console.log("❌ Get faculty data error:", {
      status: error.response?.status,
      message: error.response?.data?.message,
      url: error.config?.url,
    });
    dispatch({
      type: "getUserDataFail",
      payload: error.response?.data?.message || "Failed to get faculty data",
    });
  }
};

// DEPRECATED: Use getUserProfile instead
export const getAdminData = () => async (dispatch) => {
  try {
    console.log("👑 Getting admin data...");

    // Debug AsyncStorage before request
    const storedToken = await AsyncStorage.getItem("@token");
    const storedUserType = await AsyncStorage.getItem("@userType");

    console.log("💾 Admin data - AsyncStorage check:", {
      hasToken: !!storedToken,
      tokenPreview: storedToken ? `${storedToken.substring(0, 20)}...` : null,
      userType: storedUserType,
    });

    dispatch({
      type: "getUserDataRequest",
    });

    const { data } = await axios.get(`${server}/admin/admin-profile`);

    console.log("✅ Admin data received:", {
      success: data?.success,
      hasAdmin: !!data?.admin,
      adminName: data?.admin?.name,
      adminId: data?.admin?._id,
    });

    dispatch({
      type: "getUserDataSuccess",
      payload: { ...data?.admin, role: "admin" },
    });
  } catch (error) {
    console.log("❌ Get admin data error:", {
      status: error.response?.status,
      message: error.response?.data?.message,
      url: error.config?.url,
    });
    dispatch({
      type: "getUserDataFail",
      payload: error.response?.data?.message || "Failed to get admin data",
    });
  }
};

// Unified logout - this should be the primary logout function
export const logout = () => async (dispatch) => {
  try {
    console.log("🚪 Unified logout...");
    dispatch({ type: "logoutRequest" });

    const userType = (await AsyncStorage.getItem("@userType")) || "user";
    console.log("🔍 Logout for user type:", userType);

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

    console.log("✅ Logout successful, cleared AsyncStorage");

    dispatch({
      type: "logoutSuccess",
      payload: data?.message,
    });
  } catch (error) {
    console.log("❌ Logout error:", error.response?.data?.message);
    dispatch({
      type: "logoutFail",
      payload: error.response?.data?.message || "Logout failed",
    });
  }
};

// DEPRECATED: Use logout instead
export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "logoutRequest",
    });
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
      payload: error.response?.data?.message || "Logout failed",
    });
  }
};

// DEPRECATED: Use logout instead
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
      payload: error.response?.data?.message || "Logout failed",
    });
  }
};

// DEPRECATED: Use logout instead
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
      payload: error.response?.data?.message || "Logout failed",
    });
  }
};
