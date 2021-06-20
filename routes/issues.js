const express = require('express')
const router = express.Router()
const {
	getIssues,
	postIssue,
	deleteIssue } = require('../controllers/issues')

router.route('/')
	.get(getIssues)
	.post(postIssue)

router.route('/:id')
	.delete(deleteIssue)

module.exports = router
