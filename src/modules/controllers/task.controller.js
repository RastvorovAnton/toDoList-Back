const Task = require('../../db/models/task/index');

module.exports.getAllTasks = (req, res, next) => {
	Task.find().then((result) => {
		res.send({ data: result });
	});
};

module.exports.createNewTask = (req, res, next) => {
	if (req.body.hasOwnProperty('text') && req.body.hasOwnProperty('isCheck')) {
		const task = new Task(req.body);
		task //whats happend with code style?
			.save()
			.then((result) => {
				res.send(result);
			})
			.catch((err) => console.log(err)); // res.status(number).send('message');
	} else {
		res.status(404).send('Error');
	}
};

module.exports.deleteTask = (req, res, next) => { //do you need next?
	if (req.query.id) {
		Task.deleteOne({ _id: req.query.id }) // destructure req.query.id
			.then((result) => {
				Task.find().then((result) => {
					res.send(result);
				});
			})
			.catch((err) => console.log(err)); // look at 17 string
	} else {
		res.status(404).send('Error');
	}
};

module.exports.changeTaskInfo = (req, res, next) => { // look at 23 str
  if (req.query.hasOwnProperty('id') && (req.body.hasOwnProperty('text') || req.body.hasOwnProperty('isCheck'))) { //it is uncorrect condition
    Task.updateOne({ _id: req.query.id }, req.body).then((result) => { // destructure req.query.id 
      Task.find().then((result) => {
        res.send({ data: result });
      });
    }); // why u don't use .catch()?
  } else {
    res.status(404).send('Somthing wrong');
  }
};
