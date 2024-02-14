import './App.css';
import LoginForm from './Pages/LoginForm/LoginForm';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterForm from './Pages/RegisterForm/RegisterForm';
import ErrorPage from './Pages/ErrorPage/ErrorPage';
import MainPage from './Pages/MainPage/MainPage';
import PrivateRoute from './PrivateRoute'
import InstructorProfile from './Pages/InstructorProfile/InstructorProfile'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route exact path='/' element={<PrivateRoute/>}>
            <Route exact path='/' element={<MainPage/>}/>
            <Route exact path='/instructor/:id' element={<InstructorProfile/>}/>
          </Route>
            <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
