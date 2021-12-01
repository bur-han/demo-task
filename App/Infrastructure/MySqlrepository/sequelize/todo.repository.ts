import TodoRepositoryI from '../../../Domain/Interfaces/todo.repository'
import TodoEntity from '../../../Domain/Todo/todo.entity';
import PaginatedCollection from '../../../Domain/Utils/Pagination/pagination.collection';
import TodoModel from '../../Database/sequelize/models/todo'
import PaginationOptions from '../../../Domain/Utils/Pagination/pagination.options';
class SequelizeTodoRepository implements TodoRepositoryI {
    public async fetchAll(pagination: PaginationOptions) {
            let todos = await (TodoModel as any).findAndCountAll({limit: pagination.limit(), offset:pagination.offset()},{raw:true})
            const todosCollection = todos.rows.map((todo:any) => {
                return TodoEntity.createFromDb(todo)
            })
            const paginatedCollection = new PaginatedCollection<TodoEntity>(pagination, todos.count, todosCollection);
            return paginatedCollection.getPaginatedData();
    }
    public async fetchById(id:string){
            let todo = await (TodoModel as any).findByPk(id)
            return TodoEntity.createFromDb(todo);
    }
    public async addItem(name:string) {
                let todo = TodoEntity.createFromInput(name)
                let result = await TodoModel.create(todo);
                return TodoEntity.createFromDb(result);
    }
    public async editItem(id:string, body:any){
            await (TodoModel as any).update({name:body.name},{where: {id:id}})
            return true
    }
    public async removeItem(id:string){
            await (TodoModel as any).destroy({where: {id:id}})
            return true
    }
}
export default SequelizeTodoRepository