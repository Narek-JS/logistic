# Yo-Logistic Project Snapshot

This snapshot contains all the relevant files from the yo-logistic project, excluding heavy folders like .expo, android, .vscode, assets, ios, node_modules, scripts, and package-lock.json.

---

## 📁 app.json

```json
{
  "expo": {
    "name": "yo-logistic",
    "slug": "yo-logistic",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "yologistic",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.anonymous.yo-logistic"
    },
    "android": {
      "adaptiveIcon": {
        "backgroundColor": "#E6F4FE"
        // "foregroundImage": "./assets/images/android-icon-foreground.png",
        // "backgroundImage": "./assets/images/android-icon-background.png",
        // "monochromeImage": "./assets/images/android-icon-monochrome.png"
      },
      "edgeToEdgeEnabled": true,
      "predictiveBackGestureEnabled": false,
      "package": "com.anonymous.yologistic"
    },
    "web": {
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/icon.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#ffffff",
          "dark": {
            "backgroundColor": "#000000"
          }
        }
      ],
      "expo-localization"
    ],
    "experiments": {
      "typedRoutes": true,
      "reactCompiler": true
    }
  }
}
```

---

## 📁 package.json

```json
{
  "name": "yo-logistic",
  "main": "expo-router/entry",
  "version": "1.0.0",
  "scripts": {
    "start": "expo start",
    "reset-project": "node ./scripts/reset-project.js",
    "android": "expo run:android",
    "ios": "expo run:ios",
    "web": "expo start --web",
    "lint": "expo lint"
  },
  "dependencies": {
    "@expo/vector-icons": "^15.0.2",
    "@gorhom/bottom-sheet": "^5.2.6",
    "@hookform/resolvers": "^5.2.2",
    "@react-navigation/bottom-tabs": "^7.4.0",
    "@react-navigation/elements": "^2.6.3",
    "@react-navigation/native": "^7.1.8",
    "@reduxjs/toolkit": "^2.9.1",
    "expo": "~54.0.13",
    "expo-constants": "~18.0.9",
    "expo-dev-client": "~6.0.15",
    "expo-font": "~14.0.9",
    "expo-haptics": "~15.0.7",
    "expo-image": "~3.0.9",
    "expo-linking": "~8.0.8",
    "expo-localization": "~17.0.7",
    "expo-router": "~6.0.11",
    "expo-splash-screen": "~31.0.10",
    "expo-status-bar": "~3.0.8",
    "expo-symbols": "~1.0.7",
    "expo-system-ui": "~6.0.7",
    "expo-web-browser": "~15.0.8",
    "i18n-js": "^4.5.1",
    "libphonenumber-js": "^1.12.24",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "react-hook-form": "^7.65.0",
    "react-native": "0.81.4",
    "react-native-device-info": "^14.1.1",
    "react-native-gesture-handler": "~2.28.0",
    "react-native-reanimated": "^4.1.3",
    "react-native-safe-area-context": "~5.6.0",
    "react-native-screens": "~4.16.0",
    "react-native-web": "~0.21.0",
    "react-native-worklets": "^0.6.1",
    "react-redux": "^9.2.0",
    "world-countries": "^5.1.0",
    "yup": "^1.7.1"
  },
  "devDependencies": {
    "@types/react": "~19.1.0",
    "eslint": "^9.25.0",
    "eslint-config-expo": "~10.0.0",
    "typescript": "~5.9.2"
  },
  "private": true
}
```

---

## 📁 tsconfig.json

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "resolveJsonModule": true,
    "strict": true,
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["**/*.ts", "**/*.tsx", ".expo/types/**/*.ts", "expo-env.d.ts"]
}
```

---

## 📁 eslint.config.js

```javascript
// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
]);
```

---

## 📁 README.md

```markdown
# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
```

---

## 📁 expo-env.d.ts

```typescript
/// <reference types="expo/types" />

// NOTE: This file should not be edited and should be in your git ignore
```

---

## 📁 app/_layout.tsx

```tsx
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
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
        <BottomSheetModalProvider>
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
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}
```

---

## 📁 app/(auth)/_layout.tsx

```tsx
import { Stack } from "expo-router";

export default function AuthLayout() {
  // A Stack navigator for Auth screens (Login, Register, etc.)
  return <Stack screenOptions={{ headerShown: false }} />;
}
```

---

## 📁 app/(auth)/index.tsx

```tsx
import { Image, StyleSheet, View, TouchableOpacity } from "react-native";
import { ButtonPrimary, ButtonSecondary } from "@/components/ui/Buttons";
import { TermsAndPrivacy } from "@/components/TermsAndPrivacy";
import { BottomSheet } from "@/components/shared";
import { useLocale } from "@/hooks/useLocal";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { Text } from "@/components/ui";
import { useState } from "react";

type UserType = "client" | "courier";

