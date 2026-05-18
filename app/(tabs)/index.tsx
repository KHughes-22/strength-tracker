import { useWorkout } from '@/contexts/WorkoutContext';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

export default function HomeScreen() {
  const { session } = useAuth();
  const [workouts, setWorkouts] = useState<any[]>([]);
  const {activeWorkoutId} = useWorkout();

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


    <View style={styles.headerContainer}>
      <Text style={styles.title}>Strength Tracker</Text>
    
      {!activeWorkoutId  ? (
        <Pressable style={styles.primaryButton} onPress={handleStartWorkout}>
          <Text style={styles.primaryButtonText}>Start Workout</Text>
        </Pressable>
      ) : (
        <Text style={styles.cardTitle}>Active Workout In Session</Text>
      )
      }

      
      <View style={styles.container}>{workouts.map((w) => (
        <View key={w.id} style={styles.card}>
          <Text style={styles.cardTitle}>Last Workout</Text>
          <Text style= {styles.cardText}>{w.duration} mins</Text>
        </View>
      ))}

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Strength Progress</Text>
        <Text style= {styles.cardText}>Trend preview coming</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Body Weight</Text>
        <Text style= {styles.cardText}>No data yet</Text>
      </View>

      <View style={styles.container}>
        <Pressable 
        style={styles.primaryButton}
        onPress={handleLogout}>
        <Text style={styles.primaryButtonText}>Log Out</Text>
        </Pressable>
      </View>

        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  headerContainer:{
    backgroundColor: '#1E1E24',
    flex: 1,
    padding: 20,
    gap: 16,
  },

  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
  },
  primaryButton: {
    backgroundColor: '#60A5FA',
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
    width: '47%',
    aspectRatio: 1,

    padding: 16,
    borderRadius: 16,
    backgroundColor: '#2A2A32',
    marginBottom: 16,

    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  cardTitle: {
    color: '#fff',
    fontWeight: '600',
    marginBottom: 6,
  },
  cardText: {
    color: '#D1D5DB'
  },
});

// Color pallet:
// header: </FFFFF>
// background: '#2A2A32'
// cardText: '#D1D5DB'
// Buttons: '#60A5FA'