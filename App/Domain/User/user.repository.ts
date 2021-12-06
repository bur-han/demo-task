import UserEntity from "./user.entity";
import PaginatedCollection from "../Utils/Pagination/pagination.collection";
import PaginationOptions from "../Utils/Pagination/pagination.options";

interface UserRepositoryI {
    fetchAll(pagination:PaginationOptions):Promise<PaginatedCollection>;
    fetchById(id: string):Promise<UserEntity>
    fetchByEmail(email: string):Promise<UserEntity>
    addUser(userEntity: UserEntity):void
    editUser(userEntity: UserEntity):void
    removeUser(userEntity: UserEntity):void
}
export default UserRepositoryI