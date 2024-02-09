
import './App.css';
import LoginForm from './Components/LoginForm/LoginForm';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterForm from './Components/RegisterForm/RegisterForm';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import MainPage from './Components/MainPage/MainPage';
import PrivateRoute from './PrivateRoute'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route exact path='/' element={<PrivateRoute/>}>
            <Route exact path='/' element={<MainPage/>}/>
          </Route>
            <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
