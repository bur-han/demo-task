import TodoModel from './models/todo.model'
import TodoFactory from '../infrastructure/factories/todo.factory'

class TodosService {
    public async getTodos(req:any,res:any){
        try{
            var todos = await TodoModel.find()
            res.json(todos)
        }
        catch(err:any){
            res.status(500).json({ message: err.message })
        }
    }

    public async createTodo(req:any, res:any) {
        try{
            var todo = TodoFactory.createNewTodo(req.body.name)
              await todo.save()
              res.status(201).json(todo)
        }
        catch(err:any){
            res.status(400).json({ message: err.message })
        }
}

    public async updateTodo(req:any, res:any){
        try{
            var todo = await TodoModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
            res.json(todo)
        }
        catch(err:any){
            res.status(500).json({ message: err.message })
        }
    }

    public async deleteTodo(req:any, res:any){
        try{
            var todo = await TodoModel.findByIdAndDelete(req.params.id)
            res.json(todo)
        }
        catch(err:any){
            res.status(500).json({ message: err.message })
        }
    }
    
    public async getTodo(req:any, res:any){
        try{
            var todo = await TodoModel.findById(req.params.id)
            res.json(todo)
        }
        catch(err:any){
            res.status(500).json({ message: err.message })
        }
    }
}
export default TodosService
