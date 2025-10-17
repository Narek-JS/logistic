import { useLocale } from "@/hooks/useLocal";
import { Link } from "expo-router";
import { Text } from "react-native";

export default function HomeScreen() {
  const { t } = useLocale();

  return (
    <>
      <Text>{t("home.title")}</Text>
      <Link href="/signInRegisterModal">
        <Text>Open Modal</Text>
      </Link>
      <Link href="/map">
        <Text>Go to Map</Text>
      </Link>
      <Link href="/welcome">
        <Text>Go to welcome</Text>
      </Link>
    </>
  );
}
