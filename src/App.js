import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";
// import accessHabits from "./services/toBackend";
import HabitLaws from "./components/HabitLaws";
// import Habit from "./components/Habit";
import HabitForm from "./components/HabitForm";
import Footer from "./components/footer/Footer";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [habits, setHabits] = useState([
    {
      name: "Test1",
      description: "Testing",
      id: uuidv4(),
    },
    {
      name: "Test2",
      description: "Testing",
      id: uuidv4(),
    },
    {
      name: "Test3",
      description: "Testing",
      id: uuidv4(),
    },
    {
      name: "Test4",
      description: "Testing",
      id: uuidv4(),
    },
    {
      name: "Test5",
      description: "Testing",
      id: uuidv4(),
    },
    {
      name: "Test6",
      description:
        "TESTING TESTING TESTING TESTING TESTING TESTING TESTING TESTING TESTING TESTING",
      id: uuidv4(),
    },
  ]);
  const [newHabit, setNewHabit] = useState("");
  const [newDescription, setNewDescription] = useState("");
  // const [goodHabits, setGoodHabits] = useState([]);
  // const [badHabits, setBadHabits] = useState([]);

  const addHabit = (e) => {
    e.preventDefault();
    const habitObject = {
      name: newHabit,
      description: newDescription,
      id: uuidv4(),
    };

    setHabits([...habits].concat(habitObject));
    setNewHabit("");
    setNewDescription("");
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
      setHabits(habits.filter((habit) => habit.id !== id));
    }
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const habitsList = Array.from(habits);
    const [reorderedHabit] = habitsList.splice(result.source.index, 1);
    habitsList.splice(result.destination.index, 0, reorderedHabit);

    setHabits(habitsList);
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
                <DragDropContext onDragEnd={handleOnDragEnd}>
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
                                  key={habit.id}
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

          {/* <div className="organize-habits">
            <div className="org-habits">
              <h2>Good Habits</h2>
              <ul className="good-habits">
                {goodHabits.map((goodHabit) => {
                  return <li key={goodHabit.id}>{goodHabit.name}</li>;
                })}
              </ul>
            </div>
            <div className="org-habits">
              <h2>Bad Habits</h2>
              <ul className="bad-habits">
                {badHabits.map((badHabit) => {
                  return <li key={badHabit.id}>{badHabit.name}</li>;
                })}
              </ul>
            </div>
          </div> */}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;

// run JSON server with: npx json-server --watch db.json --port 3001

// Planning to remove JSON-server and simply store data in this component
// Figure out how to store data into local storage!
