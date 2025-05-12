
import React, { useEffect, useState, useContext} from "react";
import {BrowserRouter, data} from 'react-router-dom'
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { Context } from ".";
import { Spinner } from "react-bootstrap";
import axios from "axios";


const check = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
        console.warn("Токен отсутствует");
        return null;
    }

    const response = await axios.get("http://localhost:5000/api/user/auth", {
        headers: { Authorization: `Bearer ${token}` }
    });

    console.log("Ответ сервера:", response.data);
    return response.data;
} catch (error) {
    console.error("Ошибка проверки авторизации:", error.response?.data || error.message);
    return null;
}
};


const App = observer(() => {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
      check().then(data => {
        user.setUser(data)
        user.setIsAuth(true)
      }).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <Spinner animation="grow"/>
  }

  return (
    <BrowserRouter>
          <NavBar />
          <AppRouter />
    </BrowserRouter>
  );
})

export default App;
