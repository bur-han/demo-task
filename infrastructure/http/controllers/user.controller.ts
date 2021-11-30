import UsersService from "../../../application/services/users.service";
const userService = new UsersService()

class UserController {
    public async createUser(req:any,res:any){
        let response = await userService.createUser(req.body.email, req.body.password)
        try{
            if((response as any).email)
                res.status(201).json({user: (response as any)})

                if(!(response as any).email)
                res.status(400).json({message: 'Must provide both email and password'})
        }
        catch(err){
            res.status(500).json({ message: (response as any).message })
        }
    }
}
export default UserController