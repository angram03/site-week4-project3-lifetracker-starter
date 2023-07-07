import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginForm from '../LoginForm/LoginForm';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import ActivityPage from '../ActivityPage/ActivityPage';
import ExercisePage from '../ExercisePage/ExercisePage';
import NutritionPage from '../NutritionPage/NutritionPage';
import SleepPage from '../SleepPage/SleepPage';
import Home from '../Home/Home';
import Navbar from '../Navbar/Navbar';
import React, { useState, useEffect } from "react";


export default function App() {
  const [appState, setAppState] = useState({})

  
    
  return(
    <div>
      <div className="container"> 
      
      
        <BrowserRouter>
          <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/activity" element={<ActivityPage />}/>
          <Route path="/exercise" element={<ExercisePage />}/>
          <Route path="/nutrition" element={<NutritionPage />}/>
          <Route path="/sleep" element={<SleepPage />} />
          <Route path="/login" element={<LoginForm setAppState={setAppState} />} />
          <Route path="/register" element={<RegistrationForm setAppState={setAppState}/>} />
        </Routes>
        </BrowserRouter>

      </div>

    </div>
  )
}
   

  //Registration function to handle registration
  











