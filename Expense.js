const csv = require("./CSV");

class Expense {
  async add(amount, description) {
    console.log(amount, description);
    const id = await this.generateId();
    const data = { id, amount, description };
    csv.add(data);
  }

  async readAll() {
    const results = await csv.readAll();

    console.log(
      `# ${"ID".padEnd(4)} ${"Date".padEnd(12)} ${"Description".padEnd(22)} ${"Amount".padEnd(10)}`,
    );

    results.map((expense) => {
      const id = String(expense.ID).padEnd(4);
      const date = String(expense.Date).padEnd(12);
      const description = String(expense.Description).padEnd(22);
      const amount = String(expense.Amount).padEnd(10);
      console.log(`# ${id} ${date} ${description} ${amount}`);
    });
  }

  async generateId() {
    const results = await csv.readAll();

    if (results.length === 0) return 1;

    const maxId = Math.max(...results.map((expense) => Number(expense.ID)));
    return maxId + 1;
  }
}

module.exports = Expense;
