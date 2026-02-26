const { Command } = require('commander');
const program = new Command();


const Expense = require('./Expense');
const expense = new Expense();

program
  .name('expense-tracker')
  .description('expense tracker application to manage your finances')
  .version('1.0.0');

program.command('add')
  .description('add an new expense')
  .option('-a, --amount <amount>', 'enter the amount')
  .option('-d, --description <description>', 'enter the expense description')
  .action((options) => {
    expense.add(options.amount, options.description);
  });

program.command('list')
  .description('list expenses')
  .option('-i, --id <id>', 'find expense by id')
  .action((option) => {
    if (option.id) {
      expense.readById(option.id);
    } else {
      expense.readAll();
    }
  });

program.command('update')
  .description('update an expense')
  .option('-i, --id <id>', 'find expense by id')
  .action((option) => {
  });

program.parse();