import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SplashScreen, Stack } from "expo-router";
import { useUser } from "@/hooks/useUser";
import { Provider } from "react-redux";
import { store } from "@/store/store";
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
  const isLoggedIn = user?.role !== null && user?.role !== undefined;

  useEffect(() => {
    if (fontsLoading || fontsError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoading, fontsError]);

  if (!fontsLoading && !fontsError) {
    return <CustomSplashScreen />;
  }

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack>
          <Stack.Protected guard={isLoggedIn && user?.role === "client"}>
            <Stack.Screen name="(client)" options={{ headerShown: false }} />
          </Stack.Protected>

          <Stack.Protected guard={isLoggedIn && user?.role === "driver"}>
            <Stack.Screen name="(driver)" options={{ headerShown: false }} />
          </Stack.Protected>

          <Stack.Protected guard={!isLoggedIn}>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          </Stack.Protected>
        </Stack>
      </GestureHandlerRootView>
    </Provider>
  );
}
