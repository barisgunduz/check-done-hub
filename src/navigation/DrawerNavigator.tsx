import { createDrawerNavigator } from "@react-navigation/drawer"
import HomeScreen from "../screens/HomeScreen"
import PremiumScreen from "../screens/PremiumScreen"
import { Text } from "react-native"
import CalendarScreen from "../screens/CalendarScreen"

const Drawer = createDrawerNavigator()

function SettingsScreen() {
    return <Text>Ayarlar</Text>
}

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#000",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    fontWeight: "600",
                },
            }}
        >
            <Drawer.Screen name="Ana Liste" component={HomeScreen} />
            <Drawer.Screen name="Takvim" component={CalendarScreen} />
            <Drawer.Screen name="Ayarlar" component={SettingsScreen} />
        </Drawer.Navigator>
    )
}