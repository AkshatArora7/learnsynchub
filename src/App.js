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
import CheckoutPage from "./Pages/CheckoutPage/CheckoutPage";
import { useAuth } from "./auth";

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/instructor/:id" element={<InstructorProfile />} />
            <Route path="/profile/:id" element={<AccountsPage />} />
            <Route path="/create" element={<CreateCourse />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/coursesEnrolled" element={<CoursesEnrolledPage />} />
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
