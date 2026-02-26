const csv = require("./CSV");

class Expense {
  async add(amount, description) {
    console.log(amount, description);
    const id = await this.generateId();
    const data = { id, amount, description };
    csv.add(data);
  }

  async readAll() {
    const expenses = await csv.readAll();

    this.printHeader()

    expenses.map((expense) => {
      this.printExpense(expense);
    });
  }

  async readById(id) {
    this.printHeader();
    const expense = await csv.readById(id);
    this.printExpense(expense);
  }

  printExpense(expense) {
    const id = String(expense.ID).padEnd(4);
    const date = String(expense.Date).padEnd(12);
    const description = String(expense.Description).padEnd(22);
    const amount = String(expense.Amount).padEnd(10);
    console.log(`# ${id} ${date} ${description} ${amount}`);
  }

  printHeader() {
    console.log(
      `# ${"ID".padEnd(4)} ${"Date".padEnd(12)} ${"Description".padEnd(22)} ${"Amount".padEnd(10)}`,
    );
  }

  async generateId() {
    const expenses = await csv.readAll();

    if (expenses.length === 0) return 1;

    const maxId = Math.max(...expenses.map((expense) => Number(expense.ID)));
    return maxId + 1;
  }
}

module.exports = Expense;
