const catchAsync = require('./../utils/catchAsync')
const AppError = require('../utils/appError');
const User = require('./../models/user.model')

exports.findAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    where: {
      status: 'active',
    },
    attributes: {
      exclude: [
        "password",
      ]
    }
  })
  res.status(200).json({
    status: 'success',
    users
  })
});

exports.findOneUser = catchAsync(async (req, res, next) => {
  const { user } = req

  res.status(200).json({
    status: 'success',
    user
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { name, email } = req.body
  const { user } = req

  await user.update({name: name.toLowerCase(), email: email.toLowerCase()})

  res.status(200).json({
    status: 'update',
  })
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req

  await user.update({status: "disabled"})

  res.status(200).json({
    status: 'deleted'
  })
});