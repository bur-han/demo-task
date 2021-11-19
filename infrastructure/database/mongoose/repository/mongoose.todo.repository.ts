import TodoRepositoryI from '../../interfaces/todo.interface'
import TodoModel from '../models/mongoose.todo';
class MongooseTodoRepository implements TodoRepositoryI{
    public async fetchAll() {
        try{
            var todos = await (TodoModel as any).find()
            return ({todos:todos, status:200});
        }
        catch(err:any){
            return ({message:err.message, status:500});
        }
    }
    public async fetchById(id:any){
        try{
            var todo = await (TodoModel as any).findById(id)
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
            var todo = await (TodoModel as any).findByIdAndUpdate(id, body, {new:true})
            return ({todo:todo, status:200});
        }
        catch(err:any){
            return ({message:err.message, status:500});
        }
    }
    public async delete(id:any){
        try{
            var todo = await (TodoModel as any).findByIdAndDelete(id)
            return ({todo:todo, status:200});
        }
        catch(err:any){
            return ({message:err.message, status:500});
        }
    }
}
export default MongooseTodoRepository