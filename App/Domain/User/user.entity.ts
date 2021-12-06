import * as uuid from 'uuid';
import { Sequelize } from 'sequelize';

class UserEntity {
    public id: string;
    public email: string;
    public password: string;
    public createdAt: any;
    public updatedAt: any;

    constructor(id: string, email: string, password:string, createdAt: any, updatedAt:any){
        this.id = id;
        this.email = email;
        this.password = password;
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
    
    static createFromInput(email: string, password:string){
        const id = uuid.v4();
        const createdAt = Sequelize.fn('NOW')
        const updatedAt = Sequelize.fn('NOW')
        const user = new UserEntity(id, email,password, createdAt, updatedAt);
        return user;
    }

    static createFromDb(obj:any){
        const user = new UserEntity(obj.id, obj.email, obj.password, obj.createdAt, obj.updatedAt);
        return (user);
    }
  
}

export default UserEntity;