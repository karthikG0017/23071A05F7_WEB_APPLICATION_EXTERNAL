import { useState } from 'react';

function Login({ onLoginSuccess }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    const user = users.find(u => u.username === formData.username);
    
    if (!user) {
      setError('User not found');
      return;
    }
    
    if (user.password !== formData.password) {
      setError('Incorrect password');
      return;
    }
    
    const firstTwoLetters = user.firstName.substring(0, 2);
    
    const dateParts = user.dateOfBirth.split('-');
    const day = dateParts[2];
    const month = dateParts[1];
    const year = dateParts[0];
    const formattedDate = day + month + year;
    
    const key = firstTwoLetters + formattedDate;
    
    onLoginSuccess(key, formData.username);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      
      <form onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            value={formData.username} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <button type="submit">Login</button>
      </form>
      
      <p>
        Don't have an account? <a href="#" onClick={() => window.location.href = '/register'}>Register</a>
      </p>
    </div>
  );
}

export default Login;

