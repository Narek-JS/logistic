import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function ClientRegStep2() {
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
      <Text>Client Registration — Step 2</Text>
      <Button
        title="Back"
        onPress={() => router.push("/(auth)/register/client/step-1")}
      />
    </View>
  );
}
