var pg = require('pg');

module.exports = mongoose.model('Todo', {
	text : {type : String, default: ''}
});