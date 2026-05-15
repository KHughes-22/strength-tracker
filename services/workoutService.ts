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