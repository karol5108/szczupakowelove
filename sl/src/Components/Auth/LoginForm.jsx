import {React, useEffect, useState} from 'react'
import './loginForm.css'
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../State/store';
import { getUser, login, register } from '../../Auth/Action';
const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ email: '', password: '', name: '', lastName: '', confirmPassword: '' });

  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt")
  const {auth} = useSelector(store=>store) 

  useEffect( () =>{
    if(jwt){
      dispatch(getUser(jwt))
    }  
  
  },[jwt, auth.jwt])

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    
    // Tutaj możesz dodać obsługę logowania, np. poprzez wywołanie funkcji logowania
    dispatch(login(loginData))
    console.log(localStorage.getItem("jwt"))
    console.log('Logowanie:', loginData);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      setError('Hasła nie są takie same');
      return;
    }
    
    // Tutaj możesz dodać obsługę rejestracji, np. poprzez wywołanie funkcji rejestracji
    dispatch(register(registerData))
    console.log('Rejestracja:', registerData);
    console.log(localStorage.getItem("jwt"))
    setError(null);
  };

  const handleFormChange = () => {
    if(isLogin === false){
      setIsLogin(true);
    }else{
      setIsLogin(false);
    }
    setError(null);
  }

  return (
    <div className="container">

      {error ?(
        <div>
        <h2 className='error'>!!! {error} !!!</h2>
        </div>
      ):(
        <div></div>
      )}

      {isLogin ? (
      <div>
      <h2>LOGOWANIE</h2>
      <form onSubmit={handleLoginSubmit}>
        <input type="email" name="email" placeholder="EMAIL" value={loginData.username} onChange={handleLoginChange} required />
        <input type="password" name="password" placeholder="HASŁO" value={loginData.password} onChange={handleLoginChange} required />
        <input type="submit" value="Zaloguj" />
      </form>
      </div>
       ) : (
      
      <div>
      <h2>REJESTRACJA</h2>
      <form onSubmit={handleRegisterSubmit}>
        <input type="email" name="email" placeholder="EMAIL" value={registerData.newUsername} onChange={handleRegisterChange} required />
        <input type="password" name="password" placeholder="HASŁO" value={registerData.password} onChange={handleRegisterChange} required />
        <input type="password" name="confirmPassword" placeholder="POTWIERDŹ HASŁO" value={registerData.confirmPassword} onChange={handleRegisterChange} required />
        <input type="text" name="name" placeholder="IMIĘ" value={registerData.firstName} onChange={handleRegisterChange} required />
        <input type="text" name="lastName" placeholder="NAZWISKO" value={registerData.lastName} onChange={handleRegisterChange} required />
        <input type="submit" value="Zarejestruj" />
      </form>
      </div>
      )}
      <div className="separator">lub</div>
      <div className="toggle-buttons">

      {!isLogin ? (
      <button className='toggle-button' onClick={handleFormChange}>Zaloguj się</button>
        ) : (
      <button className='toggle-button' onClick={handleFormChange}>Zarejestruj się</button>
      )}
      </div>
    </div>
    
  );
}
export default LoginForm