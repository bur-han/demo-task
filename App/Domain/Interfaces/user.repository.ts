import UserEntity from "../User/user.entity";

interface UserRepositoryI {
    addUser(email:string, password:string):Promise<UserEntity>
}
export default UserRepositoryI