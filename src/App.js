import './App.css';
import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import Home from './Routes/Home';
import Login from './Components/Login';
import TodoList from './Routes/TodoList';
import Add from './Routes/Add';
import Notfound from './Routes/Notfound';
import ProtectedRoutes from './Components/ProtectedRoutes';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element ={<Home />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/login" element ={<Login />} />
              <Route path="/list" element ={<TodoList />} />
              <Route path="/add" element ={<Add />} />
              <Route path="*" element ={<Notfound />} />
            </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
