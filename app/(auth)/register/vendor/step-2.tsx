import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function VendorRegStep1() {
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
      <Text>Vendor Registration — Step 1</Text>
      <Button
        title="Back"
        onPress={() => router.push("/(auth)/register/vendor/step-1")}
      />
    </View>
  );
}
