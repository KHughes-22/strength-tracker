import { useColorScheme } from '@/hooks/use-color-scheme';
import { Redirect, Tabs } from 'expo-router';
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';


export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { session, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!session) {
    return <Redirect href="../sign-in" />;
  }
  return (
    <Tabs>
      <Tabs.Screen name = "index" options={{ title: "Home"}} />
      <Tabs.Screen name = "workout" options={{ title: "workout"}} />
      <Tabs.Screen name = "trends" options={{ title: "Trends"}} />
      <Tabs.Screen name = "info" options={{ title: "Info"}} />
    </Tabs>
  );
}
