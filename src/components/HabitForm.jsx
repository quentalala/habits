import React from "react";
import "./HabitForm.css";

const HabitForm = ({
  newHabit,
  handleHabitChange,
  newDescription,
  handleDescriptionChange,
  addHabit,
}) => {
  return (
    <div className="add-habit-container">
      <form className="form-contents">
        <h2>What Habit are we looking at?</h2>
        <div className="add-habit">
          <h4>Add Habit</h4>
          <input
            value={newHabit}
            onChange={handleHabitChange}
            placeholder="Habit goes here"
            className="habit-name"
          />
          <h4>Add Description</h4>
          <input
            value={newDescription}
            onChange={handleDescriptionChange}
            placeholder="Please Elaborate! :)"
            className="habit-desc"
          />
        </div>

        <button onClick={addHabit}>Expose Habit</button>
      </form>
    </div>
  );
};

export default HabitForm;
