const { Command } = require('commander');
const program = new Command();

program
  .name('expense-tracker')
  .description('expense tracker application to manage your finances')
  .version('1.0.0');

program.parse();