import React,{useState} from "react";
import axios from 'axios';
import { Navigate,Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Login.css";


const Login = () => {
  const[auth,setAuth]=useState(false);
  const[data,setData]=useState({
    email:"",
    password:"",
  })
  const changeHandler=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  const submitHandler= e =>{
    e.preventDefault();
    axios.post('http://localhost:5000/login',data).then(
      res => {localStorage.setItem('token',res.data.token);setAuth(true)}
    )
  }
  if(auth){
    return <Navigate to='/mytodo'/>
  }
  return (
    <div className="login">
    <div className="loginWrapper">
      <div className="loginLeft">
        <h3 className="loginLogo">Todo List</h3>
        <span className="loginDesc">
          Dear user, Login and make your Todo
        </span>
        <img src="https://media.istockphoto.com/id/520884242/photo/home-finance.jpg?s=1024x1024&w=is&k=20&c=gKGjcGXUZuvnPCF-Fr9hluiTCtzelQdnm4tZxETS5Lo=" alt="" className="loginTodoPic"/>
      </div>
      <div className="loginRight">
        <form className="loginBox" onSubmit={submitHandler} autoComplete="off">
          <input
            placeholder="Email"
            type="email"
            className="loginInput"
            name="email"
            onChange={changeHandler}
            required
          />
          <input
            placeholder="Password"
            type="password"
            className="loginInput"
            name="password"
            onChange={changeHandler}
            required
          />
          <button  type="submit" className="loginButton">
            Login
          </button>
          <p>Don't have an account?</p>
          <Link to='/register' className="btn loginRegisterButton">Register</Link>
        </form>
      </div>
    </div>
  </div>
  );
};

export default Login;
