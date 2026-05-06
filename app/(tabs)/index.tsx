import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

export default function HomeScreen() {
  const { session } = useAuth();
  const [workouts, setWorkouts] = useState<any[]>([]);

  useEffect(() => {
    if (session) {
      fetchWorkouts();
    }
  }, [session]);

  async function fetchWorkouts() {
    if (!session) return;

    const { data, error } = await supabase
      .from('workouts')
      .select('*')
      .order('date', { ascending: false })
      .limit(1);

    if (error) {
      console.log(error.message);
    } else {
      setWorkouts(data);
    }
  }

  async function handleStartWorkout() {
    if (!session) return;

    router.push({
      pathname: '/workout',
      params: {start: 'true'},
    });
  }

  async function handleLogout() {
    await supabase.auth.signOut();
  }
    console.log(workouts);
  
    return (
    <View style={styles.container}>
      <Text style={styles.title}>Strength Tracker</Text>

    <Pressable 
      style={styles.primaryButton}
      onPress={handleStartWorkout}
    >
      <Text style={styles.primaryButtonText}>Start Workout</Text>
    </Pressable>

      {workouts.map((w) => (
        <View key={w.id} style={styles.card}>
          <Text style={styles.cardTitle}>Last Workout</Text>
          <Text>{w.duration} mins</Text>
        </View>
      ))}

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Strength Progress</Text>
        <Text>Trend preview coming</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Body Weight</Text>
        <Text>No data yet</Text>
      </View>

      <Pressable 
      style={styles.primaryButton}
      onPress={handleLogout}>
      <Text style={styles.primaryButtonText}>Log Out</Text>
      </Pressable>

      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  primaryButton: {
    backgroundColor: '#111',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cardTitle: {
    fontWeight: '600',
    marginBottom: 6,
  },
});