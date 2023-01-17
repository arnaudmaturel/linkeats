const express = require('express');
const app = express();
const path = require('path');
const apidoc  = require('apidoc')

app.use(express.static(path.join(__dirname, "doc")))

// const doc = apidoc.createDoc({
//     src: '../api_code',
//     dest: 'doc', // can be omitted if dryRun is true
//   // if you don't want to generate the output files:
//     dryRun: false,
//   // if you don't want to see any log output:
//     silent: false,
// })

// if (typeof doc !== 'boolean') {
//   // Documentation was generated!
//   console.log(doc.data) // the parsed api documentation object
//   console.log(doc.project) // the project information
// }

// console.log("Jello")

app.get('/api', async (req, res) => {
    res.sendFile(path.join(__dirname+'/doc/index.html'))
})

app.listen(3000);
