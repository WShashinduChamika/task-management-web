import { Route, Routes } from 'react-router-dom';
import { RegisterView } from '../modules/auth/views/register_view/RegisterView';
import { CheckHealthView } from '../modules/health';
import './App.css';


function App() {
   return (
     <Routes>
       <Route path="/" element={<CheckHealthView />} />
       <Route path="/register" element={<RegisterView />} />
     </Routes>
   );
}

export default App;
