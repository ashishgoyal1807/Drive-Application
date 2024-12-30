import LoginForm from './LoginForm/LoginForm';
import Navbar from '../NavBar/NavBarAlt';
import './LoginPage.css'

export default function LoginPage()
{
    return(
        <div className="LoginPageContainer">
          <Navbar/>
          <div className="formContainer">
             <LoginForm/>
          </div>
        </div>
     )
}