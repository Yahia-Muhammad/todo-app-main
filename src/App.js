import "./App.css";
import { useContext, useState } from "react";
import themeContext from "./config/Theme";

function App() {
  const { theme, changeTheme } = useContext(themeContext);
  const [listTodo, setListTodo] = useState(localStorage.getItem("list-todo") != null ? JSON.parse(localStorage.getItem("list-todo")) : []);
  const [stateNewTodo, setStateNewTodo] = useState(false);
  const [valInput, setValInput] = useState("");
  const [filter, setFilter] = useState("all");

  const handle = () => {
    const add = [...listTodo, { id: listTodo.length + 1, task: valInput, state: stateNewTodo }];
    setListTodo(add);
    setValInput("");
    setLocalStorage(add);
  };

  const deleteTodo = (num) => {
    const setTodo = listTodo.filter((el) => el.id !== num);
    setListTodo(setTodo);
    setLocalStorage(setTodo);
  };

  const handleCheckBox = (id) => {
    const index = id - 1;
    const newList = [...listTodo];
    newList[index].state = !newList[index].state;
    setListTodo(newList);
    setLocalStorage(listTodo);
  };

  const handleFilter = (sf) => {
    setFilter(sf);
  };

  const clearTodo = () => {
    setListTodo([]);
    setLocalStorage([]);
  };

  const setLocalStorage = (listTodo) => {
    localStorage.setItem("list-todo", JSON.stringify(listTodo));
  }

  return (
    <div className={theme}>
      <div className="home">
        <div></div>
        <div>
          <section className="header">
            <h1>TODO</h1>
            <span className="icon-moon-fill pointer" onClick={() => {changeTheme()}}></span>
          </section>

          <section className="todo">
            <form action="">
              <div className="input">
                <input type="checkbox" onClick={(el) => {
                    setStateNewTodo(el.nativeEvent.srcElement.checked);
                  }}
                />
                <input type="text" placeholder="Create a new todo..." value={valInput} onChange={(e) => {
                    setValInput(e.target.value);
                  }}
                />
              </div>
              <input type="submit" style={{ display: "none" }} onClick={(e) => {
                  e.preventDefault();
                  handle();
                }}
              />
            </form>

            {filter === "all" && (
              <ul className="list">
                {listTodo.map((val, ind) => {
                  return (
                    <li key={ind}>
                      <input
                        type="checkbox"
                        defaultChecked={val.state}
                        onClick={() => {
                          handleCheckBox(val.id);
                        }}
                      />
                      {val.state === true ? (
                        <h4 className="stateDone color-gray">{val.task}</h4>
                      ) : (
                        <h4>{val.task}</h4>
                      )}
                      <span
                        className="icon-cross color-gray pointer"
                        onClick={() => {
                          deleteTodo(val.id);
                        }}
                      ></span>
                    </li>
                  );
                })}

                <li>
                  <h5 className="color-gray">{listTodo.length} items left</h5>
                  <h5 className="color-gray pointer" onClick={clearTodo}>
                    Clear Completed
                  </h5>
                </li>
              </ul>
            )}
            {filter === "active" && (
              <ul className="list">
                {listTodo
                  .filter((el) => el.state === false)
                  .map((val, ind) => {
                    return (
                      <li key={ind}>
                        <input
                          type="checkbox"
                          defaultChecked={val.state}
                          onClick={() => {
                            handleCheckBox(val.id);
                          }}
                        />
                        {val.state === true ? (
                          <h4 className="stateDone color-gray">{val.task}</h4>
                        ) : (
                          <h4>{val.task}</h4>
                        )}
                        <span
                          className="icon-cross color-gray pointer"
                          onClick={() => {
                            deleteTodo(val.id);
                          }}
                        ></span>
                      </li>
                    );
                  })}

                <li>
                  <h5 className="color-gray">{listTodo.length} items left</h5>
                  <h5 className="color-gray pointer" onClick={clearTodo}>
                    Clear Completed
                  </h5>
                </li>
              </ul>
            )}
            {filter === "completed" && (
              <ul className="list">
                {listTodo
                  .filter((el) => el.state === true)
                  .map((val, ind) => {
                    return (
                      <li key={ind}>
                        <input
                          type="checkbox"
                          defaultChecked={val.state}
                          onClick={() => {
                            handleCheckBox(val.id);
                          }}
                        />
                        {val.state === true ? (
                          <h4 className="stateDone color-gray">{val.task}</h4>
                        ) : (
                          <h4>{val.task}</h4>
                        )}
                        <span
                          className="icon-cross color-gray pointer"
                          onClick={() => {
                            deleteTodo(val.id);
                          }}
                        ></span>
                      </li>
                    );
                  })}

                <li>
                  <h5 className="color-gray">{listTodo.length} items left</h5>
                  <h5 className="color-gray pointer" onClick={clearTodo}>
                    Clear Completed
                  </h5>
                </li>
              </ul>
            )}

            <ul className="filter">
              <li>
                <h3 className="color-gray active pointer" onClick={() => {handleFilter("all")}}>
                  All
                </h3>
              </li>
              <li>
                <h3 className="color-gray pointer" onClick={() => {handleFilter("active")}}>
                  Active
                </h3>
              </li>
              <li>
                <h3 className="color-gray pointer" onClick={() => {handleFilter("completed")}}>
                  Completed
                </h3>
              </li>
            </ul>
          </section>

          <section className="navbar">
            <h4>Drag and drop to reorder list</h4>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
