import NewPost from './Components/NewPost'
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";


import { AllFiles } from './Components/AllFiles'

import DashHeader from './Components/DashHeader/DashHeader'
import HomePage from './Components/NavBar/Navbar'
// import HomePage from './Components/HomePage/HomePage';

import LoginForm from "./Components/LoginPage/LoginForm/LoginForm"
import LoginPage from './Components/LoginPage/LoginPage'
import SignUpForm from './Components/SignUp/SignUpForm/SignUpForm'
import SignUpPage from './Components/SignUp/SignUpPage'
import FileViewer from './Components/FileList/FileViewer'
import SharedFilePage from './Components/NavBar/SharedNavbar'


import './App.css'

function App() {


  const isAuth=Boolean(useSelector((state)=>state.token));
  return (
    <>

      <BrowserRouter>
      <Routes>

        <Route path='/' element={isAuth?<HomePage/>:<LoginPage/>}/>
        <Route path='/signup' element={isAuth?<HomePage/>:<SignUpPage/>}/>
        <Route path='/file/:encfileUrl/:encfileType' element={<FileViewer/>} />
        <Route path='/sharedfiles' element={<SharedFilePage/>}/>
      </Routes>
     
      </BrowserRouter>
   
   
      {/* <NewPost/>
      <AllFiles/> */}
    </>
  )
}

export default App
