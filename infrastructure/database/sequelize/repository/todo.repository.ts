import TodoRepositoryI from '../../interfaces/todo.repository'
import TodoEntity from '../../../../Domain/Todo/todo.entity';
import PaginatedCollection from '../../../../Domain/Utils/Pagination/pagination.collection';
import TodoModel from '../models/todo';
import PaginationOptions from '../../../../Domain/Utils/Pagination/pagination.options';
class SequelizeTodoRepository implements TodoRepositoryI {
    public async fetchAll(pagination: PaginationOptions) {
        try{
            let todos = await (TodoModel as any).findAndCountAll({limit: pagination.limit(), offset:pagination.offset()},{raw:true})
            const todosCollection = todos.rows.map((todo:any) => {
                return TodoEntity.createFromDb(todo)
            })
            const paginatedCollection = new PaginatedCollection<TodoEntity>(pagination, todos.count, todosCollection);
            return paginatedCollection.getPaginatedData();
        }
        catch(err:any){
            return ({message:err.message});
        }
    }
    public async fetchById(id:string){
        try{
            let todo = await (TodoModel as any).findByPk(id)
            return TodoEntity.createFromDb(todo);
        }
        catch(err:any){
            return ({message:err.message});
        }
    }
    public async create(name:string) {
        try{
            if(name)
            {
                let todo = TodoEntity.createFromInput(name)
                let result = await TodoModel.create(todo);
                return TodoEntity.createFromDb(result);
            }
            if(!name)
              return ({todo:null});
        }
        catch(err:any){
            return ({message:err.message});
        }
    }
    public async update(id:string, body:any){
        try{
            let todo = await (TodoModel as any).update({name:body.name},{where: {id:id}})
            return ({todo:todo});
        }
        catch(err:any){
            return ({message:err.message});
        }
    }
    public async delete(id:string){
        try{
            let todo = await (TodoModel as any).destroy({where: {id:id}})
            return ({todo:todo});
        }
        catch(err:any){
            return ({message:err.message});
        }
    }
}
export default SequelizeTodoRepository