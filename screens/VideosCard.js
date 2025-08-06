import { useNavigation } from "@react-navigation/native";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Video from "react-native-video";

const screenWidth = Dimensions.get("window").width;

const VideosCard = ({ item }) => {
  const navigation = useNavigation();

  const handleDesc = (_id) => {
    navigation.navigate("VideoDetails", { item });
  };

  // Extract video ID from YouTube URL
  const getVideoId = (url) => {
    const videoId = url.split("v=")[1];
    return videoId;
  };

  // Generate YouTube thumbnail URL
  const getThumbnailUrl = (videoId) => {
    return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
  };

  const getVideoUrl = (videoId) => {
    // This is a placeholder - you'll need to provide actual video URLs
    // or implement a service to convert YouTube URLs to direct video URLs
    return null; // Placeholder
  };

  const videoId = getVideoId(item.playVideoUri);
  const thumbnailUrl = getThumbnailUrl(videoId);
  const videoUrl = getVideoUrl(videoId);

  return (
    <View style={styles.card}>
      {videoUrl ? (
        <Video
          source={{ uri: videoUrl }}
          style={styles.video}
          resizeMode="contain"
          controls={false}
          paused={true}
          onPress={() => handleDesc(item._id)}
        />
      ) : (
        // Fallback to thumbnail with play button overlay
        <TouchableOpacity
          style={styles.videoContainer}
          onPress={() => handleDesc(item._id)}
        >
          <Image
            source={{ uri: thumbnailUrl }}
            style={styles.thumbnail}
            resizeMode="cover"
          />
          <View style={styles.playButton}>
            <Text style={styles.playIcon}>▶</Text>
          </View>
        </TouchableOpacity>
      )}
      <Text style={styles.description} onPress={() => handleDesc(item._id)}>
        {item.description}
      </Text>
      <Text style={styles.by}>By: {item.by}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: screenWidth / 2 - 20,
    margin: 10,
    marginBottom: 0,
  },
  videoContainer: {
    position: "relative",
    width: "100%",
    height: 100,
    borderRadius: 8,
    overflow: "hidden",
  },
  video: {
    width: "100%",
    height: 100,
    borderRadius: 8,
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  playButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -20 }, { translateY: -20 }],
    width: 40,
    height: 40,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  playIcon: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    fontWeight: "bold",
    marginTop: 6,
    marginBottom: 2,
    fontSize: 14,
  },
  by: {
    color: "gray",
    marginBottom: 4,
    fontSize: 12,
  },
});

export default VideosCard;
