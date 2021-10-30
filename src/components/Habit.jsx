import React from "react";
import { v4 as uuidv4 } from "uuid";

const Habit = ({ identification, name, desc, handleDeleteHabit }) => {
  return (
    <li key={uuidv4()}>
      {name} - {desc}
      <button onClick={() => handleDeleteHabit(identification)}>Delete</button>
    </li>
  );
};

export default Habit;
