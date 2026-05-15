import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { useWorkout } from '../../contexts/WorkoutContext';
import { startWorkout } from '../../services/workoutService';
import { DEFAULT_EXERCISES } from '../../types/workout';


export default function WorkoutScreen() {
  const { session } = useAuth();
  const {start} = useLocalSearchParams();
  const {activeWorkoutId, setActiveWorkoutId} = useWorkout();
  const [showExerciseMenu, setShowExerciseMenu] = useState(false);

  async function handleStartWorkout(){
    if(!session) return;

    console.log('initiate start workout')

    const {data: workout, error} = await startWorkout(session.user.id);
    
    //if there is no workout then return
    if (!workout) return;
    //update our WorkoutContext to have an active workout
    setActiveWorkoutId(workout.id)

    console.log(workout);
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
      <View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Test Section</Text>
          <Text style={styles.cardText}>testing</Text>
        </View>

        <Pressable style={styles.exerciseButton} 
        onPress={() => setShowExerciseMenu(!showExerciseMenu)}>
          <Text style={styles.exerciseButtonText}>+</Text>
        </Pressable>
      
      
        {showExerciseMenu && (
          <View style={styles.exerciseMenu}>
            {DEFAULT_EXERCISES.map((exercise) => (
              <Pressable key={exercise.id} style={styles.exerciseMenuItem}
                onPress={() => {
                  console.log(exercise);
                  setShowExerciseMenu(false);
                }}
              >
                <Text>{exercise.name}</Text>
              </Pressable>
            ))}
          </View>
      )}
      </View>

      )
    }
    </View>
    )
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
  exerciseButton: {
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: '#111',
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
},

  exerciseButtonText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '600',
  },

  exerciseMenu: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
  },

  exerciseMenuItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});