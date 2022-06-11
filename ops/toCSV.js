const fs = require('fs')
const  listArray = fs.readFileSync("links.txt")
const JSONobjP = JSON.parse(listArray)
const ObjectsToCsv = require('objects-to-csv');
 


 async function toCSV(){
    await new ObjectsToCsv(JSONobjP).toDisk('../test.csv', { allColumns: true });
}

 module.exports = toCSV