const WelcomeScreen: React.FC = () => {
  const [type, setType] = useState<UserType>("client");
  const { t } = useLocale();
  const router = useRouter();

  const handleSignIn = () => router.push("/login");
  const handleSignUp = () => {
    if (type === "client") {
      router.push("/(auth)/register/client/step-1");
    } else if (type === "courier") {
      router.push("/(auth)/register/driver/step-1");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/welcome.png")}
        style={styles.backgroundImage}
      />

      <BottomSheet enablePanDownToClose={false} backdrop={false} index={0}>
        <View style={styles.bottomSheetContent}>
          {/* Tab Buttons */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, type === "client" && styles.tabActive]}
              onPress={() => setType("client")}
            >
              <Text
                style={[
                  type === "client" && styles.tabTextActive,
                  styles.tabText,
                ]}
              >
                {t("client")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, type === "courier" && styles.tabActive]}
              onPress={() => setType("courier")}
            >
              <Text
                style={[
                  styles.tabText,
                  type === "courier" && styles.tabTextActive,
                ]}
              >
                {t("courier")}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <ButtonPrimary onPress={handleSignIn}>{t("sign_in")}</ButtonPrimary>
            <ButtonSecondary onPress={handleSignUp}>
              {t("createAccount")}
            </ButtonSecondary>
          </View>

          {/* Terms and Privacy */}
          <TermsAndPrivacy
            termsCallback={() => console.log("Terms Pressed")}
            privacyCallback={() => console.log("Privacy Pressed")}
          />
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  bottomSheetContent: {
    flex: 1,
    gap: 48,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  tabContainer: {
    flexDirection: "row",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.secondary,
  },
  tabActive: {
    borderBottomColor: "#000000",
  },
  tabText: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "500",
  },
  tabTextActive: {
    color: "#000000",
    fontWeight: "600",
  },
  buttonContainer: {
    gap: 16,
  },
});

export default WelcomeScreen;
```

---

## 📁 app/(auth)/login.tsx

```tsx
import { Text } from "react-native";

const Login = () => {
  return <Text style={{ color: "black", margin: 100 }}>Login Page</Text>;
};

export default Login;
```

---

## 📁 app/(auth)/register/_layout.tsx

```tsx
import { Stack } from "expo-router";

export default function RegisterLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
```

---

## 📁 app/(auth)/register/client/_layout.tsx

```tsx
// app/(auth)/register/client/_layout.tsx
import { Stack } from "expo-router";

export default function ClientRegisterLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
```

---

## 📁 app/(auth)/register/client/step-1.tsx

```tsx
import { TouchableOpacity, StyleSheet, ScrollView, View } from "react-native";
import { ButtonPrimary, ButtonSecondary } from "@/components/ui/Buttons";
import { TermsAndPrivacy } from "@/components/TermsAndPrivacy";
import { PhoneNumberInput } from "@/components/shared";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesome } from "@expo/vector-icons";
import { YoPhoneIcon } from "@/components/Icons";
import { Stack, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { Text } from "@/components/ui";
import parsePhoneNumber from "libphonenumber-js";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .test(
      "is-valid-phone",
      "Please enter a valid phone number",
      function (value) {
        if (!value) return false;
        try {
          const phoneNumber = parsePhoneNumber(value);
          return phoneNumber ? phoneNumber.isValid() : false;
        } catch {
          return false;
        }
      }
    )
    .required("Phone number is required"),
});

export default function ClientPhoneStep() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: { phoneNumber: "" },
  });

  const onSubmit = (data: { phoneNumber: string }) => {
    router.push("/(auth)/register/client/step-2");
  };

  const handleYoPhone = () => {
    console.log("YoPhone integration");
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <View style={styles.headerRightContainer}>
              <Text style={styles.stepActive}>1/</Text>
              <Text style={styles.stepInactive}>2</Text>
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <FontAwesome name="chevron-left" size={16} />
            </TouchableOpacity>
          ),
          title: "Client Phone Verification",
          headerShown: true,
        }}
      />
      <ScrollView
        contentContainerStyle={styles.content}
        style={styles.container}
      >
        <View style={{ gap: 5 }}>
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field, fieldState }) => (
              <PhoneNumberInput
                onChange={field.onChange}
                placeholder="Enter phone number"
                value={field.value}
                error={fieldState.error?.message}
                defaultCountry="AM"
              />
            )}
          />
          <ButtonPrimary
            style={styles.sendCodeButton}
            disabled={!isValid}
            onPress={handleSubmit(onSubmit)}
          >
            Send Code
          </ButtonPrimary>
        </View>

        <View style={{ gap: 16, marginBottom: 24 }}>
          <ButtonSecondary style={styles.yoPhoneButton} onPress={handleYoPhone}>
            <YoPhoneIcon />
            <Text>Continue with Yo. sPhone</Text>
          </ButtonSecondary>
          <TermsAndPrivacy
            termsCallback={() => console.log("Terms pressed")}
            privacyCallback={() => console.log("Privacy pressed")}
          />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flexGrow: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  headerRightContainer: {
    fontWeight: "bold",
    flexDirection: "row",
    alignItems: "center",
  },
  stepActive: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "bold",
  },
  stepInactive: {
    fontSize: 16,
    color: "#BDBDBD",
    fontWeight: "bold",
  },
  sendCodeButton: {
    marginTop: 8,
  },
  spacer: {
    flex: 1,
  },
  yoPhoneButton: {
    backgroundColor: Colors.secondary,
    height: 54,
    borderRadius: 12,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
```

---

## 📁 app/(auth)/register/client/step-2.tsx

```tsx
import { selectToken } from "@/store/auth/selectors";
import { View, Text, Button } from "react-native";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "expo-router";

export default function ClientRegStep2() {
  const router = useRouter();
  const token = useAppSelector(selectToken);

  console.log("token in step 2", token);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
      }}
    >
      <Text>Client Registration — Step 2</Text>
      <Button
        title="Back"
        onPress={() => router.push("/(auth)/register/client/step-1")}
      />
    </View>
  );
}
```

---

## 📁 app/(auth)/register/driver/_layout.tsx

```tsx
import { Stack } from "expo-router";

