import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Provider as ReduxProvider } from "react-redux";
import { selectAuthRole } from "@/store/auth/selectors";
import { SplashScreen, Stack } from "expo-router";
import { useAppSelector } from "@/store/hooks";
import { store } from "@/store/store";
import { useFonts } from "expo-font";
import { useEffect } from "react";

import CustomSplashScreen from "../components/SplashScreen";

import "react-native-reanimated";

// Prevent the native splash screen from auto-hiding before we are ready.
SplashScreen.preventAutoHideAsync();

function AppNavigation() {
  const role = useAppSelector(selectAuthRole);
  const isLoggedIn = role !== null && role !== undefined;

  return (
    <Stack>
      <Stack.Protected guard={isLoggedIn && role === "client"}>
        <Stack.Screen name="(client)" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={isLoggedIn && role === "driver"}>
        <Stack.Screen name="(driver)" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  const [fontsLoading, fontsError] = useFonts({
    "open-sans-bold": require("@/assets/fonts/OpenSans-Bold.ttf"),
    "open-sans": require("@/assets/fonts/OpenSans-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoading || fontsError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoading, fontsError]);

  if (!fontsLoading && !fontsError) {
    return <CustomSplashScreen />;
  }

  return (
    <ReduxProvider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <AppNavigation />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </ReduxProvider>
  );
}
