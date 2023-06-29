import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Mytodo.css";

const Mytodo = () => {
  const [data, setData] = useState({});
  const [alltodos, setAlltodos] = useState([]);
  const [newtodo, setNewtodo] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/mytodo", {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        });
        setData(response.data);
        if (response.data && response.data.email) {
          const todoResponse = await axios.get(
            "http://localhost:5000/getalltodos",
            {
              params: {
                email: response.data.email, // Use response.data.email instead of data.email
              },
              headers: {
                "x-token": localStorage.getItem("token"),
              },
            }
          );
          setAlltodos(todoResponse.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []); // Remove data.email from the dependency array

  const addTodo = async (e) => {
    e.preventDefault();
    const responseData = await axios.get("http://localhost:5000/mytodo", {
      headers: {
        "x-token": localStorage.getItem("token"),
      },
    });
    setData(responseData.data);

    const todoData = {
      email: data.email,
      task: newtodo,
    };
    await axios.post("http://localhost:5000/addtodo", todoData); // Await the axios post request
    setNewtodo("");
    window.location.reload();
  };

  const deleteHandler = (id) => {
    axios.delete(`http://localhost:5000/delete/${id}`).then((arr) => {
      setAlltodos(arr.data);
    });
    window.location.reload();
  };

  if (!localStorage.getItem("token")) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <nav className="navbar bg-dark">
        <h1 className="text-white">
           TODO List App
        </h1>
        <ul>
          <Link
            to="/"
            className="btn btn-primary"
            onClick={() => localStorage.removeItem("token")}
          >
            Logout
          </Link>
        </ul>
      </nav>
      <div className="login">
        <div className="userDetails">
          <h3 className="mytodoLogo">Welcome to TODO List</h3>
          <h2 className="mytodoLogo">
            Dear {data.fullname}, Now you can add your todos very securely
          </h2>
        </div>
        <div className="inputDetails">
          <div className="input-container">
            <input
              type="text"
              className="input-box-todo"
              placeholder="Enter your todo"
              value={newtodo}
              onChange={(e) => {
                setNewtodo(e.target.value);
              }}
              required
            />
            <button className="add-btn" onClick={addTodo}>
              +
            </button>
          </div>
          <br />
          <div className="listOftodos">
  <ul className="list-item">
    {alltodos && alltodos.length > 0 ? (
      alltodos.map((task) => (
        <li key={task._id} className="todono">
          <div className="todo-content">
            <h2>{task.task}</h2>
            <span className="icons">
              <i
                className="fas fa-trash-alt icon-delete"
                onClick={() => deleteHandler(task._id)}
              ></i>
            </span>
          </div>
        </li>
      ))
    ) : (
      <p>No Todos added yet</p>
    )}
  </ul>
</div>

        </div>
      </div>
    </div>
  );
};

export default Mytodo;
