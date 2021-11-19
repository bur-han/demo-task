
interface TodoRepositoryI {
    fetchAll():any;
    fetchById(id: any):any;
    create(name:any):any
    update(id:any, body:any):any
    delete(id:any):any
}
export default TodoRepositoryI