export default function DriverRegisterLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
```

---

## 📁 app/(auth)/register/driver/step-1.tsx

```tsx
import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function DriverRegStep1() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
      }}
    >
      <Text>Driver Registration — Step 1</Text>
      <Button
        title="Next"
        onPress={() => router.push("/(auth)/register/driver/step-2")}
      />
    </View>
  );
}
```

---

## 📁 app/(auth)/register/driver/step-2.tsx

```tsx
import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function DriverRegStep1() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
      }}
    >
      <Text>Driver Registration — Step 1</Text>
      <Button
        title="Back"
        onPress={() => router.push("/(auth)/register/driver/step-1")}
      />
    </View>
  );
}
```

---

## 📁 app/(client)/_layout.tsx

```tsx
// app/(client)/_layout.tsx
import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function ClientLayout() {
  return (
    <Tabs
      screenOptions={{ tabBarActiveTintColor: "tomato" /* style as needed */ }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Client Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
```

---

## 📁 app/(client)/index.tsx

```tsx
// app/(client)/index.tsx  (Client Home Screen)
import { View, Text } from "react-native";

export default function ClientHomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Client Home Screen</Text>
    </View>
  );
}
```

---

## 📁 app/(client)/profile.tsx

```tsx
// app/(client)/profile.tsx  (Client Profile Screen)
import { View, Text } from "react-native";

export default function ClientProfileScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Client Profile Screen</Text>
    </View>
  );
}
```

---

## 📁 app/(driver)/_layout.tsx

```tsx
// app/(driver)/_layout.tsx
import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function DriverLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "tomato" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Driver Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="id-card" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
```

---

## 📁 app/(driver)/index.tsx

```tsx
// app/(driver)/index.tsx  (Driver Home Screen)
import { View, Text } from "react-native";

export default function DriverHomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Driver Home Screen</Text>
    </View>
  );
}
```

---

## 📁 app/(driver)/profile.tsx

```tsx
// app/(driver)/profile.tsx  (Driver Profile Screen)
import { View, Text } from "react-native";

export default function DriverProfileScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Driver Profile Screen</Text>
    </View>
  );
}
```

---

## 📁 components/Icons/index.ts

```typescript
export { ArrowBottom } from "./ArrowBottom";
export { YoPhoneIcon } from "./YoPhoneIcon";
```

---

## 📁 components/Icons/ArrowBottom/index.tsx

```tsx
import { FontAwesome } from "@expo/vector-icons";
import { View } from "react-native";

const ArrowBottom = () => {
  return (
    <View>
      <FontAwesome name="chevron-down" size={12} color="#6b7280" />
    </View>
  );
};

export { ArrowBottom };
```

---

## 📁 components/Icons/YoPhoneIcon/index.tsx

```tsx
const YoPhoneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 26 26"
    fill="none"
    height="26"
    width="26"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.1988 16.4454C12.7518 18.308 14.0128 19.5209 15.9484 19.9757C16.9107 20.1923 18.3929 20.4847 21.0697 20.149C23.4035 19.77 24.9961 18.5246 25.6157 16.2397C26.1243 14.3554 26.1243 12.4495 25.6378 10.5653C25.1068 8.54027 23.7906 7.22997 21.7001 6.74266C19.8308 6.29867 17.9283 6.29867 16.048 6.75349C13.9907 7.2408 12.6965 8.50779 12.1545 10.5003C11.6126 12.482 11.6126 14.4746 12.1988 16.4454ZM20.9922 10.078L20.7931 9.92641C20.3618 9.60155 19.7313 9.67735 19.4105 10.0997L18.8685 10.7819C18.5367 11.2151 18.6142 11.8215 19.0455 12.1464C19.2778 12.3304 19.3552 12.6337 19.2225 12.8936C19.1008 13.1426 18.957 13.37 18.7801 13.5866C18.6142 13.8032 18.4261 14.0089 18.2159 14.1822C17.9947 14.3663 17.6629 14.3771 17.4306 14.2039C16.9992 13.879 16.3798 13.9548 16.048 14.3771L15.506 15.0594C15.495 15.0702 15.495 15.0702 15.495 15.0702C15.1632 15.4925 15.2406 16.1098 15.683 16.4347L15.8821 16.5863C16.9218 17.3876 18.8685 17.0627 20.5498 14.9294C21.5673 13.6408 21.8992 12.4279 21.7777 11.4966C21.7222 10.9335 21.4347 10.4245 20.9922 10.078Z"
      fill="black"
    />
    <path
      d="M10.9862 5.70422C11.2345 5.66046 11.4504 5.87924 11.3856 6.13083C11.1805 7.03875 10.9754 7.90292 10.7595 8.77801C10.1334 11.4361 9.51813 14.0942 8.85964 16.7414C8.67613 17.4634 8.38469 18.1635 8.07162 18.8417C7.55348 19.9465 6.60353 20.5262 5.4269 20.5809C3.76449 20.6247 1.64871 20.6575 0.666381 20.6575C0.418101 20.6575 0.223795 20.4606 0.213 20.209L0.137436 18.0541C0.126641 17.8244 0.288563 17.6275 0.50446 17.5837C0.806715 17.529 2.3072 17.5071 3.28952 17.4962C3.69973 17.4962 3.96959 17.0587 3.79688 16.6867C2.84693 14.5865 0.353331 9.01867 0.0186923 7.92479C-0.0568715 7.68413 0.105051 7.43254 0.353331 7.39973C1.16294 7.26846 2.49071 7.12626 3.69973 6.92936C3.93722 6.89654 4.1531 7.04969 4.21788 7.29034C4.67127 9.24837 5.93426 12.8144 5.93426 12.8144C5.93426 12.8144 6.00982 12.8144 6.11777 12.8144C6.20412 12.344 6.64672 8.43892 6.89499 6.91842C6.94897 6.6012 7.06772 6.46993 7.40236 6.4043C8.58979 6.18552 9.76642 5.94487 10.9862 5.70422Z"
      fill="black"
    />
  </svg>
);

