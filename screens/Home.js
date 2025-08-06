import { FlatList, StatusBar, StyleSheet } from "react-native";
import VideoData from "../components/data/VideoData";
import VideosCard from "./VideosCard";

import {
  getAdminData,
  getFacultyData,
  getuserData,
} from "@/redux/features/auth/userAction";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const { isAuth, user, admin, faculty } = useSelector((state) => state.user);

  useEffect(() => {
    // Only fetch if we don't already have the data and user is authenticated
    if (isAuth) {
      if (user?.role === "faculty" && !faculty) {
        dispatch(getFacultyData());
      } else if (user?.role === "admin" && !admin) {
        dispatch(getAdminData());
      } else if ((!user?.role || user?.role === "user") && !user?.name) {
        // Only dispatch getuserData if we don't have user data and role is user/undefined
        dispatch(getuserData());
      }
    }
  }, [dispatch, isAuth, user?.role, user?.name, admin, faculty]);

  return (
    <>
      <FlatList
        data={VideoData}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => <VideosCard item={item} />}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListHeaderComponent={
          <>
            <StatusBar />
          </>
        }
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default Home;
