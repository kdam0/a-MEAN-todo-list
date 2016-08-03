var mongoose = require('mongoose');

module.exports = mongoose.model('todoCollect', {
    text: {
        type: String,
        default: ''
    }
});