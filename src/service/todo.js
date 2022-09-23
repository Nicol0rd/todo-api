const todo = require("../model/todo");

createTodo = async (req) => {
    try {
        const createdTodo = await todo.create({
            ...req,
        });
        return createdTodo;
    } catch (error) {
        throw error
    }
};

getTodos = async (req) => {
    try {
        const { page, limit, status } = req;
        let filter = {}

        switch (status) {
            case "pending":
                filter = { is_deleted: false, completed: false };
                break;
            case "completed":
                filter = { is_deleted: false, completed: true };
                break;
            case "deleted":
                filter = { is_deleted: true };
                break;
            case "all":
                break;
        }

        let skipVal = 0
        if (page != 1) {
            skipVal = (page - 1) * limit;
        }
        const todos = await todo.find(filter).skip(skipVal).limit(limit);
        const todoCount = await todo.count(filter);
        const totalPages = Math.ceil(todoCount / limit);
        const currentPage = page;
        return {
            todos: todos, paginationData: {
                total: todoCount,
                pages: totalPages,
                page: currentPage
            }
        };
    } catch (error) {
        throw error;
    }
}

updateTodos = async (id, req) => {
    try {
        const updated = await todo.findByIdAndUpdate(id, { ...req }, { new: true });
        return updated;
    } catch (error) {
        throw error
    }
}

completeTodos = async (id) => {
    try {
        const completedTodo = await todo.findOneAndUpdate({ completed: false, _id: id }, { completed: true }, { new: true });
        return completedTodo;
    } catch (error) {
        throw error
    }
}

deleteTodos = async (id) => {
    try {
        const deletedTodo = await todo.findOneAndUpdate({ is_deleted: false, _id: id }, { is_deleted: true }, { new: true });
        return deletedTodo;
    } catch (error) {
        throw error
    }
}

module.exports = {
    createTodo,
    getTodos,
    updateTodos,
    completeTodos,
    deleteTodos
};
