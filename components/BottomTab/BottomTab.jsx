import { AntDesign, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../screens/Home';
import Profile from '../../screens/Profile/Profile';
import Videos from "../../screens/Videos";
import CustomTab from '../CustomBottomTab/CustomTab';
import Layout from '../Layout/Layout';

const Tab = createBottomTabNavigator();

// Wrapper components to include Layout
const HomeWithLayout = () => (
    <Layout>
        <Home />
    </Layout>
);

const VideosWithoutLayout = () => (
    <Videos />
);

const ProfileWithoutLayout = () => (
    <Profile />
);

export default function BottomTabs() {
    return (
        <Tab.Navigator
            tabBar={(props) => <CustomTab props={props} />}
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeWithLayout}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="home" size={24} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Videos"
                component={VideosWithoutLayout}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="play-circle-outline" size={26} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileWithoutLayout}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="user" size={24} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
