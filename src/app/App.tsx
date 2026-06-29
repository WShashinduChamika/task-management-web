import { Route, Routes, Navigate } from "react-router-dom";
import { RegisterView } from "../modules/auth/views/register_view/RegisterView";
import { LoginView } from "../modules/auth/views/login_view/LoginView";
import { CheckHealthView } from "../modules/health";
import "./App.css";
import { DashboardLayout } from "../shared/ui/layouts/DashBoardLayout";
import { TaskListView } from "@/modules/task/views";
import { AuthGuard } from "@/shared/guards/AuthGard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginView />} />
      <Route path="/register" element={<RegisterView />} />
      <Route path="/health" element={<CheckHealthView />} />

      <Route element={<AuthGuard />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/tasks" replace />} />
          <Route path="tasks" element={<TaskListView />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
