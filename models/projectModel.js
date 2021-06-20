var mongoose = require('mongoose')
var validator = require('validator')
var timestampPlugin = require('./plugins/timestamp')

var projectSchema = mongoose.Schema({
	name : {
		type: String,
		required: true,
		unique: true,
	},
	description: {
		type: String,
		required: false
	},
	createdAt : Date,
	updatedAt : Date,
	issues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'issue', required: true }],
	nb_of_issues : Number
});

projectSchema.plugin(timestampPlugin)

//Static methods
projectSchema.statics.getAllProjects = function() {
	return new Promise((resolve, reject) => {
		this.find()
			.populate("issues")
			.then(docs => {
				resolve(docs)
			})
			.catch(err => {
				console.log(err)
				return reject(err)
			})
		})
}

//Fill number of issues 
projectSchema.pre('save', function (next){
	this.nb_of_issues = this.issues.length
	next();
})


var project = module.exports = mongoose.model('project', projectSchema)

