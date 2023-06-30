const express = require('express');

const router = express.Router();

//Controller functions
const repairController = require('./../controllers/repairs.controller')

//Middleware functions
const repairMiddleware = require('./../middlewares/repairs.middleware')
const validation = require('./../middlewares/validations.middleware')
const authMiddleware = require('./../middlewares/auth.middleware')

//Rutas
router.use(authMiddleware.protect)

router
  .route('/')
  .get(repairController.findAllRepairs)
  .post(
    validation.createRepairsValidator, 
    repairController.createRepair
  )

router
  .use('/:id', repairMiddleware.validRepair)
  .route('/:id')
  .get(repairMiddleware.validRepair, authMiddleware.protectAccountOwner, repairController.findOneRepair)
  .patch(repairMiddleware.validRepair, authMiddleware.protectAccountOwner, repairController.updateRepair)
  .delete(repairMiddleware.validRepair, authMiddleware.protectAccountOwner, repairController.deleteRepair)

module.exports = router;