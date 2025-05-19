import { useState } from 'react'
import './App.css'
import Register from './components/Register'
import Login from './components/Login'
import KeyDisplay from './components/KeyDisplay'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [userKey, setUserKey] = useState('')
  const [username, setUsername] = useState('')

  const handleLoginSuccess = (key, user) => {
    setUserKey(key);
    setUsername(user);
    setCurrentPage('keyDisplay');
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'register':
        return <Register />
      case 'login':
        return <Login onLoginSuccess={handleLoginSuccess} />
      case 'keyDisplay':
        return <KeyDisplay userKey={userKey} username={username} />
      default:
        return (
          <div className="home-container">
          </div>
        )
    }
  }

  return (
    <div className="app-container">
      <nav className="app-nav">
        <button onClick={() => setCurrentPage('home')}>Home</button>
        <button onClick={() => setCurrentPage('register')}>Register</button>
        <button onClick={() => setCurrentPage('login')}>Login</button>
      </nav>
      <main className="app-content">
        {renderPage()}
      </main>
    </div>
  )
}

export default App


