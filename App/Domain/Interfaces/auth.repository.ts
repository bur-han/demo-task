interface LoginInputI {
    code?: string;
    email?:string;
    password?:string;
}
interface AuthRepositoryI {
    login(code:LoginInputI, email:LoginInputI, password:LoginInputI):Promise<Object>
}
export {AuthRepositoryI, LoginInputI}