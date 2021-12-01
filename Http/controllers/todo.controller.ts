import TodosService from "../../App/Application/Services/todos.service";
import PaginationOptions from "../../App/Domain/Utils/Pagination/pagination.options";
const todosService = new TodosService()

class TodoController {
    public async getTodos(req:any,res:any){
        const pagination = new PaginationOptions(req.query.page, req.query.perpage)
        let response = await todosService.getTodos(pagination)
        try{
            if((response as any).data)
                res.status(200).json({todos: (response as any)})
        }
        catch(err){
            res.status(500).json({ message: (err as any).message })
        }
    }
    public async createTodo(req:any, res:any) {
        try{
        let response = await todosService.createTodo(req.body.name)
            if((response as any).name)
                res.status(201).json({todo: (response as any)})
            if(!(response as any).name)
                res.status(400).json({message: 'Must provide a name'})
        }
        catch(err:any){
            res.status(500).json({ message: err.message })
        }
    }
    public async updateTodo(req:any, res:any){
        let response = await todosService.updateTodo(req.params.id, req.body)
        try{
            if((response as any))
                res.status(200).json('Successfully updated')
            else
            res.status(400).json('Operation wasnt successful')
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
            if((response as any))
                res.status(200).json('Successfully deleted')
            else
                res.status(400).json('Operation wasnt successful')
        }
        catch(err){
            res.status(500).json({ message: (response as any).message })
        }
    }
}
export default TodoController