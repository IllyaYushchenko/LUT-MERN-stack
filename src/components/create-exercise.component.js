import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function CreateExercise() {


  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const sendGetRequest = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users/');
        console.log(response.data);
        if (response.data.length > 0) {
          const users = response.data.map(user => user.username);
          console.log(users);
          const userName = response.data[0].username;

          setUsers(users);
          setUsername(userName);
        } else {
          window.location = '/user'
        }

      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    }
    sendGetRequest();
  }, []);




  const onSubmit = async (e) => {
    e.preventDefault();

    const exercise = {
      username: username,
      description: description,
      date: date
    }

    try {
      const response = await axios.post('http://localhost:5000/exercises/add', exercise)
      console.log(response);
    } catch (err) {
      console.log(err)
    }
    window.location = '/';
  }

  return (
    <div>
      <h3>Create New ToDo Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            required
            className="form-control"
            value={username}
            onChange={e => setUsername(e.target.value)}>
            {
              users.map((user) => {
                return <option
                  key={user}
                  value={user}>{user}
                </option>;
              })
            }
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input type="text"
            required
            className="form-control"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={date}
              onChange={date => setDate(date)}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create ToDo Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
  )
}


export default CreateExercise;