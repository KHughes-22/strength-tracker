import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { useWorkout } from '../../contexts/WorkoutContext';
import { addExercise, fetchExercises, startWorkout } from '../../services/workoutService';
import { Exercise, WorkoutExercise } from '../../types/workout';


export default function WorkoutScreen() {
  //session is user is logged in
  const { session } = useAuth();
  //start param comes from homepage to start workout
  const {start} = useLocalSearchParams();
  const {activeWorkoutId, setActiveWorkoutId} = useWorkout();
  const [showExerciseMenu, setShowExerciseMenu] = useState(false);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<WorkoutExercise[]>([]);

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



  useEffect(() => {
    async function loadExercises() {
      const { data, error } =
        await fetchExercises();

        if (error) {
          console.log(error);
          return;
        }

        if (data) {
          setExercises(data);
        }
      }

    loadExercises();
  }, []);


    
    return (

    <View>
      {!activeWorkoutId ? (
        <Pressable style = {styles.button}
          onPress= {handleStartWorkout}>
          <Text style={styles.buttonText}>Start Workout </Text>
        </Pressable>

      ) : (

        <View style={styles.setRow}>
          <Pressable style={styles.exerciseButton}
          onPress= {() =>
            setShowExerciseMenu(!showExerciseMenu)
          }
        >
          <Text style={styles.exerciseButtonText}>+</Text>
        </Pressable>
      
        {showExerciseMenu && (
          <View style={styles.exerciseMenu}>
            {exercises.map((exercise) => (
              <Pressable key={exercise.id} style={styles.exerciseMenuItem}
                onPress={async () => {
                  if (!activeWorkoutId) return;

                  await addExercise(
                    exercise.id
                  );
                  setShowExerciseMenu(false);
                }}
              >
              <Text>{exercise.name}</Text>
              </Pressable>
            ))}
          </View>
        )}

        {selectedExercise && (
          <View>
            <Text>selected exercise selected</Text>
          </View>


        )}
        

      </View>
      )}
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

  setRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  setInputContainer: {
    flex: 1,
    backgroundColor: '#2A2A32',
    borderRadius: 14,
    padding: 12,
  },

  input: {
    color: '#FFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  inputLabel: {
    color: '#D1D5DB',
    fontSize: 12,
    marginBottom: 6,
  },

});