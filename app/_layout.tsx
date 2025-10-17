import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import "react-native-reanimated";

export const unstable_settings = {
  initialRouteName: "welcome",
};

export default function RootLayout() {
  const [fontsLoading, fontsError] = useFonts({
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoading || fontsError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoading, fontsError]);

  if (!fontsLoading && !fontsError) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="welcome" />
      <Stack.Screen name="(tabs)" />

      <Stack.Screen
        name="signInRegisterModal"
        options={{ headerShown: false, presentation: "formSheet" }}
      />
    </Stack>
  );
}
