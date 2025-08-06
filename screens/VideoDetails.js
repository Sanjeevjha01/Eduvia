import { useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import Video from "react-native-video";
import { WebView } from "react-native-webview";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const videoHeight = screenHeight * 0.4; // 40% of screen height

const VideoDetails = ({ route, navigation }) => {
  const { item } = route.params;
  const [useWebView, setUseWebView] = useState(false);

  // Extract video ID from YouTube URL
  const getVideoId = (url) => {
    const videoId = url.split("v=")[1];
    return videoId;
  };

  // Generate YouTube thumbnail URL
  const getThumbnailUrl = (videoId) => {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  // For demo purposes, you can use a sample video URL
  // In real implementation, you'd need to provide actual video URLs
  const getVideoUrl = (videoId) => {
    // This is a placeholder - you'll need to provide actual video URLs
    // or implement a service to convert YouTube URLs to direct video URLs
    return null; // Placeholder
  };

  const videoId = getVideoId(item.playVideoUri);
  const thumbnailUrl = getThumbnailUrl(videoId);
  const videoUrl = getVideoUrl(videoId);

  // WebView HTML content for YouTube embed
  const getWebViewContent = (videoId) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              margin: 0;
              padding: 0;
              background-color: #000;
              width: 100vw;
              height: 100vh;
              overflow: hidden;
            }
            iframe {
              width: 100vw;
              height: 100vh;
              border: none;
              position: absolute;
              top: 0;
              left: 0;
            }
          </style>
        </head>
        <body>
          <iframe
            src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&showinfo=0"
            allowfullscreen
            allow="autoplay; encrypted-media; fullscreen">
          </iframe>
        </body>
      </html>
    `;
  };

  return (
    <View style={{ flex: 1 }}>
      {useWebView ? (
        // Use WebView for actual YouTube playback
        <WebView
          source={{ html: getWebViewContent(videoId) }}
          style={{ width: screenWidth, height: videoHeight }}
          allowsFullscreenVideo={true}
          mediaPlaybackRequiresUserAction={false}
        />
      ) : videoUrl ? (
        // If you have direct video URLs, use react-native-video
        <Video
          source={{ uri: videoUrl }}
          style={{ width: screenWidth, height: videoHeight }}
          resizeMode="contain"
          controls={true}
          paused={false}
        />
      ) : (
        // Fallback to thumbnail with play button
        <TouchableOpacity
          style={[styles.videoContainer, { height: videoHeight }]}
          onPress={() => setUseWebView(true)}
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

      <View style={{ padding: 16, flex: 1 }}>
        <Text style={{ marginTop: 16, fontWeight: "bold", fontSize: 16 }}>
          Description: {item.description}
        </Text>
        <Text style={{ marginTop: 16, fontWeight: "bold", fontSize: 14 }}>
          By: {item.by}
        </Text>
      </View>
    </View>
  );
};

const styles = {
  videoContainer: {
    position: "relative",
    width: screenWidth,
    backgroundColor: "#000",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  playButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -30 }, { translateY: -30 }],
    width: 60,
    height: 60,
    backgroundColor: "rgba(255, 0, 0, 0.8)",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  playIcon: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
};

export default VideoDetails;
