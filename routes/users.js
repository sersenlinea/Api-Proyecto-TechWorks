var express = require('express');
var router = express.Router();
const {getData,login,userList,userEdit,userDelete,userRegister} = require('../controllers/userController')


// User login
router.post('/auth/login', login);

//Usuarios admin CRUD
// User register Create
router.post('/auth/register',/*isAdmin,*/userRegister)
// User list    Read
router.get('/', /*validateJWT,*/ userList);
// User edit Update
router.patch('/id/:id', /*validateJWT,*/ userEdit);
// User delete  Delete
router.delete('/delete/:id', /*validateJWT,*/ userDelete);
// User get data
router.get('/auth/me', /*authenticated,*/ getData);

//No administrador
router.get('/users/me', /*validateJWT*/function(req, res, next) {
  res.send('respond with a resource');
});

router.patch('users/'/* ,validateJWT*/,(req,res)=>{
  res.send('algo enviamos')
})

module.exports = router;

