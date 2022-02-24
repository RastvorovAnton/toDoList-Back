const Task = require('../../db/models/task/index');

module.exports.getAllTasks = (req, res, next) => {
	Task.find().then((result) => {
		res.send({ data: result });
	});
};

module.exports.createNewTask = (req, res, next) => {
	if (req.body.hasOwnProperty('text') && req.body.hasOwnProperty('isCheck')) {
		const task = new Task(req.body);
		task.save().then((result) => {
			res.send(result);
		})
			.catch((err) => console.log(err));
	} else {
		res.status(404).send('Error');
	}
};

module.exports.deleteTask = (req, res) => {
	if (req.query.id) {
		const id = req.query.id
		Task.deleteOne({ _id: id })
			.then((result) => {
				Task.find().then((result) => {
					res.send(result);
				});
			})
			.catch((err) => console.log(err));
	} else {
		res.status(404).send('Error');
	}
};

module.exports.changeTaskInfo = (req, res) => {
	if (req.body) {
		const { body } = req;
		if (body.hasOwnProperty("_id") &&
			(body.hasOwnProperty("text") || body.hasOwnProperty("isCheck"))
		) {
			Task.updateOne({ _id: body._id }, body).then(() => {
				Task.find().then((result) => {
					res.send({ data: result });
				});
			});
		} else {
			res.status(404).send("u don't send _id or text isCheck ");
		}
	} else {
		res.status(404).send("u don't send body");
	}
};