import UserFactory from '../infrastructure/factories/user.factory'

class UsersService {
    public async createUser(req:any,res:any){
        try{
            var user = UserFactory.createNewUser(req.body.email, req.body.password)
                  await user.save()
                  res.status(201).json(user)
        }
        catch(err:any){
            res.status(400).json({ message: err.message })
        }
    }
}
export default UsersService
