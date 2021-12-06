import TodoRepositoryI from '../../Domain/Todo/todo.repository';
import TodoEntity from '../../Domain/Todo/todo.entity';
import PaginatedCollection from '../../Domain/Utils/Pagination/pagination.collection';
import TodoModel from '../Database/sequelize/models/todo'
import PaginationOptions from '../../Domain/Utils/Pagination/pagination.options';
import CustomError from '../Helpers/error';
class SequelizeTodoRepository implements TodoRepositoryI {
    public async fetchAll(pagination: PaginationOptions): Promise<PaginatedCollection> {
            const todos = await (TodoModel as any).findAndCountAll({limit: pagination.limit(), offset:pagination.offset()},{raw:true})
            if(todos)
            {
                const todosCollection = todos.rows.map((todo:any) => {
                return TodoEntity.createFromDb(todo)
                })
                const paginatedCollection = new PaginatedCollection(pagination, todos.count, todosCollection);
                return paginatedCollection.getPaginatedData();
            }
            else
            throw new CustomError(500, 'Internal server error')
    }
    public async fetchById(id:string){
            const todo = await (TodoModel as any).findByPk(id)
            if(todo)
            return TodoEntity.createFromDb(todo);
            else
            throw new CustomError(500, 'Internal server error')
    }
    public async addItem(todoEntity: TodoEntity) {
            if(todoEntity.name)
            {
                const result = await TodoModel.create(todoEntity);
                if(result)
                return TodoEntity.createFromDb(result);
                if(!result)
                throw new CustomError(500, 'Internal server error')
            }
            else
            {
                throw new CustomError(400, 'Must provide a name')
            }
    }
    public async editItem(todoEntity: TodoEntity){
        if(todoEntity.name)
        {
            const result = await (TodoModel as any).update(todoEntity,{where: {id:todoEntity.id}})
            if(result)
            return true
            if(!result)
            throw new CustomError(500, 'Internal server error')
        }
        else
        {
            throw new CustomError(400, 'Must provide a name')
        }
    }
    public async removeItem(todoEntity: TodoEntity){
        if(todoEntity.id)
        {
            const result = await (TodoModel as any).destroy({where: {id:todoEntity.id}})
            if(result)
            return true
            if(!result)
            throw new CustomError(500, 'Internal server error')
        }
        else
        {
            throw new CustomError(400, 'Must provide an id')
        }
    }
}
export default SequelizeTodoRepository