import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
            headerShown: false,
            tabBarButton: HapticTab,
            tabBarStyle: Platform.select({
              ios: {
                position: "absolute",
                backgroundColor: Colors.dark.background,
              },
              default: {
                backgroundColor: Colors.dark.background,
              },
            }),
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Sports",
              tabBarIcon: ({ focused }) => (
                <IconSymbol
                  size={24}
                  name="football"
                  color={Colors.dark.text}
                />
              ),
              tabBarActiveTintColor: Colors.dark.text,
              tabBarInactiveTintColor: Colors.dark.text,
            }}
          />
        </Tabs>
    </GestureHandlerRootView>
  );
}
