
interface TodoRepositoryI {
    fetchAll(limit:number, offset:number):any;
    fetchById(id: string):any;
    create(name:string):any
    update(id:string, body:any):any
    delete(id:string):any
}
export default TodoRepositoryI