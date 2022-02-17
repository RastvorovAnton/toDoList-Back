const express = require('express');
const router = express.Router();

const {
	getAllTasks,
	createNewTask,
	deleteTask,
	changeTaskInfo
} = require('../controllers/task.controller');

router.get('/getAllTasks', getAllTasks);
router.post('/createNewTask', createNewTask);
router.delete('/deleteTask', deleteTask);
router.patch('/updateTask', changeTaskInfo);


module.exports = router;