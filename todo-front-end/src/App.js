import React from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Home from './Home';
import Login from './Login'
import Register from './Register';
import Mytodo from './Mytodo';

const App=()=>{
    return(
        <div>
            <BrowserRouter>
             <Routes>
                <Route path='/' exact Component={Home}/>
                <Route path='/login' exact Component={Login}/>
                <Route path='/register' exact Component={Register}/>
                <Route path='/mytodo' exact Component={Mytodo}/>
             </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;