export { YoPhoneIcon };
```

---

## 📁 components/shared/index.tsx

```tsx
export { BottomSheetModal } from "./BottomSheets/BottomSheetModal";
export { BottomSheet } from "./BottomSheets/BottomSheet";
export { PhoneNumberInput } from "./PhoneNumberInput";
```

---

## 📁 components/shared/BottomSheets/BottomSheet.tsx

```tsx
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useCallback, useImperativeHandle, useRef, forwardRef } from "react";
import { StyleSheet } from "react-native";

export interface CustomBottomSheetProps
  extends Omit<BottomSheetProps, "children" | "ref"> {
  viewProps?: React.ComponentProps<typeof BottomSheetView>;
  children: React.ReactNode;
  asScrollable?: boolean;
  onClose?: () => void;
  backdrop?: boolean;
  index?: number;
}

export interface BottomSheetRef {
  snapToIndex: (index: number) => void;
  close: () => void;
}

const CustomBottomSheet = forwardRef<BottomSheetRef, CustomBottomSheetProps>(
  (
    {
      backdrop = true,
      asScrollable,
      viewProps,
      children,
      onClose,
      index,
      ...restProps
    },
    ref
  ) => {
    const sheetRef = useRef<BottomSheetMethods>(null);

    useImperativeHandle(
      ref,
      () => ({
        snapToIndex: (snapIndex: number) => {
          sheetRef.current?.snapToIndex(snapIndex);
        },
        close: () => {
          sheetRef.current?.close();
        },
      }),
      []
    );

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.5}
        />
      ),
      []
    );

    return (
      <BottomSheet
        ref={sheetRef}
        index={index ?? 0}
        enableDynamicSizing={false}
        snapPoints={restProps.snapPoints || ["45%"]}
        backgroundStyle={
          restProps.backgroundStyle || styles.bottomSheetBackground
        }
        enablePanDownToClose={
          restProps.enablePanDownToClose === undefined
            ? true
            : restProps.enablePanDownToClose
        }
        handleIndicatorStyle={
          restProps.handleIndicatorStyle || styles.handleIndicator
        }
        onChange={(idx) => {
          if (idx === -1) {
            onClose?.();
          }
        }}
        {...(backdrop && { backdropComponent: renderBackdrop })}
        {...restProps}
      >
        {asScrollable ? (
          children
        ) : (
          <BottomSheetView {...viewProps}>{children}</BottomSheetView>
        )}
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  handleIndicator: {
    backgroundColor: "#7878801F",
  },
  bottomSheetBackground: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
});

CustomBottomSheet.displayName = "BottomSheet";

export { CustomBottomSheet as BottomSheet };
```

---

## 📁 components/shared/BottomSheets/BottomSheetModal.tsx

```tsx
import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetModalProps,
} from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useCallback, useImperativeHandle, useRef, forwardRef } from "react";
import { StyleSheet } from "react-native";

export interface CustomBottomSheetModalProps
  extends Omit<BottomSheetModalProps, "children" | "ref"> {
  viewProps?: React.ComponentProps<typeof BottomSheetView>;
  children: React.ReactNode;
  asScrollable?: boolean;
  onClose?: () => void;
  backdrop?: boolean;
}

export interface BottomSheetModalRef {
  snapToIndex: (index: number) => void;
  present: () => void;
  dismiss: () => void;
  close: () => void;
}

const CustomBottomSheetModal = forwardRef<
  BottomSheetModalRef,
  CustomBottomSheetModalProps
>(
  (
    {
      backdrop = true,
      asScrollable,
      viewProps,
      children,
      onClose,
      ...restProps
    },
    ref
  ) => {
    const modalRef = useRef<BottomSheetModalMethods>(null);

    useImperativeHandle(
      ref,
      () => ({
        snapToIndex: (snapIndex: number) => {
          if (snapIndex === -1) {
            modalRef.current?.dismiss();
          } else {
            modalRef.current?.present();
            setTimeout(() => {
              modalRef.current?.snapToIndex(snapIndex);
            }, 50);
          }
        },
        close: () => modalRef.current?.dismiss(),
        present: () => modalRef.current?.present(),
        dismiss: () => modalRef.current?.dismiss(),
      }),
      []
    );

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.5}
        />
      ),
      []
    );

    return (
      <BottomSheetModal
        ref={modalRef}
        snapPoints={restProps.snapPoints || ["45%"]}
        backgroundStyle={
          restProps.backgroundStyle || styles.bottomSheetBackground
        }
        enablePanDownToClose={
          restProps.enablePanDownToClose === undefined
            ? true
            : restProps.enablePanDownToClose
        }
        handleIndicatorStyle={
          restProps.handleIndicatorStyle || styles.handleIndicator
        }
        onDismiss={onClose}
        {...(backdrop && { backdropComponent: renderBackdrop })}
        {...restProps}
      >
        {asScrollable ? (
          children
        ) : (
          <BottomSheetView {...viewProps}>{children}</BottomSheetView>
        )}
      </BottomSheetModal>
    );
  }
);

