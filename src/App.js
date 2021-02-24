

import React,{useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import './css/index.css';
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import {auth} from "./firebase";

import {login, logout, selectUser} from "./features/userSlice";

function App() {
  
  const user = useSelector(selectUser);
 
  const dispatch = useDispatch();
  useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(userAuth => {
    if(userAuth){
      dispatch(login({
        uid: userAuth.uid,
        email : userAuth.email,
      }));
    } else {
      dispatch(logout());
    } 
  });

  return unsubscribe;
  
}, [dispatch])


  return (
    <div className="App">
    
      
        <Router>
        {!user ?  <LoginScreen/> :  <Switch>
          <Route path="/profile">
            <ProfileScreen/>
            </Route>
            <Route exact path="/">
            <HomeScreen />
            </Route>
          </Switch>}
    </Router>
    </div>
  );
}

export default App;
