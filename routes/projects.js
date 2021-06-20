const express = require('express')
const router = express.Router()
const {
	getProjects, 
	getProjectByName, 
	postProject, 
	updateProject,
	deleteProject } = require('../controllers/projects')

router.route('/')
	.get(getProjects)
	.post(postProject)

router.route('/:name')
	.get(getProjectByName)
	.put(updateProject)
	.delete(deleteProject)

module.exports = router
