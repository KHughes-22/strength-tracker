// Workout intensity/type of set
export type WorkoutType = 'warmup' | 'working' | 'dropset';

// Single set
export type WorkoutSet = {
  type: WorkoutType;
  reps: number;
  weight: number;
  time: number; // seconds (optional usage)
};

// Muscle groups
export type MuscleGroup =
  | 'Chest'
  | 'Back'
  | 'Shoulders'
  | 'Biceps'
  | 'Triceps'
  | 'Quads'
  | 'Hamstrings'
  | 'Glutes'
  | 'Calves'
  | 'Core';

// Exercise definition
export type WorkoutExercise = {
  id: string;
  name: string;
  primaryMuscle: MuscleGroup;
  secondaryMuscle: MuscleGroup[];
};

// Exercise + its sets
export type ExerciseWithSets = {
  exercise: WorkoutExercise;
  sets: WorkoutSet[];
};

// Full workout session
export type WorkoutSession = {
  id: string;
  date: string;
  exercises: ExerciseWithSets[];
};
