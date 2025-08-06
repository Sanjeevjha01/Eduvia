import { FlatList, StatusBar, StyleSheet } from "react-native";
import VideoData from "../components/data/VideoData";
import VideosCard from "./VideosCard";

import { getFacultyData } from "@/redux/features/auth/userAction";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const FacultyHome = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getFacultyData());
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

export default FacultyHome; 