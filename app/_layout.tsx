import { Stack } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { WorkoutProvider } from '../contexts/WorkoutContext';

function RootNavigator() {
  const {loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
  <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name="(tabs)" />
    <Stack.Screen name="sign-in" />
    <Stack.Screen name="sign-up" />
  </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <WorkoutProvider>
        <RootNavigator />
      </WorkoutProvider>
    </AuthProvider>
  );
}