const styles = StyleSheet.create({
  handleIndicator: {
    backgroundColor: "#7878801F",
  },
  bottomSheetBackground: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
});

CustomBottomSheetModal.displayName = "BottomSheetModal";

export { CustomBottomSheetModal as BottomSheetModal };
```

---

## 📁 components/shared/PhoneNumberInput/index.tsx

```tsx
import { Select, SelectProps } from "@/components/ui/Select";
import { StyleSheet, TextInput, View } from "react-native";
import { useEffect, useMemo, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Text } from "@/components/ui";
import parsePhoneNumber, { CountryCode } from "libphonenumber-js";
import countryData, { Country } from "world-countries";

export interface PhoneNumberInputProps {
  onChange?: (value: string) => void;
  defaultCountry?: CountryCode;
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  error?: string;
  style?: any;
}

const getCountryNumber = (country: Country) =>
  country.idd.root +
  (country.idd.suffixes.length === 1 ? country.idd.suffixes[0] : "");

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  onChange,
  placeholder = "Phone number",
  defaultCountry = "AM",
  disabled = false,
  error,
  value,
  style,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState<
    CountryCode | undefined
  >(defaultCountry);

  const selectedCountry = useMemo(
    () => countryData.find((country) => country.cca2 === selectedCountryCode),
    [selectedCountryCode]
  );

  const countryOptions = useMemo(
    () =>
      countryData.map<SelectProps["options"][0]>((country) => ({
        title: (
          <Text style={styles.countryOption}>
            {country.flag} {getCountryNumber(country)} {country.name.common}
          </Text>
        ),
        value: country.cca2,
        extra: { countryName: country.name.common },
      })),
    []
  );

  const handleInputChange = (text: string) => {
    setInputValue(text);

    const phoneNumber = parsePhoneNumber(
      (selectedCountry ? getCountryNumber(selectedCountry) : "") + text,
      selectedCountryCode
    );

    if (phoneNumber) {
      onChange?.(phoneNumber.number);
    }
  };

  useEffect(() => {
    const parsedValue = value ? parsePhoneNumber(value) : undefined;

    if (parsedValue) {
      setSelectedCountryCode(parsedValue.country);
      setInputValue(parsedValue.nationalNumber);
    }
  }, [value]);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.inputRow}>
        {/* Country Code Selector */}
        <Select
          value={selectedCountryCode}
          options={countryOptions}
          onChange={(value) => setSelectedCountryCode(value as CountryCode)}
          renderSelectedValue={() => (
            <View style={styles.codeCellContent}>
              <View style={styles.codeLabelRow}>
                <Text style={styles.codeLabel}>Code</Text>
                <FontAwesome name="chevron-down" size={12} color="#6b7280" />
              </View>
              <View style={styles.codeValueRow}>
                <Text style={styles.countryFlag}>{selectedCountry?.flag}</Text>
                <Text style={styles.codeValue}>
                  {selectedCountry ? getCountryNumber(selectedCountry) : "+374"}
                </Text>
              </View>
            </View>
          )}
          style={[styles.countrySelectWrapper, disabled && styles.disabledCell]}
          inputStyle={styles.countrySelectInput}
          title="Select Country"
          hideArrow={true}
        />

        {/* Phone Number Input */}
        <View style={styles.phoneCell}>
          <Text style={styles.phoneLabel}>Phone Number</Text>
          <TextInput
            keyboardType="phone-pad"
            placeholder={placeholder}
            placeholderTextColor="#6b7280"
            style={[styles.phoneInput, disabled && styles.disabledInput]}
            value={inputValue}
            onChangeText={handleInputChange}
            returnKeyType="done"
            editable={!disabled}
          />
        </View>
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputRow: {
    flexDirection: "row",
    backgroundColor: Colors.secondary,
    borderRadius: 12,
    overflow: "hidden",
  },
  codeCell: {
    width: 92,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 6,
  },
  countrySelectWrapper: {
    width: 92,
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderWidth: 0,
    borderRadius: 0,
    backgroundColor: "transparent",
    height: "auto",
    minWidth: 0,
  },
  codeCellContent: {
    width: 60,
  },
  countrySelectInput: {
    width: 92,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 0,
    borderRadius: 0,
    backgroundColor: "transparent",
    height: "auto",
    minWidth: 0,
  },
  phoneCell: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 6,
    borderLeftWidth: 1,
    borderLeftColor: "#e5e7eb",
  },
  codeLabel: {
    fontSize: 12,
    color: "#6b7280",
  },
  codeLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  phoneLabel: {
    fontSize: 12,
    color: "#6b7280",
  },
  codeValueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  countryFlag: {
    fontSize: 16,
  },
  codeValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  phoneInput: {
    fontSize: 16,
    padding: 0,
    height: 22,
    color: "#000",
  },
  countryOption: {
    fontSize: 16,
    color: "#000",
  },
  errorText: {
    color: "#ef4444",
    fontSize: 12,
    marginTop: 4,
  },
  disabledCell: {
    opacity: 0.5,
  },
  disabledInput: {
    opacity: 0.5,
  },
});

export { PhoneNumberInput };
```

---

## 📁 components/SplashScreen/index.tsx

```tsx
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import { useLocale } from "@/hooks/useLocal";
import { Text } from "../ui";

