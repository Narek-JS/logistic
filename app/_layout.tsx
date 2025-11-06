import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { selectAuthRole } from "@/store/auth/selectors";
import { SplashScreen, Stack } from "expo-router";
import { useAppSelector } from "@/store/hooks";
import { use, useEffect } from "react";
import { useFonts } from "expo-font";

import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomSplashScreen from "../components/SplashScreen";
import FlashMessage from "react-native-flash-message";
import StoreProvider from "@/store/Provider";

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

const tokenStream = AsyncStorage.getItem("ape-ape");

export default function RootLayout() {
  const [fontsLoading, fontsError] = useFonts({
    "open-sans-bold": require("@/assets/fonts/OpenSans-Bold.ttf"),
    "open-sans": require("@/assets/fonts/OpenSans-Regular.ttf"),
  });
  const token = use(tokenStream);

  useEffect(() => {
    if (fontsLoading || fontsError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoading, fontsError]);

  if (!fontsLoading && !fontsError) {
    return <CustomSplashScreen />;
  }

  return (
    <StoreProvider preloadedState={{ auth: { token, role: null } }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <AppNavigation />
          <FlashMessage position="bottom" />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </StoreProvider>
  );
}
