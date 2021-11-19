import TodoRepositoryI from '../../interfaces/todo.interface'
import TodoModel from '../models/sequelize.todo';
class SequelizeTodoRepository implements TodoRepositoryI {
    public async fetchAll() {
        try{
            var todos = await (TodoModel as any).findAll({raw:true})
            return ({todos:todos, status:200});
        }
        catch(err:any){
            return ({message:err.message, status:500});
        }
    }
    public async fetchById(id:any){
        try{
            var todo = await (TodoModel as any).findByPk(id)
            return ({todo:todo, status:200});
        }
        catch(err:any){
            return ({message:err.message, status:500});
        }
    }
    public async create(name:any) {
        try{
            var todo = new (TodoModel as any)({
                name: name
            })
              await todo.save()
              return ({todo:todo, status:201});
        }
        catch(err:any){
            return ({message:err.message, status:400});
        }
    }
    public async update(id:any, body:any){
        try{
            var todo = await (TodoModel as any).update(body,{where: {id:id}})
            console.log(todo)
            return ({todo:todo, status:200});
        }
        catch(err:any){
            return ({message:err.message, status:500});
        }
    }
    public async delete(id:any){
        try{
            var todo = await (TodoModel as any).destroy({where: {id:id}})
            return ({todo:todo, status:200});
        }
        catch(err:any){
            return ({message:err.message, status:500});
        }
    }
}
export default SequelizeTodoRepository