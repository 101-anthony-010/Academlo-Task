const express = require('express');

const router = express.Router();

//Controller functions
const usersController = require('./../controllers/users.controller')
const authController = require('./../controllers/auth.controller')

//Middleware functions
const usersMiddleware = require('./../middlewares/users.middleware')
const validation = require('./../middlewares/validations.middleware')
const authMiddleware = require('./../middlewares/auth.middleware')

//Rutas
router
  .route('/')
  .get(usersController.findAllUsers)
  .post(
    validation.createUserValidator,
    authController.signUp
  )
  
router
  .route('/login')
  .post(authController.login)

router.use(authMiddleware.protect)

router
  .use("/:id", usersMiddleware.validUser, authMiddleware.protectAccountOwner)
  .route('/:id')
  .get(usersController.findOneUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser)

module.exports = router;