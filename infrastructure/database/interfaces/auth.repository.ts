
interface AuthRepositoryI {
    loginWithGoogle(email:string):any
    loginWithJwt(email:string, password:string):any
}
export default AuthRepositoryI