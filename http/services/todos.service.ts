import TodoModel from '../../models/todo.model'

class TodosService {
    public async getTodos(req:any,res:any){
                await TodoModel.find()
                .then((todos:any) => res.json(todos))
                .catch((err: any) => res.status(500).json({ message: err.message }))
    }

    public async createTodo(req:any, res:any) {
            var todo = new TodoModel({
                name: req.body.name
              })
              await todo.save()
              .then(res.status(201).json(todo))
              .catch((err:any) => res.status(400).json({ message: err.message }))
}

    public async updateTodo(req:any, res:any){
        await TodoModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
        .then((todo:any) => res.json(todo))
        .catch((err: any) => res.status(500).json({ message: err.message }))
    }

    public async deleteTodo(req:any, res:any){
      await TodoModel.findByIdAndDelete(req.params.id)
        .then((todo:any) => res.json(todo))
        .catch((err: any) => res.status(500).json({ message: err.message }))
    }
    
    public async getTodo(req:any, res:any){
        await TodoModel.findById(req.params.id)
                .then((todo:any) => res.json(todo))
                .catch((err: any) => res.status(500).json({ message: err.message }))
    }
}
export default TodosService
