import UserModel from '../../services/models/user.model'

class UserFactory {
    public static createNewUser(email: string, password:string)
    {
        return new UserModel({
            email: email,
            password: password
        })
    }
}

export default UserFactory