import UsersService from "../../../application/services/users.service";
const userService = new UsersService()

class UserController {
    public async createUser(req:any,res:any){
        var response = await userService.createUser(req.body.email)
        try{
            if((response as any).status === 201)
                res.status(201).json({user: (response as any).user})
        }
        catch(err){
            res.status(400).json({ message: (response as any).message })
        }
    }
}
export default UserController