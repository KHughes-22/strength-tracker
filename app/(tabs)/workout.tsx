import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';


export default function WorkoutScreen() {
  const { session } = useAuth();
  const {start} = useLocalSearchParams();

  async function handleStartWorkout(){

  }

  async function handleSaveWorkout() {
    if (!session) return;

    const { data, error } = await supabase
    .from('workouts')
    .insert(newWorkout);

  if (error) {
    console.log('Error:', error.message);
  } else {
    console.log('Success:', data);
    Alert.alert('successfully saved workout');
  }

  console.log(newWorkout);
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout Page</Text>
      <Text style={styles.subtitle}>This is a test screen for the workout page.</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Test Section</Text>
        <Text style={styles.cardText}>Workout content will go here.</Text>
      </View>

      <Pressable style={styles.button}
        onPress={handleSaveWorkout}>
        <Text style={styles.buttonText}>Save workout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 16,
    color: '#444',
  },
  card: {
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  cardText: {
    fontSize: 14,
    color: '#444',
  },
  button: {
    backgroundColor: '#111',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});