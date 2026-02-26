const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const csvWriter = createCsvWriter({
  path: "expenses.csv",
  append: true,
  header: [
    { id: "id", title: "ID" },
    { id: "amount", title: "Amount" },
    { id: "description", title: "Description" },
  ],
});

class Expense {

  add(amount, description) {
    console.log(amount, description);
    const id = this.generateId()
    const data = [{ id, amount, description }];
    csvWriter.writeRecords(data)
        .then(() => {
        console.log("Expense added successfully");
    });
  }

  generateId() {
    return 2
  }
}

module.exports = Expense;
