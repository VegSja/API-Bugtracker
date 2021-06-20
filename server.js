const express = require('express')
const app = express()

const projectRouter = require('./routes/projects')
const issuesRouter = require('./routes/issues')
const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/projects', projectRouter)
app.use('/api/issues', issuesRouter)

//Connect to mongoose
const dbPath = 'mongodb://localhost/bugtracker';
const options = {useNewUrlParser: true, useUnifiedTopology: true}
const mongo = mongoose.connect(dbPath, options);

mongo
	.then(() => {
		console.log('connected to database');
	})
	.catch(err => {
		console.log(err, 'error');
	})

app.listen(3000, () => {
	console.log("Server is listening on port 3000...")
})
