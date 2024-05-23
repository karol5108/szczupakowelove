import {React, useState} from 'react'
import './loginForm.css'
const LoginForm = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ newEmail: '', newPassword: '', firstName: '', lastName: '' });

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
    console.log('Logowanie:', loginData);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // Tutaj możesz dodać obsługę rejestracji, np. poprzez wywołanie funkcji rejestracji
    console.log('Rejestracja:', registerData);
  };

  return (
    <div className="container">
      <h2>Zaloguj się</h2>
      <form onSubmit={handleLoginSubmit}>
        <input type="email" name="email" placeholder="EMAIL" value={loginData.username} onChange={handleLoginChange} required />
        <input type="password" name="password" placeholder="HASŁO" value={loginData.password} onChange={handleLoginChange} required />
        <input type="submit" value="Zaloguj" />
      </form>
      <div className="separator">lub</div>
      <h2>Zarejestruj się</h2>
      <form onSubmit={handleRegisterSubmit}>
        <input type="email" name="newEmail" placeholder="EMAIL" value={registerData.newUsername} onChange={handleRegisterChange} required />
        <input type="password" name="newPassword" placeholder="HASŁO" value={registerData.newPassword} onChange={handleRegisterChange} required />
        <input type="password" name="confirmPassword" placeholder="POTWIERDŹ HASŁO" value={registerData.confirmPassword} onChange={handleRegisterChange} required />
        <input type="text" name="firstName" placeholder="IMIĘ" value={registerData.firstName} onChange={handleRegisterChange} required />
        <input type="text" name="lastName" placeholder="NAZWISKO" value={registerData.lastName} onChange={handleRegisterChange} required />
        <input type="submit" value="Zarejestruj" />
      </form>
    </div>
  );
}
export default LoginForm