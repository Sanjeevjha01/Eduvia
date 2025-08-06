import { NavigationIndependentTree } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from '../components/BottomTab/BottomTab';

// screens imports
import { EditProfile, Help, Logout, Notification, Privacy, Settings } from '../components/Account Options';
import VideoDetails from '../screens/VideoDetails';
import AdminLogin from './auth/AdminLogin';
import FacultyLogin from './auth/FacultyLogin';
import UserLogin from './auth/UserLogin';
import UserRegister from './auth/UserRegister';
import ProfileCard from './Profile/ProfileCard';

const Stack = createNativeStackNavigator()
export default function Main() {
    return (
        <NavigationIndependentTree>
            <Stack.Navigator
                initialRouteName={"UserLogin"}
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#ffffff',
                        elevation: 0,
                        shadowOpacity: 0
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 18,
                    },
                    headerTitleAlign: 'center',
                    headerShadowVisible: false,
                }}
            >
                <Stack.Screen
                    name='UserLogin'
                    component={UserLogin}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='UserRegister'
                    component={UserRegister}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='FacultyLogin'
                    component={FacultyLogin}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='AdminLogin'
                    component={AdminLogin}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='MainTabs'
                    component={BottomTabs}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='VideoDetails'
                    component={VideoDetails}
                    options={{
                        title: "Video Details",
                        headerTitleStyle: {
                            fontSize: 24, fontWeight: "bold"
                        }
                    }}
                />
                <Stack.Screen
                    name='Profilecard'
                    component={ProfileCard}
                    options={{
                        headerShown: false,
                        headerTitleStyle: {
                            fontSize: 24, fontWeight: "bold"
                        }
                    }}
                />
                <Stack.Screen
                    name='EditProfile'
                    component={EditProfile}
                    options={{
                        headerTitleStyle: {
                            fontSize: 24, fontWeight: "bold"
                        }
                    }}
                />
                <Stack.Screen
                    name='Help'
                    component={Help}
                    options={{
                        headerTitleStyle: {
                            fontSize: 24, fontWeight: "bold"
                        }
                    }}
                />
                <Stack.Screen
                    name='Logout'
                    component={Logout}
                    options={{
                        headerShown: false,
                        headerTitleStyle: {
                            fontSize: 24, fontWeight: "bold"
                        }
                    }}
                />
                <Stack.Screen
                    name='Notification'
                    component={Notification}
                    options={{
                        headerTitleStyle: {
                            fontSize: 24, fontWeight: "bold"
                        }
                    }}
                />
                <Stack.Screen
                    name='Privacy'
                    component={Privacy}
                    options={{
                        headerTitleStyle: {
                            fontSize: 24, fontWeight: "bold"
                        }
                    }}
                />
                <Stack.Screen
                    name='Settings'
                    component={Settings}
                    options={{
                        headerTitleStyle: {
                            fontSize: 24, fontWeight: "bold"
                        }
                    }}
                />
            </Stack.Navigator>
        </NavigationIndependentTree>
    );
}