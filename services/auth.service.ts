import jwt from 'jsonwebtoken';
import UserModel from './models/user.model'


class AuthService {
    public async login(req:any,res:any){
        try{
            var user = await UserModel.find({email: req.body.email, password: req.body.password})
            if(user.length > 0)
            {
                jwt.sign({user}, 'secretkey', (err:any, token:any) => {
                    res.json({token});
                });
            }
            else
            res.status(201).json({ message: 'Email or password does not match' })
        }
        catch(err:any){
            res.status(400).json({ message: err.message })
        }
    }
    public async verifyToken(req:any, res:any, next:any) {
        const bearerHeader = req.headers['authorization'];
        if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        jwt.verify(bearerToken, 'secretkey', ((err:any, authData:any) => {
            if(err)
            res.status(403).json({ message: err.message })
            else
            console.log(authData.user)
          }));
        next();
        } else {
        res.sendStatus(403);
        }
  }
}
export default AuthService