import { Route, Routes, Navigate } from "react-router-dom";
import { RegisterView } from "../modules/auth/views/register_view/RegisterView";
import { LoginView } from "../modules/auth/views/login_view/LoginView";
import { CheckHealthView } from "../modules/health";
import "./App.css";
import { DashboardLayout } from "../shared/ui/layouts/DashBoardLayout";
import { TasksView } from "../modules/task/views/task_view/TasksView";
import { ProfileView } from "../modules/task/views/profile_view/ProfileView";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginView />} />
      <Route path="/register" element={<RegisterView />} />
      <Route path="/health" element={<CheckHealthView />} />

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Navigate to="/tasks" replace />} />
        <Route path="tasks" element={<TasksView />} />
        <Route path="profile" element={<ProfileView />} />
      </Route>
    </Routes>
  );
}

export default App;
