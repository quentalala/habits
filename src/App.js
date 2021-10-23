import { useState } from "react";
import "./App.css";

function App() {
  const [habits, setHabits] = useState([
    {
      name: "Washing Dishes",
      description: "Right after you're done eating",
      id: 1,
    },
    {
      name: "Morning Stretch",
      description: "When you wake up",
      id: 2,
    },
    {
      name: "Avoid browsing on phone",
      description:
        "After you close the morning alarm, or when being productive",
      id: 3,
    },
  ]);

  const [newHabit, setNewHabit] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const addHabit = (e) => {
    e.preventDefault();
    const habitObject = {
      name: newHabit,
      description: newDescription,
      id: habits.length + 1,
    };

    setHabits(habits.concat(habitObject));
    setNewHabit("");
    setNewDescription("");
  };

  const handleHabitChange = (e) => {
    // console.log(e.target.value);
    setNewHabit(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    // console.log(e.target.value);
    setNewDescription(e.target.value);
  };

  const displayHabits = habits.map((habit) => {
    return (
      <li key={habit.id}>
        {habit.name} - {habit.description}
      </li>
    );
  });

  return (
    <div className="container">
      <h1>Handsome Habits</h1>

      <div>
        <h2>4 Laws from Atomic Habits (by James Clear)</h2>
        <ol>
          <li>Make it Obvious</li>
          <li>Make it Attractive</li>
          <li>Make it Easy</li>
          <li>Make it Satisfying</li>
        </ol>
      </div>

      <form>
        <h2>Add habit</h2>
        <input
          value={newHabit}
          onChange={handleHabitChange}
          placeholder="Input Habit"
        />
        <input
          value={newDescription}
          onChange={handleDescriptionChange}
          placeholder="Please Describe"
        />
        <button onClick={addHabit}>Expose Habit</button>
      </form>

      <h2>Habits</h2>
      <ul>{displayHabits}</ul>

      {/* <div>
        <h2>Inspiring Quotes</h2>
        <p>
          "The way you live your days is the way you live your life" - Annie
          Dillard
        </p>
        <p>
          "We have two lives, and the second one begins when we realize we only
          have one" - Confucius
        </p>
      </div> */}
    </div>
  );
}

export default App;
