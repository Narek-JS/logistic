import { Stack } from "expo-router";

export default function AuthLayout() {
  // A Stack navigator for Auth screens (Login, Register, etc.)
  return <Stack screenOptions={{ headerShown: false }} />;
}
