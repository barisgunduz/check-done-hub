import "react-native-get-random-values"
import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { TaskProvider } from "./src/context/TaskContext"
import { PremiumProvider } from "./src/context/PremiumContext"
import HomeScreen from "./src/screens/HomeScreen"
import PremiumScreen from "./src/screens/PremiumScreen"
import { RootStackParamList } from "./src/types/navigation"

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <PremiumProvider>
      <TaskProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Premium" component={PremiumScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </TaskProvider>
    </PremiumProvider>
  )
}