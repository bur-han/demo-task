import TodosService from "../../../application/services/todos.service";
const todosService = new TodosService()

class TodoController {
    public async getTodos(req:any,res:any){
        const limit = req.query.limit;
        const offset = (req.query.page - 1) * limit;
        try{
        let response = await todosService.getTodos(limit,offset)
            if((response as any).todos)
                res.status(200).json({todos: (response as any).todos})
        }
        catch(err){
            res.status(500).json({ message: (err as any).message })
        }
    }
    public async createTodo(req:any, res:any) {
        let response = await todosService.createTodo(req.body.name)
        try{
            if((response as any).todo)
                res.status(201).json({todo: (response as any).todo})
            if(!(response as any).todo)
                res.status(400).json({message: 'No name provided'})
        }
        catch(err){
            res.status(400).json({ message: (response as any).message })
        }
    }
    public async updateTodo(req:any, res:any){
        let response = await todosService.updateTodo(req.params.id, req.body)
        try{
            if((response as any).todo)
                res.status(200).json({token: (response as any).token})
        }
        catch(err){
            res.status(500).json({ message: (response as any).message })
        }
    }
    public async getTodo(req:any, res:any){
        let response = await todosService.getTodo(req.params.id)
        try{
            if((response as any).todo)
                res.status(200).json({todo: (response as any).todo})
        }
        catch(err){
            res.status(500).json({ message: (response as any).message })
        }
    }
    public async deleteTodo(req:any, res:any){
        let response = await todosService.deleteTodo(req.params.id)
        try{
            if((response as any).todo)
                res.status(200).json({todo: (response as any).todo})
        }
        catch(err){
            res.status(500).json({ message: (response as any).message })
        }
    }
}
export default TodoController