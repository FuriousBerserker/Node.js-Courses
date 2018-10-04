const fs = require('fs')
const path = require('path')

fs.readFile(path.join(__dirname, 'd.csv'), {encoding: 'utf-8'}, function (error, data) {
    if (error) {
        return console.error(error)
    }
    console.log(data)
})

fs.writeFile('message.txt', 'Hello World!', function (error) {
    if (error) {
        return console.error(error)
    }
    console.log('Write is done.')
})
