import TodoModel from '../models/todo.model'

class TodosService {
    public async getTodos(req:any,res:any){
        var todos
        if(process.env.ORM === 'Sequelize')
            {
                todos = await TodoModel.findAll()
                .then((todos:any) => {
                    res.json(todos)
                  })
                .catch((err: any) => {
                    res.status(500).json({ message: err.message })
                })
            }
            if(process.env.ORM === 'Mongoose')
            {
                todos = await TodoModel.find()
                .then((todos:any) => {
                    res.json(todos)
                  })
                .catch((err: any) => {
                    res.status(500).json({ message: err.message })
                })
            }
    }
    public createTodo(req:any, res:any) {
        let todo
        console.log(process.env.ORM)
        if(process.env.ORM === 'Sequelize')
        {
            todo = TodoModel.create({
                name: req.body.name
              })
              .then(async (todo:any) => {
                try {
                  const newTodo = await todo.save()
                  res.status(201).json(newTodo)
                } catch (err: any) {
                  res.status(400).json({ message: err.message })
                }
              })
        }
        if(process.env.ORM === 'Mongoose')
        {
            todo = new TodoModel({
                name: req.body.name
              })
              .then(async (todo:any) => {
                try {
                  const newTodo = await todo.save()
                  res.status(201).json(newTodo)
                } catch (err: any) {
                  res.status(400).json({ message: err.message })
                }
              })
        }
}
    public async updateTodo(req:any, res:any){
        if (req.body.name != null) {
            (res as any).todo.name = req.body.name
          }
          try {
            const updatedTodo = await (res as any).todo.save()
            res.json(updatedTodo)
          } catch (err: any) {
            res.status(400).json({ message: err.message })
          }
    }
    public async deleteTodo(req:any, res:any){
        try {
            await (res as any).todo.remove()
            res.json({ message: 'Deleted todo' })
          } catch (err: any) {
            res.status(500).json({ message: err.message })
          }
    }
}
export default TodosService
