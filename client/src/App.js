import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const server = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API : '';
  useEffect(() => {
    axios.get(server + '/api/users').then(userList => {
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
