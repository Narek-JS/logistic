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
