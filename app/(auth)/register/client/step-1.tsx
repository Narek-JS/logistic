import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import { ButtonPrimary } from "@/components/ui/Buttons";
import { useLoginMutation } from "@/store/auth/api";

import CustomSplashScreen from "@/components/SplashScreen";

export default function ClientRegStep1() {
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async () => {
    const result = await login({
      email: "test@example.com",
      password: "password",
    });
    if (result.data) {
      console.log("Login successful:", result.data);
    } else {
      console.error("Login failed:", result.error);
    }
  };

  if (isLoading) {
    return <CustomSplashScreen />;
  }
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
      }}
    >
      <Text>Client Registration — Step 1</Text>
      <Button
        title="Next"
        onPress={() => router.push("/(auth)/register/client/step-2")}
      />
      <ButtonPrimary onPress={handleLogin}>Request Login</ButtonPrimary>
    </View>
  );
}
