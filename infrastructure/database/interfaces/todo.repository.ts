import PaginationOptions from '../../../Domain/Utils/Pagination/pagination.options'
interface TodoRepositoryI {
    fetchAll(pagination:PaginationOptions):any;
    fetchById(id: string):any;
    create(name:string):any
    update(id:string, body:any):any
    delete(id:string):any
}
export default TodoRepositoryI