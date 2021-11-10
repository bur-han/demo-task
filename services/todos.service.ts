const Todo = require('../models/todo.model')

class TodosService {
    public createTodo(body: any) {
        const todo = new Todo({
            name: body.name,
          })
        return todo
        }
    public async getTodos(){
        const todos = await Todo.find()
        return todos
    }
}

export default TodosService
