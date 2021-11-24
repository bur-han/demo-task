import * as uuid from 'uuid';

class TodoEntity {
    public id: string;
    public name: string;

    constructor(id: string, name: string){
        this.id = id;
        this.name = name;
    }
    
    static createFromInput(name: string){
        const id = uuid.v4();
        const todo = new TodoEntity(id, name);
        return todo;
    }

    static createFromDb(obj:any){
        const todo = new TodoEntity(obj.id, obj.name);
        return (todo);
    }
  
}

export default TodoEntity;