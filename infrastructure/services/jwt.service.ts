import jwt from 'jsonwebtoken';
class JwtService{
    public async signToken(user:any)
    {
        jwt.sign({user}, 'secretkey', (err:any, token:any) => {
            return ({token:token});
        });
    }
    public async verifyToken(bearerToken:string)
    {
        try {
            const response = jwt.verify(bearerToken, 'secretkey')
            return response
          } catch(err) {
            return (err)
          }
    }

}
export default JwtService