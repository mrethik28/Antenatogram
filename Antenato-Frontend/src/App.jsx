import { Route, Routes } from 'react-router-dom';
import ForgotPassword from './pages/forgotPassword';
import Register from './pages/register';
import LandingPage from './pages/landingPage';
import Login from './pages/login';
import Layout from './pages/layout'
import Dashboard from './pages/dashboard'
import RequireAuth from './pages/requireAuth';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
      
        <Route path='/' element = { <LandingPage/> }/>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />

        <Route element={<RequireAuth allowedRole={"patient"} />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>

      </Route>
    </Routes>
  );
}

export default App
