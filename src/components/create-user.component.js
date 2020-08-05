import React, { useState, useEffect } from 'react';
import axios from 'axios';

const User = (props) => {

  return (
    <tr>
      <td>{props.user.username}</td>
      <td> <a href="#" onClick={() => { props.deleteUser(props.user._id) }}>delete</a></td>
    </tr>
  )
}

function CreateUser() {

  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);


  useEffect(() => {
    sendGet();
  }, [])


  const sendGet = async () => {
    try {
      const responce = await axios.get('http://localhost:5000/users');
      setUsers(responce.data);

    } catch (err) {
      console.log(err);
    }
  }

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete('http://localhost:5000/users/' + id);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
   //const newUsers = users.filter(el => el._id !== id);
   //setUsers(newUsers);
    sendGet();
  }


  const onSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: username
    }

    try {
      const responce = await axios.post('http://localhost:5000/users/add', user);
      console.log(responce.data);

    } catch (err) {
      console.log(err)
    }
    setUsername('');
    sendGet();
    //window.location = '/create';

  }

  const usersList = () => {

    return users.map(currentUser => {
      return <User user={currentUser} key={currentUser._id} deleteUser={deleteUser} />
    })
  }

  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <input type="text"
            required
            className="form-control"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Create User" className="btn btn-primary" />
        </div>
      </form>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {usersList()}
        </tbody>
      </table>
    </div>
  )
}

export default CreateUser;