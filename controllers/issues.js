const express = require('express')
const IssuesModel = require('../models/issueModel')
const ProjectModel = require('../models/projectModel')

const getIssues = (req, res) => {
	IssuesModel.getAllIssues()
		.then(data => {
			res.json({
				status: "Success",
				message: "Got Issues Successfully!",
				data: data 
			})
		})
		.catch(err => {
			console.log(err)
			res.json({
				status: "error",
				message: err
			})
		})
}

const postIssue = (req, res) => {
	ProjectModel
		.findOne({ name: req.body.project })
		.then((parent) => {
			var issue = new IssuesModel({
				name: req.body.name,
				urgency: req.body.urgency,
				project: parent
			});
			parent.issues.push(issue)
			//Save and check for errors
			issue.save()
				.then(doc => {
					parent.save()
						.then(doc2 => {
							res.json({
								success: true,
								message: "Successfully added issue"
							})
						})
						.catch(err => {
							console.log(err)
							res.status(400).json({
								success: false,
								message: err
							})
						})
				})
				.catch(err => {
					console.log(err)
					res.status(400).json({
						success: false,
						message: err
					})
				})
		})
		.catch(err => {
			console.log(err)
			res.status(400).send(err)
		})

}

const deleteIssue = (req, res) => {
	const { id } = req.params
	IssuesModel
		//Remove issue
		.findOneAndRemove({
				id: id
		})
		.then(doc => {
			console.log(`Deleted issue with id: ${id}`)
			//Find parent project
			ProjectModel.findOne({ _id: doc.project })
				.then(parent => {
					//Remove issue from its issues and save
					const index = parent.issues.indexOf(doc._id)
					if(index > -1){
						parent.issues.splice(index, 1)
					}
					parent.save()
						.catch(err => {
							console.log(err)
							res.status(400).json({
								success: false,
								message: err
							})
						})
				})
				.catch(err => {
					console.log(err)
					res.status(400).json({
						success: false,
						message: err
					})
				})
			res.status(200).json({
					success: true,
					message: "Successfully removed issue",
					data : doc
			})
		})
		.catch(err => {
			console.log(err)
			res.status(400).json({
				success: false,
				message: err
			})
		})
}

module.exports = {
	getIssues,
	postIssue,
	deleteIssue
}
