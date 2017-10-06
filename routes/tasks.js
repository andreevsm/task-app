const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const db = mongojs('mongodb://serzhikkk:1q2w3e4r5t6y@ds159024.mlab.com:59024/task_list');

router.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

//get all tasks
router.get('/tasks', function(req, res, next) {
    db.tasks.find((err, tasks) => {
        if (err) {
            res.send(err);
        }
        res.json(tasks);
    });
});

//get single task
router.get('/task/:id', function(req, res, next) {
    db.tasks.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, task) => {
        if (err) res.send(err);
        res.json(task);

    })
});

//save tasks
router.post('/task', function(req, res, next) {
    const task = req.body;
    if (!task.title || !(task.isDone + ' ')) {
        res.status(400);
        res.json({
            "error": "Bad data"
        });
    } else {
        db.tasks.save(task, (err, task) => {
            if (err) res.send(err);
            res.json(task);
        });
    }
});

//delete task
router.delete('/task/:id', function(req, res, next) {
    db.tasks.remove({ _id: mongojs.ObjectId(req.params.id) }, (err, task) => {
        if (err) res.send(err);
        res.json(task);
    });
});

//update task
router.put('/task/:id', (req, res, next) => {
    const task = req.body;
    const updTask = {};

    if (task.isDone) updTask.isDone = task.isDone;
    if (task.title) updTask.title = task.title;

    if (!updTask) {
        res.status(400);
        res.json({
            "error": "Bad data"
        });
    } else {
        db.tasks.update({ _id: mongojs.ObjectId(req.params.id) }, updTask, {}, (err, task) => {
            if (err) res.send(err);
            res.json(task);
        });
    }
});

module.exports = router;