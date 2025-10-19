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
