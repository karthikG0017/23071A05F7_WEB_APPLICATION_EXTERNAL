import { useState, useEffect } from 'react';

function KeyDisplay({ userKey, username }) {
  const [userData, setUserData] = useState(null);
  const [formattedKey, setFormattedKey] = useState('');
  
  useEffect(() => {
    if (username) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.username === username);
      if (user) {
        setUserData(user);
        
        if (userKey && user.dateOfBirth) {
          const firstTwoLetters = user.firstName.substring(0, 2);
          const dateParts = user.dateOfBirth.split('-'); 
          
          if (dateParts.length === 3) {
            const day = dateParts[2];
            const month = dateParts[1];
            const year = dateParts[0];
            const formattedDate = day + month + year;
            setFormattedKey(firstTwoLetters + formattedDate);
          } else {
            setFormattedKey(userKey);
          }
        } else {
          setFormattedKey(userKey);
        }
      }
    }
  }, [username, userKey]);

  return (
    <div className="key-display-container">
      <div className="key-card">
        <h3>Your Access Key</h3>
        <div className="key-value">key:{formattedKey}</div>
      </div>
    </div>
  );
}


export default KeyDisplay;
