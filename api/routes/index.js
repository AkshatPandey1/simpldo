const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

let uri = "mongodb+srv://akshatpandeyme:Aakksshhaatt1_@simpldo.xieutit.mongodb.net/User?retryWrites=true&w=majority/";
mongoose.connect(uri);
const Task = mongoose.model("Task", new mongoose.Schema({
  title: String,
  date: Date
}));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/testData", function(req, res, next){
  res.json({API: "API"});
});

router.get("/getTasks", async function (req, res, next) {

})

router.get("/setTasks")

module.exports = router;
