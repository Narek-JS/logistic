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
