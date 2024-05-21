//@ts-ignore
import React, { createContext, useState } from "react";

const FitnessItems = createContext({       completed:false,
  setCompleted:10,
  workout:10,
  setWorkout:10,
  calories:10,
  setCalories:10,
  minutes:10,
  setMinutes:10,});

const FitnessContext = ({ children }) => {
  const [completed, setCompleted] = useState([]);
  const [workout, setWorkout] = useState(0);
  const [calories, setCalories] = useState(0);
  const [minutes, setMinutes] = useState(0);
  return (
    <FitnessItems.Provider
      value={{
        completed,
        setCompleted,
        workout,
        setWorkout,
        calories,
        setCalories,
        minutes,
        setMinutes,
      }}
    >
      {children}
    </FitnessItems.Provider>
  );
};

export { FitnessContext, FitnessItems }