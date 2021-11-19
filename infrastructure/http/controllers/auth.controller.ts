import AuthService from '../../../application/services/auth.service'
import {urlGoogle} from '../../helpers/google-util';
import {getUserEmail} from '../../helpers/google-util'
const authService = new AuthService()

class AuthController {
    public async googleAuth(req:any,res:any, next:any) {
    if(req.headers['code'])
    {
        try{
            var email = await getUserEmail(req.headers['code'])
            var response = await authService.login(email)
            try{
                if((response as any).status === 200)
                    next()

                    if((response as any).status === 400)
                    res.status(400).json({ message: (response as any).message })
            }
            catch(err){
                       res.status(400).json({ message: (response as any).message })
                    }
        }
        catch(err){
            res.json(err)
        }
    }
    else
    {
        var url = urlGoogle().url
        res.json({url})
    }
  }
    public async login(req:any,res:any, next:any){
        var response = await authService.login(req.body.email)
        try{
            if((response as any).status === 200)
            res.status(200).json({ message: 'Logged in'})
        }
         catch(err){
           res.status(400).json({ message: (response as any).message })
        }
    }
}
export default AuthController