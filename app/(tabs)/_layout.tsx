import { Tabs } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/hooks/use-color-scheme';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs>
      <Tabs.Screen name = "index" options={{ title: "Home"}} />
      <Tabs.Screen name = "workout" options={{ title: "workout"}} />
      <Tabs.Screen name = "trends" options={{ title: "Trends"}} />
      <Tabs.Screen name = "info" options={{ title: "Info"}} />
    </Tabs>
  );
}
