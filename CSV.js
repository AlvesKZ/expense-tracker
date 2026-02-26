const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const fs = require("fs");
const csv = require("csv-parser");

const filePath = "./expenses.csv";

const csvWriter = createCsvWriter({
  path: filePath,
  header: [
    { id: "id", title: "ID" },
    { id: "amount", title: "Amount" },
    { id: "description", title: "Description" },
    { id: "date", title: "Date" },
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
    return expenses.find((expense) => expense.ID === String(id));
  }

  static update() {}

  static createFile() {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, "ID,Amount,Description,Date\n");
    }
  }
}

module.exports = CSV;
