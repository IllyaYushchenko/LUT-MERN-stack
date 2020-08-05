import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Exercise = (props) => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>

    <td>
      <Link to={"/edit/" + props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    </td>
  </tr>
)

function ExercisesList() {

  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const sendGetRequest = async () => {
      try {
        const response = await axios.get('http://localhost:5000/exercises/');
        console.log(response.data);
        setExercises(response.data);

      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    }
    sendGetRequest();

  }, []);

  const deleteExercise = async (id) => {
    try {
      const response = await axios.delete('http://localhost:5000/exercises/' + id);
      console.log(response.data);

    } catch (err) {
      console.error(err);
    }
    const newExercises = exercises.filter(el => el._id !== id);
    setExercises(newExercises);

  }

  const exerciseList = () => {


    return exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} deleteExercise={deleteExercise} key={currentexercise._id} />
    })
  }

  return (
    <div>
      <h3>Logged ToDos</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exerciseList()}
        </tbody>
      </table>
    </div>
  )

}

export default ExercisesList;