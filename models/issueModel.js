var mongoose = require('mongoose')
var timestampPlugin = require('./plugins/timestamp')

var issueSchema = mongoose.Schema({
	name : {
		type: String,
		required: true,
	},
	id: {
		type: String,
		required: false,
	},
	urgency: {
		type: String,
	},
	project: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "project",
		required: true
	}
});

issueSchema.plugin(timestampPlugin)

//Static methods
issueSchema.statics.getAllIssues = function() {
	return new Promise((resolve, reject) => {
		this.find()
			.populate("project")
			.then(docs => {
				resolve(docs)
			})
			.catch(err => {
				console.log(err)
				return reject(err)
			})
	})
}

//Generate ID
issueSchema.pre('save', function(next){
	if(!this.id){
		this.id = "THIS IS A TEST ID"
	}
	next();
})

module.exports = mongoose.model('issue', issueSchema)

