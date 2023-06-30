const Repair = require("../models/repair.model");
const User = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");

exports.createRepair = catchAsync(async (req, res, next) => {
  const { date, motorsNumber, description } = req.body
  const { id } = req.sessionUser

  const repair = await Repair.create({
    date,
    motorsNumber,
    description,
    userId: id
  })
  
  res.status(200).json({
    status: 'created',
    repair,

  })
});

exports.findAllRepairs = catchAsync(async (req, res, next) => {
  const repairs = await Repair.findAll({
    where: {
      status: "pending"
    },
    include: [
      {
        model: User,
        attributes: [
          "id",
          "name",
          "role",
        ]
      }
    ],
    attributes:{
      exclude: ["userId"]
    }
})
return res.status(200).json({
  results: repairs.length,
  status: "success",
  repairs
})
});

exports.findOneRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;

  res.status(200).json({
    status: "success",
    repair
  });
});

exports.updateRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;

  await repair.update({status: "completed"});

  res.status(200).json({
    status: "updated",
    repair
  })
});

exports.deleteRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;

  await repair.update({status: "cancelled"});

  res.status(200).json({
    status: "deleted",
    repair
  })
});