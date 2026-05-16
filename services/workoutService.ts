import { supabase } from '../lib/supabase';

export async function startWorkout(userId: string) {
  const { data, error } = await supabase
    .from('workouts')
    .insert({
      user_id: userId,
      duration: 0,
    })
    .select()
    .single();

  return { data, error };
}


export async function saveWorkout(userId: string){
    return [];
}

export async function addExercise(
  workoutExerciseId: string
) {
  const { data, error } = await supabase
    .from('workout_exercise')
    .insert({
      exercise_id: workoutExerciseId,
    });

  return { data, error };
}

export async function fetchExercises() {
  return await supabase
    .from('exercises')
    .select('*')
    .order('name');
}