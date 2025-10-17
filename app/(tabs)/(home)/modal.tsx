import { useRouter } from "expo-router";
import { Pressable, Text } from "react-native";

export default function ModalScreen() {
  const { dismiss, navigate } = useRouter();

  return (
    <>
      <Text>Modal Screen</Text>
      <Pressable
        onPress={() => {
          console.log("Click");
          dismiss();
          navigate({ pathname: "/map" });
        }}
      >
        <Text>Go to Home</Text>
      </Pressable>
      {/* <Link href="/(tabs)/map">
        <Text>Go to Map</Text>
      </Link> */}
    </>
  );
}
