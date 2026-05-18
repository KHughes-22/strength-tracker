// Workout intensity/type of set
export type WorkoutType = 'warmup' | 'working' | 'dropset';

export type Workout = {
  id: string;
  user_id: string;
  duration: number | null;
  created_at?: string;
  ended_at?: string | null;
};

export type Exercise = {
  id: string;
  name: string;
  primary_muscles: string[] | null;
  secondary_muscles: string[] | null;
};

export type WorkoutExercise = {
  id: string;
  workout_id: string;
  exercise_id: string;
  created_at?: string;
};

export type WorkoutSet = {
  id: string;
  workout_exercise_id: string;
  reps: number;
  weight: number;
  set_type: 'warmup' | 'working' | 'dropset';
  time_under_tension: number | null;
  created_at?: string;
};