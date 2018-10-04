var Job = require('./job.js')
var job = new Job()

job.once('done', function() {
    console.log('Only execute once')
})

job.on('done', function(details) {
    console.log('Weekly email job was completed at', details.completeOn)
})


job.emit('start')
job.emit('done', {completeOn: new Date()})
