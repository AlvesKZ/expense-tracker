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
  .option('-a, --amount <amount>', 'separator character')
  .option('-d, --description <description>', 'enter the expense description')
  .action((options) => {
    expense.add(options.amount, options.description);
  });

program.command('list')
  .description('list expenses')
  .action(() => {
    expense.readAll();
  });

program.parse();