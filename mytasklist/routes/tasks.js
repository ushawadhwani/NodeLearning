
var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");
var db = mongojs(
  "mongodb://usha:usha@ds247347.mlab.com:47347/my_task_list_test_version_for_meanstack",
  ["Tasks"]
);

//Get all the tasks
router.get("/tasks", function(req, res, next) {
  db.Tasks.find(function(err, tasks) {
    if (err) {
      res.send(err);
    }
    res.json(tasks);
  });
});

//Get single task
router.get("/task/:id", function(req, res, next) {
  db.Tasks.findOne({ _id: mongojs.ObjectId(req.params.id) }, function(
    err,
    task
  ) {
    if (err) {
      res.send(err);
    }
    res.json(task);
  });
});

//Save the task
router.post("/task", function(req, res, next) {
  var task = req.body;
  if (!task.title || task.isDone + "") {
    res.status(400);
    res.json({
      error: "Bad data"
    });
  } else {
    db.tasks.save(task, function(err, task) {
      if (err) {
        res.send(err);
      }
      res.json(task);
    });
  }
});

//Delete task
router.delete("/task/:id", function(req, res, next) {
  db.Tasks.remove({ _id: mongojs.ObjectId(req.params.id) }, function(
    err,
    task
  ) {
    if (err) {
      res.send(err);
    }
    res.json(task);
  });
});

//Update task
router.put("/task/:id", function(req, res, next) {
  var task = req.body;
  var updTask = {};

  if (task.isDone) {
    updTask.isDone = task.isDone;
  }

  if (task.title) {
    updTask.title = task.title;
  }

  if (!updTask) {
    res.status(400);
    res.json({
      error: "Bad data"
    });
  } else {
    db.Tasks.update(
      { _id: mongojs.ObjectId(req.params.id) },
      updTask,
      {},
      function(err, task) {
        if (err) {
          res.send(err);
        }
        res.json(task);
      }
    );
  }
});

module.exports = router;
