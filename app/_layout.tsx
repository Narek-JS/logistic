import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SplashScreen, Stack } from "expo-router";
import { useUser } from "@/hooks/useUser";
import { useFonts } from "expo-font";
import { useEffect } from "react";

import CustomSplashScreen from "../components/SplashScreen";

import "react-native-reanimated";

// Prevent the native splash screen from auto-hiding before we are ready.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoading, fontsError] = useFonts({
    "open-sans-bold": require("@/assets/fonts/OpenSans-Bold.ttf"),
    "open-sans": require("@/assets/fonts/OpenSans-Regular.ttf"),
  });
  const user = useUser();

  useEffect(() => {
    if (fontsLoading || fontsError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoading, fontsError]);

  if (!fontsLoading && !fontsError) {
    return <CustomSplashScreen />;
  }

  return (
    <GestureHandlerRootView>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={!user}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>
        <Stack.Protected guard={user?.role === "driver"}>
          <Stack.Screen name="(driver)" />
        </Stack.Protected>
        <Stack.Protected guard={user?.role === "client"}>
          <Stack.Screen name="(client)" />
        </Stack.Protected>
      </Stack>
    </GestureHandlerRootView>
  );
}
