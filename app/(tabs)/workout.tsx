import { useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { useWorkout } from '../../contexts/WorkoutContext';
import { supabase } from '../../lib/supabase';


export default function WorkoutScreen() {
  const { session } = useAuth();
  const {start} = useLocalSearchParams();
  const {activeWorkoutId, setActiveWorkoutId} = useWorkout();

  async function handleStartWorkout(){
    if(!session) return;

    
    const { data: workout, error: workoutError } = await supabase
      .from('workouts')
      .insert({
      user_id: session.user.id,
      duration: 0,
      })
    .select()
    .single();

    if (workoutError) {
      console.log('Error starting workout:', workoutError.message);
      Alert.alert('Error starting workout');
      return;
    }

    //if there is no workout then return
    if (!workout) return;
    //update our WorkoutContext to have an active workout
    setActiveWorkoutId(workout.id)

    console.log(workout);
  }

  async function handleSaveWorkout() {
    if (!session) return;
  }

  //handles the render if we start our workout from the homepage
  useEffect(() => {
    console.log('START PARAM:', start);

    if (start === 'true' && !activeWorkoutId) {
      console.log('Workout started from Homepage');
      handleStartWorkout();
    }
    }, [start]);
    
    return (

    <View>
      {!activeWorkoutId ? (
        <Pressable style = {styles.button}
        onPress= {handleStartWorkout}>
      <Text style={styles.buttonText}>Start Workout </Text>
      </Pressable>
      ) : (

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Test Section</Text>
        <Text style={styles.cardText}>Workout content will go here.</Text>
      </View>
      )}
      </View>
    );
  }

    // </View>
    // <View style={styles.container}>
    //   <Text style={styles.title}>Workout Page</Text>
    //   <Text style={styles.subtitle}>This is a test screen for the workout page.</Text>

{/*       
      {/* <Pressable style = {styles.button}
        onPress= {handleStartWorkout}>
      <Text style={styles.buttonText}>Start Workout </Text>
      </Pressable> */}
{/* 
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Test Section</Text>
        <Text style={styles.cardText}>Workout content will go here.</Text>
      </View> */}

  //     <Pressable style={styles.button}
  //       onPress={handleSaveWorkout}>
  //       <Text style={styles.buttonText}>Save workout</Text>
  //     </Pressable>
  //   </View>
  // ); 


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