import { FlatList, StatusBar, StyleSheet } from "react-native";
import VideoData from "../components/data/VideoData";
import VideosCard from "./VideosCard";

import { getAdminData } from "@/redux/features/auth/userAction";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminHome = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAdminData());
  }, [dispatch]);
  
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

export default AdminHome; 