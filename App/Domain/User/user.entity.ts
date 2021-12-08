import * as uuid from 'uuid';
import { Sequelize } from 'sequelize';

class UserEntity {
  public id: string;
  public userId: string;
  public email: string;
  public password: string;
  public createdAt: any;
  public updatedAt: any;

  constructor(
    id: string,
    userId: string,
    email: string,
    password: string,
    createdAt: any,
    updatedAt: any
  ) {
    this.id = id;
    this.userId = userId;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static createFromInput(email: string, password: string) {
    const id = uuid.v4();
    const userId = id;
    const createdAt = Sequelize.fn('NOW');
    const updatedAt = Sequelize.fn('NOW');
    const user = new UserEntity(
      id,
      userId,
      email,
      password,
      createdAt,
      updatedAt
    );
    return user;
  }

  static createFromDb(obj: any) {
    const user = new UserEntity(
      obj.id,
      obj.userId,
      obj.email,
      obj.password,
      obj.createdAt,
      obj.updatedAt
    );
    return user;
  }
}

export default UserEntity;
