import AuthService from '../../App/Application/Services/auth.service';
import GoogleService from '../../App/Infrastructure/Services/google.service';
import JwtService from '../../App/Infrastructure/Services/jwt.service';
import { LoginInputI } from '../../App/Domain/Interfaces/auth.repository';
const authService = new AuthService()
const jwtService = new JwtService()
const googleService = new GoogleService()

class AuthController {
    public async googleAuth(req:any,res:any, next:any) {
    if(req.headers['code'])
    {
        try{
            let response = await authService.login(req.headers['code'], undefined, undefined)
                if((response as any).user)
                    next()

                if(!(response as any).user)
                    res.status(400).json({ message: 'Email or password does not match' })
        }
        catch(err:any){
            res.status(500).json({ message: err.message })
        }
    }
    else
    {
        let url = await googleService.urlGoogle()
        res.json({url})
    }
  }
  public async verifyToken(req:any, res:any, next:any) {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    try{
        let response = await jwtService.verifyToken(bearerToken)
        if((response as any).user)
            next()

        if(!(response as any).user)
            res.status(400).json({ message: (response as any).message })
    }
    catch(err:any)
    {
        res.status(500).json({ message: err.message })
    }
    }else {
    res.sendStatus(403);
    }
}
    public async loginWithJwt(req:any,res:any, next:any){
        try{
        let response = await authService.login(undefined, req.body.email,req.body.password)
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