const SplashScreen: React.FC = () => {
  const { t } = useLocale();

  return (
    <ImageBackground
      source={require("@/assets/images/splashBg.png")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.contentContainer}>
          <Image
            source={require("@/assets/images/icon.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appName}>{t("appName")}</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.76)",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 12,
  },
  appName: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default SplashScreen;
```

---

## 📁 components/TermsAndPrivacy/index.tsx

```tsx
import { View, Text, StyleSheet } from "react-native";
import { useLocale } from "@/hooks/useLocal";
import { Colors } from "@/constants/Colors";

interface Props {
  privacyCallback?: () => void;
  termsCallback?: () => void;
}

const TermsAndPrivacy: React.FC<Props> = (props) => {
  const { t } = useLocale();

  return (
    <View style={styles.termsContainer}>
      <Text style={styles.termsText}>
        {t("terms.agreement")}{" "}
        <Text style={styles.termsLink} onPress={props.termsCallback}>
          {t("terms.terms")}
        </Text>{" "}
        {t("terms.and")}{" "}
        <Text style={styles.termsLink} onPress={props.privacyCallback}>
          {t("terms.privacyPolicy")}
        </Text>
        {t("terms.period")}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  termsContainer: {
    alignItems: "center",
  },
  termsText: {
    fontSize: 13,
    maxWidth: 300,
    color: Colors.secondaryLabel,
    textAlign: "center",
    lineHeight: 18,
  },
  termsLink: {
    fontSize: 13,
    color: "#000000",
    textDecorationLine: "underline",
  },
});

export { TermsAndPrivacy };
```

---

## 📁 components/ui/index.ts

```typescript
export { default as Select } from "./Select";
export { Text } from "./Text";
```

---

## 📁 components/ui/Buttons/index.tsx

```tsx
export { ButtonPrimary } from "./ButtonPrimary";
export { ButtonSecondary } from "./ButtonSecondary";
```

---

## 📁 components/ui/Buttons/ButtonPrimary.tsx

```tsx
import {
  TouchableOpacityProps,
  TouchableOpacity,
  StyleSheet,
  TextProps,
  StyleProp,
  TextStyle,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { Text } from "@/components/ui";

interface ButtonPrimaryProps extends TouchableOpacityProps {
  textStyle?: StyleProp<TextStyle>;
  textProps?: TextProps;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  style,
  textStyle,
  textProps,
  children,
  ...touchableOpacityProps
}) => {
  return (
    <TouchableOpacity
      style={[styles.primaryButton, style]}
      activeOpacity={0.8}
      {...touchableOpacityProps}
    >
      <Text style={[styles.primaryButtonText, textStyle]} {...textProps}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    width: "100%",
    height: 50,
  },
  primaryButtonText: {
    fontWeight: "700",
    fontSize: 17,
  },
});

export { ButtonPrimary };
```

---

## 📁 components/ui/Buttons/ButtonSecondary.tsx

```tsx
import {
  TouchableOpacityProps,
  TouchableOpacity,
  StyleSheet,
  TextProps,
  StyleProp,
  TextStyle,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { Text } from "@/components/ui";

interface ButtonSecondaryProps extends TouchableOpacityProps {
  textStyle?: StyleProp<TextStyle>;
  textProps?: TextProps;
}

const ButtonSecondary: React.FC<ButtonSecondaryProps> = ({
  style,
  textStyle,
  textProps,
  children,
  ...touchableOpacityProps
}) => {
  return (
    <TouchableOpacity
      style={[styles.secondaryButton, style]}
      activeOpacity={0.8}
      {...touchableOpacityProps}
    >
      <Text style={[styles.secondaryButtonText, textStyle]} {...textProps}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  secondaryButton: {
    backgroundColor: Colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    width: "100%",
    height: 50,
  },
  secondaryButtonText: {
    fontWeight: "600",
    fontSize: 17,
  },
});

export { ButtonSecondary };
```

---

## 📁 components/ui/Select/index.tsx

```tsx
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  Pressable,
  StyleProp,
  View,
} from "react-native";
import { BottomSheetModal } from "@/components/shared/BottomSheets/BottomSheetModal";
import { horizontalScale, verticalScale } from "@/utils/device-scale";
import { ArrowBottom } from "@/components/Icons/ArrowBottom";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Text } from "@/components/ui/Text";
import { Colors } from "@/constants/Colors";
import { ReactNode, useRef } from "react";

interface SelectOption {
  title: ReactNode;
  value: string;
  extra?: any;
}

export interface SelectProps {
  renderSelectedValue?: (value: string) => React.ReactNode;
  onChange?: (value: string) => void;
  inputStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  options: SelectOption[];
  placeholder?: string;
  hideArrow?: boolean;
  value?: string;
  error?: string;
  title?: string;
}

const Select: React.FC<SelectProps> = ({
  renderSelectedValue,
  hideArrow = false,
  placeholder,
  inputStyle,
  onChange,
  options,
  style,
  value,
  title,
  error,
}) => {
  const bottomSheetRef = useRef<any>(null);

  const selectedOption = options.find((option) => option.value === value);

  const handleSelectPress = () => {
    bottomSheetRef.current?.present();
  };

  const handleOptionSelect = (selectedValue: string) => {
    onChange?.(selectedValue);
    bottomSheetRef.current?.dismiss();
  };

  return (
    <>
      <View style={style}>
        <Pressable
          onPress={handleSelectPress}
          style={[styles.input, inputStyle]}
        >
          {selectedOption ? (
            typeof selectedOption.title === "string" ? (
              <Text style={{ fontSize: 16 }}>{selectedOption.title}</Text>
            ) : typeof renderSelectedValue === "function" ? (
              renderSelectedValue(selectedOption.value)
            ) : (
              selectedOption.title
            )
          ) : (
            <Text style={{ fontSize: 16 }}>{placeholder}</Text>
          )}
          {!hideArrow && (
            <View style={styles.arrow}>
              <ArrowBottom />
            </View>
          )}
        </Pressable>

        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>

      <BottomSheetModal
        onClose={() => {}}
        enablePanDownToClose={true}
        ref={bottomSheetRef}
        snapPoints={["60%"]}
        asScrollable
      >
        <BottomSheetFlatList
          data={options}
          keyExtractor={(item: any) => item.value}
          renderItem={({ item }: any) => (
            <TouchableOpacity
              style={styles.optionItem}
              onPress={() => handleOptionSelect(item.value)}
            >
              {item.title}
            </TouchableOpacity>
          )}
          ListHeaderComponent={
            <View style={styles.bottomSheetHeader}>
              <Text style={styles.bottomSheetTitle}>
                {title || "Select Option"}
              </Text>
            </View>
          }
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
          bounces={false}
        />
      </BottomSheetModal>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    minWidth: horizontalScale(50),
    borderWidth: 0.3,
    borderColor: Colors.secondary,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    // paddingVertical: verticalScale(20),
    paddingLeft: verticalScale(16),
    height: 50,
    paddingRight: horizontalScale(50),
  },
  arrow: {
    position: "absolute",
    right: 20,
    top: "-50%",
    transform: "translateY(50%)",
  },
  errorText: {
    color: "#ef4444",
    fontSize: 12,
    marginTop: 4,
  },
  bottomSheetHeader: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    marginBottom: 10,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
});

