const router = require('express').Router();
let User = require('../models/user.model');

router.get('/', async (req, res) => {
  try{
   const users = await  User.find()
    res.json(users)
  } catch (err) {
    res.status(500).json({message:err.message})
  }
});

router.post ('/add', async (req, res)=> {
 
    const user = new User({username:req.body.username});
 try {
    const newUser = await user.save()
    res.status(200).json(newUser)
 } catch(err){
   res.status(400).json({message:err.message})
 }
});

router.delete('/:id', getUser, async (req, res) => {
  try {
    const deletedUser = await res.user.remove()
    res.json( {deleted:deletedUser} )
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getUser(req, res, next) {
  let user
  try {
   user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'Cannot find user' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.user = user
  next()
}
module.exports = router;