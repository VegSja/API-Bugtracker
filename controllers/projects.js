const express = require('express')
const ProjectsModel = require('../models/projectModel')

const getProjects = (req, res) => {
	ProjectsModel.getAllProjects()
		.then(data => {
			res.json({
				status: "Success",
				message: "Got Projects Successfully!",
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

const getProjectByName = (req, res) => {
	var { name } = req.params
	ProjectsModel
		.find({
			name: name
		})
		.then(data => {
			res.json(data)
		})
		.catch(err => {
			console.log(err)
			res.status(404).json({
				message: "Could not get project.",
			})
		})
}

const postProject = (req, res) => {
	var project = new ProjectsModel({
		name: req.body.name,
		description: req.body.description
	});

	//Save and check error
	project.save()
		.then(doc => {
			console.log(`Successfully added project: ${project.name}`)
			res.json({
				success: true,
				message: "Successfully added project",
				data: doc
			})
		})
		.catch(err => {
			console.log(err)
			res.json({
				success: false,
				message: err,
			})
		})	
}

const updateProject = (req, res) => {
	const { name } = req.params
	ProjectsModel
		.findOneAndUpdate(
			{
				name: name
			},
			{
				name: req.body.name,
				description: req.body.description
			}
		)
		.then(data => {
			res.status(200).json({
				success: true,
				message: "Successfully updated project"
			})
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({
				success: false,
				message: err
			})
		})
}

const deleteProject = (req, res) => {
	const { name } = req.params
	ProjectsModel.findOneAndRemove({
		name: name
	})
	.then(response => {
		console.log(response)
		res.status(200).send(`Successfully removed ${ name }`)
	})
	.catch(err => {
		console.log(err)
		res.status(500).send(`Failed to remove element ${ name }`)
	})
		
}

module.exports = {
	getProjects,
	getProjectByName,
	postProject,
	updateProject,
	deleteProject
}
