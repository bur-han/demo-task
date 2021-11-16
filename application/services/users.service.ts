import UserModel from "../models/user.model"
class UsersService {
    public async createUser(req:any,res:any){
        try{
            var user = new UserModel({
                email: req.body.email,
                password: req.body.password
            })
                  await user.save()
                  res.status(201).json(user)
        }
        catch(err:any){
            res.status(400).json({ message: err.message })
        }
    }
}
export default UsersService
