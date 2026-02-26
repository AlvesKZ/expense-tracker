const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const fs = require("fs");
const csv = require("csv-parser");

const filePath = "./expenses.csv";

const csvWriter = createCsvWriter({
  path: filePath,
  header: [
    { id: "id", title: "id" },
    { id: "amount", title: "amount" },
    { id: "description", title: "description" },
    { id: "date", title: "date" },
  ],
  append: true,
});

class CSV {
  static add(data) {
    this.createFile();
    data.date = new Date().toISOString().split("T")[0];
    csvWriter.writeRecords([data]).then(() => {
      console.log(`# Expense added successfully (ID: ${data.id})`);
    });
  }

  static readAll() {
    this.createFile();
    return new Promise((resolve, reject) => {
      const results = [];
      fs.createReadStream("./expenses.csv")
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => resolve(results))
        .on("error", (err) => reject(err));
    });
  }

  static async readById(id) {
    const expenses = await this.readAll();
    return expenses.find((expense) => expense.id === String(id));
  }

  static update() {}

  static createFile() {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, "id,amount,description,date\n");
    }
  }
}

module.exports = CSV;
