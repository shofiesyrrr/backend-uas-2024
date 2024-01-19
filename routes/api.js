// import express from 'express';
const express = require("express");
const router = express.Router();

// import controllers
const PatientsController = require("../controllers/PatientsController");

// rute get, post, put, delete dari patients
router.get("/patients", PatientsController.index); // get all patients
router.get("/patients/:id", PatientsController.show); // get patient by id
router.post("/patients", PatientsController.store); // create patient
router.put("/patients/:id", PatientsController.update); // update patient
router.delete("/patients/:id", PatientsController.destroy); // delete patient
router.get("/patients/search/:name", PatientsController.search); // search patient by name
router.get("/patients/status/:status", PatientsController.status); // get patient by status

// export router
module.exports = router;
