const csv = require('./CSV');


class Expense {

  add(amount, description) {
    console.log(amount, description);
    const id = this.generateId()
    const data = [{ id, amount, description }];
    csv.add(data);
  }

  readAll() {
    csv.readAll();
  }

  generateId() {
    return 2
  }
}

module.exports = Expense;
