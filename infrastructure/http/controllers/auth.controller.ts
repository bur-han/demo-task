import AuthService from '../../../application/services/auth.service'
import {urlGoogle} from '../../services/google.service';
import {getUserEmail} from '../../services/google.service'
import jwt from 'jsonwebtoken';
const authService = new AuthService()

class AuthController {
    public async googleAuth(req:any,res:any, next:any) {
    if(req.headers['code'])
    {
        try{
            let email = await getUserEmail(req.headers['code'])
            let response = await authService.loginWithGoogle(email)
            try{
                if((response as any).user)
                    next()

                if(!(response as any).user)
                    res.status(400).json({ message: 'Email or password does not match' })
            }
            catch(err){
                       res.status(500).json({ message: (response as any).message })
                    }
        }
        catch(err){
            res.json(err)
        }
    }
    else
    {
        let url = urlGoogle().url
        res.json({url})
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
    public async loginWithJwt(req:any,res:any, next:any){
        try{
        let response = await authService.loginWithJwt(req.body.email, req.body.password)
            if((response as any).token)
            res.status(200).json({ token: (response as any).token})

            if(!(response as any).token)
            res.status(400).json({ message: 'Email or password does not match' })
        }
         catch(err:any){
           res.status(500).json({ message: err.message })
        }
    }
}
export default AuthController