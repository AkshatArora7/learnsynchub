import "./App.css";
import LoginForm from "./Pages/LoginForm/LoginForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterForm from "./Pages/RegisterForm/RegisterForm";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import MainPage from "./Pages/MainPage/MainPage";
import PrivateRoute from "./PrivateRoute";
import InstructorProfile from "./Pages/InstructorProfile/InstructorProfile";
import AccountsPage from "./Pages/Profile/AccountsPage";
import CreateCourse from "./Pages/CreateCourse/CreateCourse";
import CoursePage from "./Pages/CoursePage/CoursePage";
import ChatPage from "./Pages/ChatPage/ChatPage";
import VideoPage from "./Pages/VideoPage/VideoPage";
import CoursesEnrolledPage from "./Pages/CoursesEnrolledPage/CoursesEnrolledPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/" element={<MainPage />} />
            <Route
              exact
              path="/instructor/:id"
              element={<InstructorProfile />}
            />
            <Route exact path="/profile/:id" element={<AccountsPage />} />
            <Route exact path="/create" element={<CreateCourse />} />
            <Route exact path="/chat" element={<ChatPage />} />
            <Route exact path="/coursesEnrolled" element={<CoursesEnrolledPage />} />
            <Route path="/course/:id/*" element={<CoursePage />} />
            <Route
              path="/course/:courseId/video/:videoId"
              element={<VideoPage />}
            />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
