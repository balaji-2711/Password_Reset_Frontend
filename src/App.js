import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Login from './components/Login';
import Menu from './components/Menu';
import SignUp from './components/SignUp';
import ForgetPassword from './components/ForgetPassword';
import ResetPassword from './components/ResetPassword';
import 'bootstrap/dist/css/bootstrap.min.css';

//backend url
// export const url = "https://password-reset-1ikr.onrender.com"
export const url ="https://password-reset-backend-frya.onrender.com";


function App() {
  return <>
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/forgetPassword' element={<ForgetPassword />} />
        <Route path='/reset-password/:id/:token' element={<ResetPassword />} />

        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
    </BrowserRouter>
  </>
}

export default App;