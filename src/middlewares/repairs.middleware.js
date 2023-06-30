const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync')
const Repair = require('./../models/repair.model');
const User = require('../models/user.model');

exports.validRepair = catchAsync(async (req, res, next) => {
  const { id } = req.params

  const repair = await Repair.findOne({
    where: {
      status: 'pending',
      id
    },
    include: [
      {
        model: User,
        attributes: {
          exclude: [
            "password",
            "email",
            "createdAt",
            "updatedAt",
          ]
        } 
      }
    ]
  })

  if (!repair)
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
  
  req.user = repair.user
  req.repair = repair
  next()
});