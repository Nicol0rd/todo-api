const express = require("express");
const todos = require("../service/todo")
const router = express.Router();
const reqValidator = require("../helper/reqValidator");
const schemas = require("../helper/schemas")

//READ
router.get('/todos', reqValidator( schemas.todoGET ,'query'), async (req, res) => {
    try {
        const todo = await todos.getTodos(req.query)
        res.json({todo});
    } catch (error) {
        res.sendStatus(400).json({
            error
        })
    }
})

//CREATE
router.post('/todos', reqValidator( schemas.todoPOST ,'body') ,async (req, res) => {
    try {
        const todo =  await todos.createTodo(req.body)
        res.json({created: todo})
    } catch (error) {
        res.status(400).json({
            error
        })
    }
})

//UPDATE
router.put('/todos/:id', reqValidator( schemas.todoUPDATE ,'body'), reqValidator(schemas.todoCOMPLETE,'params'), async (req, res) => {
    try {
        const updatedTodo = await todos.updateTodos(req.params.id,req.body);
        if(updatedTodo) {
            res.json({updated: updatedTodo});
        } else {
            res.status(400).json({
                error: "provided id does not exist"
            })
        }
        

    } catch (error) {
        res.status(400).json({
            error: error
        })
    }
})


//Complete
router.put('/todos/complete/:id',  reqValidator( schemas.todoCOMPLETE ,'params'), async (req,res) => {
    try {
        const completedTodo = await todos.completeTodos(req.params.id);
        res.json({ completed: completedTodo});
    } catch (error) {
        res.status(400).json({
            error: error
        })
    }
})

//DELETE
router.delete('/todos/:id',  reqValidator( schemas.todoDELETE ,'params'), async (req, res) => {
    try {
        const deleteTodos = await todos.deleteTodos(req.params.id);
        res.json({ deleted: deleteTodos})
    } catch (error) {
        res.status(400).json({
            error: error
        })
    }
})


module.exports = router