// get the todos collection
var todoCollect = require('./models/todo');

// use mongo to get all the items in db
function getTodos (res) {
    todoCollect.find(function (err, todos) {
        if (err) res.send(err);
        // return all todos in JSON format
        res.json(todos); 
    });
}

// ===========================API===============================
module.exports = function (app) {

    // get all items
    app.get('/api/todos', function (req, res) {
        getTodos(res);
    });

    // create an item
    app.post('/api/todos', function (req, res) {

        // add item to the list
        todoCollect.create({
            text: req.body.text,
            done: false
        }, function (err, todo) {
            if (err) res.send(err);
            // 'refresh' to-do list
            getTodos(res);
        });

    });

    // delete item
    app.delete('/api/todos/:todo_id', function (req, res) {
        todoCollect.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err) res.send(err);
            // 'refresh' to-do list
            getTodos(res);
        });
    });

    // load the static html file for now
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html');
    });
};
