import AuthService from '../../../application/services/auth.service'
import urlGoogle from '../../helpers/google-util';
import open from 'open'
const authService = new AuthService()

class AuthController {
    // Create the google url to be sent to the client.
    public async getGoogleUrl(req:any,res:any, next:any) {
    var url = urlGoogle().url
    res.json({url})
    next()
  }
    public async login(req:any,res:any){
        var response = await authService.login(req.body.email, req.body.password)
        try{
            if((response as any).status === 200)
                res.status(200).json({token: (response as any).token})
        }
        catch(err){
            res.status(400).json({ message: (response as any).message })
        }
    }
    public async verifyToken(req:any, res:any, next:any) {
        try{
        var header = req.headers['authorization']
        var response = await authService.verifyToken(header)
            if((response as any).status === 200)
                next()
                // res.status(200).json({token: (response as any).token})
        }
        catch(err){
            res.status(403).json({ message: (response as any).message })
        }
    }
}
export default AuthController