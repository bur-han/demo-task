import TodoRepositoryI from '../../interfaces/todo.repository'
import TodoModel from '../models/todo';
class MongooseTodoRepository implements TodoRepositoryI{
    public async fetchAll(limit:number, offset:number) {
        try{
            let todos = await (TodoModel as any).find().limit(limit).skip(offset)
            return ({todos:todos});
        }
        catch(err:any){
            return ({message:err.message});
        }
    }
    public async fetchById(id:string){
        try{
            let todo = await (TodoModel as any).findById(id)
            return ({todo:todo});
        }
        catch(err:any){
            return ({message:err.message});
        }
    }
    public async create(name:string) {
        try{
        if(name)
        {
            let todo = new (TodoModel as any)({
                name: name
            })
              await todo.save()
              return ({todo:todo});
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
            let todo = await (TodoModel as any).findByIdAndUpdate(id, body, {new:true})
            return ({todo:todo});
        }
        catch(err:any){
            return ({message:err.message});
        }
    }
    public async delete(id:string){
        try{
            let todo = await (TodoModel as any).findByIdAndDelete(id)
            return ({todo:todo});
        }
        catch(err:any){
            return ({message:err.message});
        }
    }
}
export default MongooseTodoRepository