import { useState, useEffect } from "react";
import "./App.css";
import accessHabits from "./services/toBackend";
import Habit from "./components/Habit";

function App() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    accessHabits.getAll().then((initialHabits) => {
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

      <h2>Habits</h2>
      <ul>
        {habits.map((habit) => {
          return (
            <Habit
              key={habit.id}
              identification={habit.id}
              name={habit.name}
              desc={habit.description}
              handleDeleteHabit={handleDeleteHabit}
            />
          );
        })}
      </ul>

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

// run JSON server with: npx json-server --watch db.json --port 3001
