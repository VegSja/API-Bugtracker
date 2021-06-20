module.exports = function timestamp(schema) {

	//Add two fields to the schema
	schema.add({
		createdAt: Date,
		updatedAt: Date
	})

	//pre-save hook to set values for createdAt and updatedAt
	schema.pre('save', function(next) {
		let now = Date.now()
	
		this.updatedAt = now
		//Set a value for createdAt only if it is null
		if(!this.createdAt){
			this.createdAt = now
		}
		next()
	})
}
