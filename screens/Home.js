import { FlatList, StatusBar, StyleSheet } from "react-native";
import VideoData from "../components/data/VideoData";
import VideosCard from "./VideosCard";

const Home = () => {
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
