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
import NotFound from "../NotFound/NotFound";
import NutritionDetail from '../NutritionDetail/NutritionDetail';
import React, { useState, useEffect } from "react";
import axios from 'axios';


export default function App() {
  const [appState, setAppState] = useState({})
  //new one Sunday
  const [user, setUser] = useState({})
  const [nutrition, setNutrition] = useState([])
  const [error, setError] = useState(null)
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    const fetchNutrition = async () => {
      setIsFetching(true)

      try {
        const res = await axios.get("http://localhost:3001/nutrition")
        if (res?.data?.nutrition) {
          setError(null)
          setNutrition(res.data.nutrition)
        }
      } catch (err) {
        console.log(err)
        const message = err?.response?.data?.error?.message
        setError(message ?? String(err))
      } finally {
        setIsFetching(false)
      }
    }

    fetchNutrition()
  }, [])

  const addNutrition = (newNutrition) => {
    setNutrition((oldNutrition) => [newNutrition, ...oldNutrition])
  }

  const updateNutrition = ({ nutritionId, nutritionUpdate }) => {
    setNutrition((oldNutrition) => {
      return oldNutrition.map((nutrition) => {
        if (nutrition.id === Number(nutritionId)) {
          return { ...nutrition, ...nutritionUpdate }
        }

        return nutrition
      })
    })
  }



console.log("app", appState)
    
  return(
    <div>
      <div className="container"> 
      
      
        <BrowserRouter>
          <Navbar />
        <Routes>
          <Route path="/" element={<Home user={user} error={error} nutrition={nutrition} addNutrition={addNutrition} isFetching={isFetching}/>}/>
          <Route path="/activity" element={<ActivityPage />}/>
          <Route path="/exercise" element={<ExercisePage />}/>
          <Route path="/nutrition" element={<NutritionPage appState={appState} user={user} nutrition={nutrition}/>}/>
          <Route path="/sleep" element={<SleepPage />} />
          <Route path="/login" element={<LoginForm setAppState={setAppState} />} />
          <Route path="/nutrition/:nutritionId" element={<NutritionDetail user={user} updateNutrition={updateNutrition}/>} />
          <Route path="/register" element={<RegistrationForm setAppState={setAppState}/>} />
          <Route path="*" element={<NotFound user={user} error={error} />} />
        </Routes>
        </BrowserRouter>

      </div>

    </div>
  )
}
   

  //Registration function to handle registration
  











