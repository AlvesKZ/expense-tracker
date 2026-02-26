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

const csvUpdater = createCsvWriter({
  path: filePath,
  header: [
    { id: "id", title: "id" },
    { id: "amount", title: "amount" },
    { id: "description", title: "description" },
    { id: "date", title: "date" },
  ],
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
    this.createFile();
    const expenses = await this.readAll();
    return expenses.find((expense) => expense.id === String(id));
  }

  static async update(id, data) {
    const expense = await this.readById(id);
    if (!expense) {
      console.log(`# Expense ${id} not found`);
      return;
    }

    const expenses = await this.readAll();
    const updated = expenses.map((e) => {
      if (e.id === String(id)) {
        return {
          ...e,
          ...(data.description && { description: data.description }),
          ...(data.amount && { amount: data.amount }),
        };
      }
      return e;
    });

    await csvUpdater.writeRecords(updated);
    console.log(`# Expense ${id} updated successfully`);
  }

  static async delete(id) {
    const expense = await this.readById(id);
    if (!expense) {
      console.log(`# Expense ${id} not found`);
      return;
    }

    const expenses = await this.readAll();
    const filtered = expenses.filter((e) => e.id !== String(id));

    await csvUpdater.writeRecords(filtered);
    console.log(`# Expense ${id} deleted successfully`);
  }

  static createFile() {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, "id,amount,description,date\n");
    }
  }
}

module.exports = CSV;
