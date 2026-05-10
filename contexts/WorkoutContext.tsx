import { createContext, ReactNode, useContext, useState } from 'react';


type WorkoutContextType = {
  activeWorkoutId: string | null;
  setActiveWorkoutId: (id: string | null) => void;
};

const WorkoutContext = createContext<WorkoutContextType | null>(null)

export function WorkoutProvider({children}: {children: ReactNode}){
    const[activeWorkoutId, setActiveWorkoutId] = useState<string | null>(null);

    return (
    <WorkoutContext.Provider value={{ activeWorkoutId, setActiveWorkoutId }}>
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  const context = useContext(WorkoutContext);

  if (context == null) {
    throw new Error(
      'useWorkout must be used inside WorkoutProvider'
    );
  }

  return context;
}

