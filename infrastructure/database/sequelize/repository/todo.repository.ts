import TodoRepositoryI from '../../interfaces/todo.repository'
import TodoModel from '../models/todo';
class SequelizeTodoRepository implements TodoRepositoryI {
    public async fetchAll(limit:number,offset:number) {
        try{
            let todos = await (TodoModel as any).findAll({offset:offset,limit:limit},{raw:true})
            return ({todos:todos});
        }
        catch(err:any){
            return ({message:err.message});
        }
    }
    public async fetchById(id:string){
        try{
            let todo = await (TodoModel as any).findByPk(id)
            return ({todo:todo});
        }
        catch(err:any){
            return ({message:err.message});
        }
    }
    public async create(name:string) {
        try{
            if(!name)
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
            let todo = await (TodoModel as any).update(body,{where: {id:id}})
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