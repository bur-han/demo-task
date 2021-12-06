import TodosService from "../../App/Application/Services/todos.service";
import PaginationOptions from "../../App/Domain/Utils/Pagination/pagination.options";
import SequelizeTodoRepository from "../../App/Infrastructure/MySqlrepository/todo.repository";
const todosService = new TodosService(new SequelizeTodoRepository)

class TodoController {
    public async getTodos(req:any,res:any){
    try{
        const pagination = new PaginationOptions(req.query.page, req.query.perpage)
        const response = await todosService.getTodos(pagination)
            if((response as any))
                res.status(200).json({todos: (response as any)})
        }
        catch(err:any){
            res.status(err.statusCode).json({ message: err.message })
        }
    }
    public async createTodo(req:any, res:any) {
        try{
        const response = await todosService.createTodo(req.body.name)
            if((response as any))
                res.status(201).json({todo: (response as any)})
        }
        catch(err:any){
            res.status(err.statusCode).json({ message: err.message })
        }
    }
    public async getTodo(req:any, res:any){
        try{
        const response = await todosService.getTodo(req.params.id)
            if((response as any))
                res.status(200).json({todo: (response as any)})
        }
        catch(err:any){
            res.status(err.statusCode).json({ message: err.message })
        }
    }
    public async updateTodo(req:any, res:any){
        try{
        const response = await todosService.updateTodo(req.params.id, req.body)
            if((response as any))
                res.status(200).json('Successfully updated')
        }
        catch(err: any){
            res.status(err.statusCode).json({ message: err.message })
        }
    }
    public async deleteTodo(req:any, res:any){
        try{
            const response = await todosService.deleteTodo(req.params.id)
            if((response as any))
                res.status(200).json('Successfully deleted')
        }
        catch(err:any){
            res.status(err.statusCode).json({ message: err.message })
        }
    }
}
export default TodoController