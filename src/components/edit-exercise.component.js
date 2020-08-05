import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function EditExercise(props) {

  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const sendExercisesGet = async () => {
      try {
        const response = await axios.get('http://localhost:5000/exercises/' + props.match.params.id);
        setUsername(response.data.username);
        setDescription(response.data.description);
        setDate(new Date(response.data.date));
      } catch (err) {
        console.log(err);
      }
    }

    const sendUsersGet = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users/');
        if (response.data.length > 0) {
          const users = response.data.map(user => user.username);
          setUsers(users);
        }
      } catch (err){
        console.log(err);
      }
    }
    sendExercisesGet();
    sendUsersGet();

  }, [])




  const onSubmit = (e) => {
    e.preventDefault();

    const exercise = {
      username: username,
      description: description,
      date: date
    }

    console.log(exercise);

    axios.post('http://localhost:5000/exercises/update/' + props.match.params.id, exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  return (
    <div>
      <h3>Edit ToDo Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            required
            className="form-control"
            value={username}
            onChange={e => setUsername(e.target.value)}>
            {
              users.map(function (user) {
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
          <input type="submit" value="Edit ToDo Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
  )
}


export default EditExercise;