import TodoModel from '../../services/models/todo.model'

class TodoFactory {
    public static createNewTodo(name: string)
    {
        return new TodoModel({
            name: name
        })
    }
}

export default TodoFactory