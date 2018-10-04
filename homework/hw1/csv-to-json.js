const fs = require('fs')
const rl = require('readline')
const st = require('stream')
const assert = require('assert')

const csvFile = 'customer-data.csv'
const jsonFile = 'customer-data.json'
const csvStream = fs.createReadStream(csvFile);
const jsonStream = fs.createWriteStream(jsonFile); 


const r1 = rl.createInterface({
    input: csvStream,
    //output: jsonStream
})

let count = 0;
let names = null;
let buffer = Buffer.alloc(10000)

jsonStream.write('[', 'utf8')
r1.on('line', (line) => {
    if (count == 0) {
        names = line.split(',', line.length) 
        console.log(names)
    } else {
        let values = line.split(',', line.length)
        assert.equal(values.length, names.length, "the number of values doesn't match the number of names")
        if (count == 1) {
            jsonStream.write('\n{\n', 'utf8')
        } else {
            jsonStream.write(',\n{\n', 'utf8')
        }
        let item = ''
        for (var i = 0; i < names.length; i++) {
           item = '"' + names[i] + '": "' + values[i] + '"'
           if (i != names.length - 1) {
                item += ','
           }
           item += '\n'
           jsonStream.write(item, 'utf8')
        }
        jsonStream.write('}', 'utf8')
    }

    count++;
});

r1.on('close', () => {
    jsonStream.end(']', 'utf8')
    console.log("CSV to JSON conversion completes successfully!")
})
