const csv = require("./CSV");

class Expense {
  async add(amount, description) {
    const id = await this.generateId();
    const data = { id, amount, description };
    csv.add(data);
  }

  async readAll() {
    const expenses = await csv.readAll();

    this.printHeader();

    expenses.map((expense) => {
      this.printExpense(expense);
    });
  }

  async readById(id) {
    this.printHeader();
    const expense = await csv.readById(id);
    if (!expense) {
      console.log(`# Expense with ID ${id} not found`);
      return;
    }
    this.printExpense(expense);
  }

  async update(id, data) {
    await csv.update(id, data);
  }

  async delete(id) {
    await csv.delete(id);
  }

  async summary() {
    let total = 0;

    const expenses = await csv.readAll();
    expenses.forEach((expense) => {
      total += Number(expense.amount);
    });

    console.log(`# Total expenses: $${total}`);
  }

  printExpense(expense) {
    const id = String(expense.id).padEnd(4);
    const date = String(expense.date).padEnd(12);
    const description = String(expense.description).padEnd(22);
    const amount = String(expense.amount).padEnd(10);
    console.log(`# ${id} ${date} ${description} ${amount}`);
  }

  printHeader() {
    console.log(
      `# ${"ID".padEnd(4)} ${"Date".padEnd(12)} ${"Description".padEnd(22)} ${"Amount".padEnd(10)}`
    );
  }

  async generateId() {
    const expenses = await csv.readAll();

    if (expenses.length === 0) return 1;

    const maxId = Math.max(...expenses.map((expense) => Number(expense.id)));
    return maxId + 1;
  }
}

module.exports = Expense;