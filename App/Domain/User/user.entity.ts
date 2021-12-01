import * as uuid from 'uuid';

class UserEntity {
    public id: string;
    public email: string;
    public password: string;


    constructor(id: string, email: string, password:string){
        this.id = id;
        this.email = email;
        this.password = password;
    }
    
    static createFromInput(email: string, password:string){
        const id = uuid.v4();
        const user = new UserEntity(id, email,password);
        return user;
    }

    static createFromDb(obj:any){
        const user = new UserEntity(obj.id, obj.email, obj.password);
        return (user);
    }
  
}

export default UserEntity;