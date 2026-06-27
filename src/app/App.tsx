import { Route, Routes } from 'react-router-dom';
import { RegisterView } from '../modules/auth/views/register_view/RegisterView';
import { LoginView } from '../modules/auth/views/login_view/LoginView';
import { CheckHealthView } from '../modules/health';
import './App.css';


function App() {
   return (
     <Routes>
       <Route path="/" element={<LoginView />} />
       <Route path="/register" element={<RegisterView />} />
       <Route path="/health" element={<CheckHealthView />} />
     </Routes>
   );
}

export default App;