export { Select };
```

---

## 📁 components/ui/Text/index.tsx

```tsx
import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";

const CustomText: React.FC<TextProps> = (props) => {
  return <Text {...props} style={[styles.defaultFont, props.style]} />;
};

const styles = StyleSheet.create({
  defaultFont: {
    fontFamily: "open-sans",
  },
});

export { CustomText as Text };
```

---

## 📁 constants/Colors.ts

```typescript
const Colors = {
  primary: "rgba(230, 244, 78, 1)",
  secondary: "rgba(120, 120, 128, 0.12)",
  secondaryLabel: "rgba(60, 60, 67, 0.6)",
};

export { Colors };
```

---

## 📁 constants/storage.ts

```typescript
enum StorageEnum {
  ACCESS_TOKEN = "access_token",
}

export { StorageEnum };
```

---

## 📁 constants/urls.ts

```typescript
const BASE_URL = "https://api.yo-logistic.com";

export { BASE_URL };
```

---

## 📁 hooks/useLocal.ts

```typescript
import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";
import { useMemo, useState } from "react";
import en from "../locales/en.json";
import hy from "../locales/hy.json";

// This utility type can remain the same
type TranslationPaths<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}.${TranslationPaths<T[K]>}`
          : K
        : never;
    }[keyof T]
  : never;

export type TranslationKey = TranslationPaths<typeof en>;

const i18n = new I18n({
  en,
  hy,
});

// Set the initial locale
i18n.locale = getLocales()[0].languageCode ?? "en";
i18n.enableFallback = true;
i18n.defaultLocale = "en";

export const useLocale = () => {
  const [locale, setLocaleState] = useState(i18n.locale);

  const localeUtils = useMemo(
    () => ({
      t: (scope: TranslationKey, options?: object) =>
        i18n.t(scope, { ...options, locale }),
      setLocale: (newLocale: "en" | "hy") => {
        i18n.locale = newLocale;
        setLocaleState(newLocale);
      },
      locale,
    }),
    [locale]
  );

  return localeUtils;
};
```

---

## 📁 hooks/useUser.ts

```typescript
export const useUser = (): { role: "client" | "driver" | null } | null => {
  // SIMULATE USER STATE HERE
  // return { role: "driver" };
  // return { role: "client" };
  return null;
  // return null;
};
```

---

## 📁 store/api.ts

```typescript
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants/urls";

const RTKApi = createApi({
  reducerPath: "api",
  endpoints: () => ({}),
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
});

export { RTKApi };
```

---

## 📁 store/hooks.ts

