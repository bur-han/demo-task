const Todo = require('../models/todo.model')

class TodosService {
    
    public createTodo(body: any) {
        let todo
        console.log(process.env.ORM)
        if(process.env.ORM === 'Sequelize')
        {
            todo = Todo.create({
                name: body.name,
              })
        }
        if(process.env.ORM === 'Mongoose')
        {
            todo = new Todo({
                name: body.name,
              })
        }
        console.log(todo)
        return todo
        }
    public async getTodos(){
        let todos
        if(process.env.ORM === 'Sequelize')
        {
            todos = await Todo.findAll()
        }
        if(process.env.ORM === 'Mongoose')
        {
            todos = await Todo.find()
        }
        return todos
    }
}

export default TodosService
