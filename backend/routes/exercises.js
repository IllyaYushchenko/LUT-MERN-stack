const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.get('/', async (req, res) => {
  try {
    const exercises = await Exercise.find()
    res.json(exercises)
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/add', async (req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    username,
    description,
    date,
  });
  try {
   await newExercise.save()
    res.status(201).json(newExercise)
 } catch (err) {
   res.status(400).json({ message: err.message });
 }
});

router.get('/:id', async (req, res) => {
  try{
   const exercise = await  Exercise.findById(req.params.id)
    res.json(exercise)
  } catch {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
  const exercise = await  Exercise.findByIdAndDelete(req.params.id)
    res.json (exercise)
  } catch {
    res.status(400).json({ message: err.message });
  }
});

router.post('/update/:id', async (req, res) => {
  try {
      const exercise = await Exercise.findById(req.params.id)
      if (req.body.username) {
        exercise.username = req.body.username;  
      }
      if (req.body.description){
        exercise.description = req.body.description;
      }
      if (req.body.date) {
        exercise.date = Date.parse(req.body.date);
      }
      const updatedExercise = await exercise.save()
      res.json(updatedExercise)
    } catch {
      res.status(400).json({ message: err.message });
    }
});

module.exports = router;