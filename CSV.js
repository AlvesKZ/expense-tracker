const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const csv = require('csv-parser');

const filePath = './expenses.csv'

const csvWriter = createCsvWriter({
  path: filePath,
  header: [
    { id: 'id', title: 'ID' },
    { id: 'amount', title: 'Amount' },
    { id: 'description', title: 'Description' },
  ],
  append: true,
});

class CSV {
  static add(data) {
    this.createFile()
    csvWriter.writeRecords(data).then(() => {
      console.log('Expense added successfully');
    });
  }

  static readAll() {
    this.createFile();
    const results = [];
    fs.createReadStream('./expenses.csv')
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => console.log('Expenses:', results));
  }

  static createFile() {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, 'ID,Amount,Description\n');
    }
  }
}

module.exports = CSV;
