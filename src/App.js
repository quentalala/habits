import { useState, useEffect } from "react";
import "./App.css";
import accessHabits from "./services/toBackend";

function App() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    // console.log("effect");
    accessHabits.getAll().then((initialHabits) => {
      // console.log("promise fulfilled");
      setHabits(initialHabits);
    });
  }, []);

  const addHabit = (e) => {
    e.preventDefault();
    const habitObject = {
      name: newHabit,
      description: newDescription,
    };

    accessHabits.create(habitObject).then((returnedHabit) => {
      setHabits(habits.concat(returnedHabit));
      setNewHabit("");
      setNewDescription("");
    });
    console.log(habits);
  };

  const handleHabitChange = (e) => {
    setNewHabit(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setNewDescription(e.target.value);
  };

  const handleDeleteHabit = (id) => {
    if (
      window.confirm(
        `Delete ${habits.filter((habit) => habit.id === id)[0].name}?`
      )
    ) {
      accessHabits.deleteEntry(id);
      setHabits(habits.filter((habit) => habit.id !== id));
    }
  };

  const displayHabits = habits.map((habit) => {
    return (
      <li key={habit.id}>
        {habit.name} - {habit.description}
        <button onClick={() => handleDeleteHabit(habit.id)}>Delete</button>
      </li>
    );
  });

  return (
    <div className="container">
      <h1 className="title">Handsome Habits</h1>

      <div className="habit-laws">
        <h2>4 Laws from Atomic Habits - James Clear</h2>
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
          placeholder="Add Habit"
        />
        <input
          value={newDescription}
          onChange={handleDescriptionChange}
          placeholder="Please Elaborate"
        />
        <button onClick={addHabit}>Expose Habit</button>
      </form>

      <h2>Habits</h2>
      <ul>{displayHabits}</ul>

      <div>
        <h2>Inspiring Quotes</h2>
        <p>
          "The way you live your days is the way you live your life" - Annie
          Dillard
        </p>
        <p>
          "We have two lives, and the second one begins when we realize we only
          have one" - Confucius
        </p>
      </div>
    </div>
  );
}

export default App;

// run JSON server with the command below
// npx json-server --watch db.json --port 3001
