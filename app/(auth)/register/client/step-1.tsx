import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function ClientRegStep1() {
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
      <Text>Client Registration — Step 1</Text>
      <Button
        title="Next"
        onPress={() => router.push("/(auth)/register/client/step-2")}
      />
    </View>
  );
}
