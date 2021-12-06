import UsersService from "../../App/Application/Services/users.service";
import PaginationOptions from "../../App/Domain/Utils/Pagination/pagination.options";
import SequelizeUserRepository from "../../App/Infrastructure/MySqlrepository/user.repository";
const userService = new UsersService(new SequelizeUserRepository)

class UserController {
    public async getUsers(req:any,res:any){
        try{
        const pagination = new PaginationOptions(req.query.page, req.query.perpage)
        const response = await userService.getUsers(pagination)
            if((response as any))
                res.status(200).json({todos: (response as any)})
        }
        catch(err:any){
            res.status(err.statusCode).json({ message: err.message })
        }
    }
    public async createUser(req:any,res:any){
        try{
            const response = await userService.createUser(req.body.email, req.body.password)
            if((response as any))
                res.status(201).json({user: (response as any)})
        }
        catch(err:any){
            res.status(err.statusCode).json({ message: err.message})
        }
    }
    public async getUser(req:any, res:any){
        try{
        const response = await userService.getUser(req.params.id)
            if((response as any))
                res.status(200).json({user: (response as any)})
        }
        catch(err:any){
            res.status(err.statusCode).json({ message: err.message })
        }
    }
    public async updateUser(req:any, res:any){
        try{
        const response = await userService.updateUser(req.params.id, req.body)
            if((response as any))
                res.status(200).json('Successfully updated')
        }
        catch(err: any){
            res.status(err.statusCode).json({ message: err.message })
        }
    }
    public async deleteUser(req:any, res:any){
        try{
            const response = await userService.deleteUser(req.params.id)
            if((response as any))
                res.status(200).json('Successfully deleted')
        }
        catch(err:any){
            res.status(err.statusCode).json({ message: err.message })
        }
    }
}
export default UserController