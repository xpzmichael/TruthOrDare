import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SettingsProvider } from "@/hooks/SettingsContext";
import { TabsLayoutColors } from "@/constants/Colors";

export default function TabsLayout() {
  return (
    <SettingsProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: TabsLayoutColors.TAB_BAR_ACTIVE_TINT,
          headerStyle: {
            backgroundColor: TabsLayoutColors.HEADER_BACKGROUND,
          },
          headerShadowVisible: false,
          headerTintColor: TabsLayoutColors.HEADER_TINT,
          tabBarStyle: {
            backgroundColor: TabsLayoutColors.TAB_BAR_BACKGROUND,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "game",
            headerTitle: "Truth or Dare",
            tabBarIcon: ({ focused, color }) => (
              <Ionicons
                name={focused ? "game-controller" : "game-controller-outline"}
                color={color}
                size={24}
              />)
          }}
        />
        <Tabs.Screen
          name="library"
          options={{
            title: "library",
            headerTitle: "Truth or Dare Question Library",
            tabBarIcon: ({ focused, color }) => (
              <Ionicons
                name={focused ? "chatbubble-ellipses" : "chatbubble-ellipses-outline"}
                color={color}
                size={24}
              />)
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            headerTitle: "Settings",
            tabBarIcon: ({ focused, color }) => (
              <Ionicons
                name={focused ? "settings" : "settings-outline"}
                color={color}
                size={24}
              />)
          }}
        />
      </Tabs>

    </SettingsProvider>
  );
}
