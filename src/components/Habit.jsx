import React from "react";

const Habit = ({ identification, name, desc, handleDeleteHabit }) => {
  return (
    <li key={identification}>
      {name} - {desc}
      <button onClick={() => handleDeleteHabit(identification)}>Delete</button>
    </li>
  );
};

export default Habit;
