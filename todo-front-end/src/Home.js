import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
//import todoOne from './todoOne.png'
const Home=()=>{
    return(
    <div>
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/register" className="navbar-link">Register</Link>
        </li>
        <li className="navbar-item">
          <Link to="/login" className="navbar-link">Login</Link>
        </li>
      </ul>
    </nav>
    <div className="home">
    <div className="homeWrapper">
      <div className="homeLeft">
        <h3 className="homeLogo">Todo List App</h3>
        <img src="https://media.istockphoto.com/id/513546190/photo/female-has-coffee-break-and-writing-notes-in-diary.jpg?s=612x612&w=0&k=20&c=4mWgq1ZdSQnxG506WBZH5Q-EQOoBrIUcoZU62oLQQeQ=" alt="" className="homeTodoPic"/>
      </div>
      <div className="homeRight">
        <div className="homeBox">
                <p className="homeText"><b>A good leader should have</b></p>
            <div>
            <ul>
                <li>Personal Task Management</li>
                <li>Project Management</li>
                <li>Goal Tracking</li>
                <li>Collaborative Task Management</li>
                <li>Time Management</li>
                <li>Daily Planning</li>
            </ul>
            </div>
            <div>
                <br/>
            <p><i><b>The joy of crossing off a task from your todo list is a reminder of your progress and achievement.</b></i></p>
            <div>
                <ul>
                    <Link to="/register" className="btn btn-primary">Register</Link>
                    <Link to="/login" className="btn btn-success btn-block login-btn mx-2">Login</Link>
                </ul>
            </div>
        </div>
        </div>
      </div>
    </div>
  </div>

    </div>
    )
}

export default Home;