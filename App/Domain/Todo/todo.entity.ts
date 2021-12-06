import * as uuid from 'uuid';
import { Sequelize } from 'sequelize';

class TodoEntity {
    public id: string;
    public name: string;
    public createdAt: any;
    public updatedAt: any;


    constructor(id: string, name: string, createdAt: any, updatedAt:any){
        this.id = id;
        this.name = name;
        this.createdAt = createdAt
        this.updatedAt = updatedAt

    }
    
    static createFromInput(name: string){
        const id = uuid.v4();
        const createdAt = Sequelize.fn('NOW')
        const updatedAt = Sequelize.fn('NOW')
        const todo = new TodoEntity(id, name, createdAt,updatedAt);
        return todo;
    }

    static createFromDb(obj:any){
        const todo = new TodoEntity(obj.id, obj.name, obj.createdAt, obj.updatedAt);
        return todo;
    }
  
}

export default TodoEntity;