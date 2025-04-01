import prisma from "../database/client.js";

const controller = {};

controller.create = function (req, res) {
  try {
    prisma.categoria.create({ data: req.body });
    res.status(201).end();
  } catch (error) {
    console.error(error);
    res.status(500).end(error);
  }
};

export default controller;
