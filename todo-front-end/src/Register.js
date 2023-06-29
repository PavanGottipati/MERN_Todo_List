import React,{useState} from "react";
import {Link} from "react-router-dom";
import axios from 'axios';
import "./Register.css";

const Register = () => {
  const [data,setData]=useState({
    fullname:"",
    email:"",
    password:"",
    confirmpassword:""
})

const changeHandler = (e) =>{
    setData({...data,[e.target.name]:e.target.value}); 
};

const submitHandler = (e) =>{
    e.preventDefault();
    axios.post('http://localhost:5000/register',data).then(
        res => alert(res.data)
    )
    //console.log(data);
}
  return (
    <div className="register">
    <div className="registerWrapper">
      <div className="registerLeft">
        <h3 className="registerLogo">Todo List</h3>
        <span className="registerDesc">
          Dear user, Register and make your Todo
        </span>
        <img src="https://media.istockphoto.com/id/863607936/photo/to-do-list-on-note-pad-with-coffee-and-pen-on-office-desk.jpg?s=612x612&w=0&k=20&c=3ZpVRcBI9oGdPty0agkNlqzrAI3AnvjgpRdtDrjvHqI=" alt="" className="registerTodoPic"/>
      </div>
      <div className="registerRight">
        <form className="registerBox" onSubmit={submitHandler}>
        <input
            placeholder="Name"
            type="text"
            className="registerInput"
            name="fullname"
            onChange={changeHandler}
            required
          />
          <input
            placeholder="Email"
            type="email"
            className="registerInput"
            name="email"
            onChange={changeHandler}
            required
          />
          <input
            placeholder="Password"
            type="password"
            className="registerInput"
            name="password"
            onChange={changeHandler}
            required
          />
          <input
            placeholder="Confirm Password"
            type="password"
            className="registerInput"
            name="confirmpassword"
            onChange={changeHandler}
            required
          />
          <button className="registerButton" type="submit">
            Register
          </button>
          <p>Already have an account?</p>
          <Link to='/login' className="btn registerLoginButton">Login</Link>
        </form>
      </div>
    </div>
  </div>

    );
};

export default Register;
