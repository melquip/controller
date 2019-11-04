import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:4000/api/users').then(userList => {
      setUsers(userList.data);
    })
  }, []);
  return (
    <div className="App">
      <h1>Users</h1>
      {
        users.map(user => (<div className="user">
          <p>{user.name}</p>
        </div>))
      }
    </div>
  );
}

export default App;
