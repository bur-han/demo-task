#!/usr/bin/env node
const { program } = require('commander');
const { prompt } = require('inquirer');
const { TodosService } = require('../App/Application/Services/todos.service');
const todosService = new TodosService();

const questions = [
  {
    type: 'input',
    name: 'name',
    message: 'Item name',
  },
];

program.version('1.0.0').description('Todo app');

// Add Command
program
  .command('add <name>')
  .alias('a')
  .description('Add a todo item')
  .action(() => {
    prompt(questions).then((answers) => todosService.createTodo(answers));
  });

// Find Command
program
  .command('find <id>')
  .alias('f')
  .description('Find a todo')
  .action((id) => todosService.getTodo(id));

// Update Command
program
  .command('update <id>')
  .alias('u')
  .description('Update a todo')
  .action((id) => {
    prompt(questions).then((answers) => todosService.updateTodo(id, answers));
  });

// Remove Command
program
  .command('remove <id>')
  .alias('r')
  .description('Remove a todo')
  .action((id) => todosService.deconsteTodo(id));

// List Command
program
  .command('list')
  .alias('l')
  .description('List all todos')
  .action(() => todosService.getTodos());

program.parse(process.argv);
