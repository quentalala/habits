import React from "react";
import { v4 as uuidv4 } from "uuid";
import "./Habit.css";

const Habit = ({ identification, name, desc, handleDeleteHabit }) => {
  return (
    <li key={uuidv4()} className="habit">
      <button
        onClick={() => handleDeleteHabit(identification)}
        className="delete-habit"
      >
        X
      </button>
      <p>{name}</p>
      <p>{desc}</p>
    </li>
  );
};

export default Habit;
