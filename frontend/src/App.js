import { useEffect, useState } from "react";
import axios from "axios";


function App() {
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // const API = process.env.REACT_APP_API_URL;
  // const API="http://localhost:5000"
  // console.log(API,"apiisddss=================s===================")

  const fetchUsers = () => {
    axios.get(`/api/users`)
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    axios.get(`/api/message`)
      .then(res => setMessage(res.data.message))
      .catch(err => console.error(err));

    fetchUsers();
  }, []);

  const addUser = () => {
    if (name && email) {
      axios.post(`/api/users`, { name, email })
        .then(() => {
          setData([...data, { name, email }]); // Optimistically update the list
          setName("");
          setEmail("");
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <div>
      <h1>React Frontend</h1>
      <h2>{message}</h2>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={addUser}>Add User</button>
      </div>
      {data.map((user, index) => (
        <div key={index}>
          <h3>{user.name}</h3>
          <h3>{user.email}</h3>
        </div>
      ))}


    </div>
  );
}

export default App; 