import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";
import accessHabits from "./services/toBackend";
import HabitLaws from "./components/HabitLaws";
// import Habit from "./components/Habit";
import HabitForm from "./components/HabitForm";
import Footer from "./components/footer/Footer";

// import Quotes from "./components/Quotes";

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
    <>
      <div className="App">
        <div className="container">
          <h1 className="title">Handsome Habits</h1>

          <HabitLaws />

          <div className="habit__form_n_list">
            <HabitForm
              newHabit={newHabit}
              handleHabitChange={handleHabitChange}
              newDescription={newDescription}
              handleDescriptionChange={handleDescriptionChange}
              addHabit={addHabit}
              className="habit-form"
            />

            <div className="display-habits">
              <h1>Habits</h1>
              <div className="habits">
                <DragDropContext>
                  <Droppable droppableId="habits">
                    {(provided) => (
                      <ul {...provided.droppableProps} ref={provided.innerRef}>
                        {habits.map((habit, i) => {
                          return (
                            <Draggable
                              key={habit.id}
                              draggableId={String(habit.id)}
                              index={i}
                            >
                              {(provided) => (
                                <li
                                  className="habit"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <button
                                    onClick={() => handleDeleteHabit(habit.id)}
                                    className="delete-habit"
                                  >
                                    X
                                  </button>
                                  <p>{habit.name}</p>
                                  <p>{habit.description}</p>
                                </li>

                                // <Habit
                                //   ref={provided.innerRef}
                                //   {...provided.draggableProps}
                                //   {...provided.dragHandleProps}
                                //   identification={habit.id}
                                //   name={habit.name}
                                //   desc={habit.description}
                                //   handleDeleteHabit={handleDeleteHabit}
                                // />
                              )}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            </div>
          </div>

          {/* <div>
        <h2>Good Habits</h2>
        <ul className="good-habits"></ul>
      </div>
      <div>
        <h2>Bad Habits</h2>
        <ul className="bad-habits"></ul>
      </div> */}

          {/* <Quotes /> */}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;

// run JSON server with: npx json-server --watch db.json --port 3001