```typescript
import { type TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

---

## 📁 store/store.ts

```typescript
import { type Action, type ThunkAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { RTKApi } from "./api";
import authReducer from "./auth/slice";

export const store = configureStore({
  reducer: {
    [RTKApi.reducerPath]: RTKApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(RTKApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
```

---

## 📁 store/auth/api.ts

```typescript
import {
  RegisterResponse,
  RegisterRequest,
  LoginResponse,
  LoginRequest,
} from "./types";
import { setAccessToken } from "./slice";
import { RTKApi } from "../api";

const extendedApi = RTKApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (props) => ({
        url: "/auth/login",
        method: "POST",
        body: props,
      }),
      async onQueryStarted(_queryArgument, mutationLifeCycleApi) {
        const response = await mutationLifeCycleApi.queryFulfilled;
        const token = response.data.access_token;
        mutationLifeCycleApi.dispatch(setAccessToken({ token }));
      },
    }),

    register: build.mutation<RegisterResponse, RegisterRequest>({
      query: (props) => ({
        url: "/auth/register",
        method: "POST",
        body: props,
      }),
      async onQueryStarted(_queryArgument, mutationLifeCycleApi) {
        const response = await mutationLifeCycleApi.queryFulfilled;
        const token = response.data.access_token;
        mutationLifeCycleApi.dispatch(setAccessToken({ token }));
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = extendedApi;

export default extendedApi;
```

---

## 📁 store/auth/selectors.ts

```typescript
import { RootState } from "../store";

export const selectToken = (state: RootState) => state.auth.token;
```

---

## 📁 store/auth/slice.ts

```typescript
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<{ token: string }>) {
      // addCookie(StorageEnum.ACCESS_TOKEN, action.payload.token);
      state.token = action.payload.token;
    },
    clearState(state) {
      // removeCookie(StorageEnum.ACCESS_TOKEN, action.payload.token);
      state.token = null;
    },
  },
});

export const { setAccessToken, clearState } = authSlice.actions;
export default authSlice.reducer;
```

---

## 📁 store/auth/types.ts

```typescript
export interface User {
  is_activated: boolean;
  first_name: string;
  last_name: string;
  email: string;
}

export type RegisterResponse = any;
export type RegisterRequest = any;
export type LoginResponse = any;
export type LoginRequest = any;
```

---

## 📁 locales/en.json

```json
{
  "welcome": "Welcome to my App!",
  "appName": "Logistic",
  "courier": "Courier",
  "client": "Client",
  "sign_in": "Sign In",
  "sign_up": "Sign Up",
  "createAccount": "Create an account",
  "home": {
    "title": "This is the Home Screen"
  },
  "terms": {
    "agreement": "By continuing to use YoLog, you agree to the YoLog",
    "terms": "terms",
    "and": "and",
    "privacyPolicy": "privacy policy",
    "period": "."
  }
}
```

---

## 📁 locales/hy.json

```json
{
  "welcome": "Բարի գալուստ իմ հավելված",
  "appName": "Logistic",
  "courier": "Վարորդ",
  "client": "Հաճախորդ",
  "home": {
    "title": "Սա Գլխավոր Էկրանն է"
  },
  "terms": {
    "agreement": "Շարունակելով օգտագործել YoLog-ը, դուք համաձայնվում եք YoLog-ի",
    "terms": "պայմաններին",
    "and": "և",
    "privacyPolicy": "գաղտնիության քաղաքականությանը",
    "period": "։"
  }
}
```

---

## 📁 utils/device-scale.ts

```typescript
import { Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

export const IS_PAD = Platform.OS === "ios" && Platform.isPad;
export const IS_LANDSCAPE = width > height;

const getWidth = () => {
  if (IS_LANDSCAPE) return height;
  return width;
};

const getHeight = () => {
  if (IS_LANDSCAPE) return width;
  return height;
};

export const WINDOW_WIDTH = getWidth();
export const WINDOW_HEIGHT = getHeight();

// Guideline sizes for iPhone 16 and height is a little bit more for android to get the best scale
// Use a simple check for tablet instead of device-info
const isTabletDevice = () => {
  const { width, height } = Dimensions.get("window");
  const aspectRatio = height / width;
  return aspectRatio < 1.6 && Math.min(width, height) >= 600;
};

const guidelineBaseWidth = isTabletDevice() ? 1024 : 390;
const guidelineBaseHeight = isTabletDevice() ? 1366 : 844;

const horizontalScale = (size: number) =>
  (WINDOW_WIDTH / guidelineBaseWidth) * size;

const verticalScale = (size: number) =>
  (WINDOW_HEIGHT / guidelineBaseHeight) * size;

const moderateScale = (size: number, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

export { horizontalScale, verticalScale, moderateScale };
```

---

## 📁 utils/deviceInfo.ts

```typescript
import { getVersion, isTablet } from "react-native-device-info";

// Initialize device info with proper error handling
let APP_VERSION = "1.0.0";
let IS_TABLET = false;

try {
  APP_VERSION = getVersion();
  IS_TABLET = isTablet();
} catch (error) {
  console.warn("Device info not available:", error);
  // Use default values
}

export { APP_VERSION, IS_TABLET };
```

---

## 📁 utils/i18n.ts

```typescript
import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";

// Import all your translation files
import en from "../locales/en.json";
import hy from "../locales/hy.json";

// Create a new i18n instance
const i18n = new I18n();

// Set the supported translations
i18n.translations = {
  en,
  hy,
};

// Set the locale once at the beginning of your app.
const deviceLanguage = getLocales()[0].languageCode;
i18n.locale = deviceLanguage ?? "en";

// When a value is missing from a language it'll fallback to another language with the key present.
i18n.enableFallback = true;

// It will default to English if the device's locale is not available.
i18n.defaultLocale = "en";

export default i18n;
```

---

## Summary

This snapshot contains all the relevant source code files from the yo-logistic React Native/Expo project. The project appears to be a logistics app with:

- **Authentication system** with client and driver registration flows
- **Multi-language support** (English and Armenian)
- **Redux Toolkit** for state management
- **Custom UI components** including buttons, selectors, and bottom sheets
- **Phone number input** with country code selection
- **Form validation** using react-hook-form and yup
- **Navigation** using Expo Router with protected routes
- **Internationalization** with i18n-js

The project structure follows modern React Native best practices with proper separation of concerns, TypeScript support, and a well-organized component architecture.
