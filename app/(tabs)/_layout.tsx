import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SettingsProvider } from "@/hooks/SettingsContext";
import { TabsLayoutColors } from "@/constants/Colors";
import { useTranslation } from 'react-i18next';
import { TRUTH_OR_DARE, GAME, LIBRARY, SETTINGS, QUESTION_LIBRARY } from "@/constants/TranslationKeys";
import { GestureHandlerRootView } from "react-native-gesture-handler";


export default function TabsLayout() {

  const { t } = useTranslation();

  return (
    <GestureHandlerRootView>
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
            title: t(GAME),
            headerTitle: t(TRUTH_OR_DARE),
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
            title: t(LIBRARY),
            headerTitle: t(QUESTION_LIBRARY),
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
            headerTitle: t(SETTINGS),
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

    </GestureHandlerRootView>
  );
}
